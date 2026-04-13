import { StatusCodes } from "http-status-codes";
import { RegisterParams, LoginParams } from "../types/user.types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import prisma from "../lib/prisma";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const register = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}: RegisterParams) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        otp,
        otpExpires,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Resumiq" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Email Verification - Your OTP Code",
        html: `
          <h2>Welcome to Resumiq!</h2>
          <p>Your verification code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        `,
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      await prisma.user.delete({ where: { id: user.id } });
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        error: {
          message: "Failed to send verification email. Please try again.",
        },
      };
    }

    return {
      status: StatusCodes.CREATED,
      message: "Registration successful. Check your email for the OTP.",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error: any) {
    // handle duplicate email
    if (error.code === "P2002") {
      return {
        status: StatusCodes.BAD_REQUEST,
        error: { message: "Email already exists" },
      };
    }
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Registration failed" },
    };
  }
};

export const login = async ({ email, password }: LoginParams) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      error: { message: "Invalid credentials" },
    };
  }

  if (user.otp) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      error: { message: "Please verify your email first" },
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      error: { message: "Invalid credentials" },
    };
  }

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    proExpiresAt: user.proExpiresAt ? user.proExpiresAt.getTime() : null,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_Key || "jwt_secret", {
    expiresIn: "1d",
  });

  return {
    status: StatusCodes.OK,
    message: "Login successful",
    token,
    userId: user.id,
    email: user.email,
    role: user.role,
    proExpiresAt: user.proExpiresAt ? user.proExpiresAt.getTime() : null,
  };
};

export const resendOTP = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return {
        status: StatusCodes.NOT_FOUND,
        error: { message: "User not found" },
      };
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { otp, otpExpires },
    });

    try {
      await transporter.sendMail({
        from: `"Resumiq" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Email Verification - Your New OTP Code",
        html: `
          <h2>Welcome to Resumiq!</h2>
          <p>Your new verification code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        `,
      });

      return {
        status: StatusCodes.OK,
        message: "New OTP sent successfully",
      };
    } catch (emailError) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        error: { message: "Failed to send new OTP. Please try again." },
      };
    }
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: { message: "Failed to resend OTP" },
    };
  }
};

export const updatePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || !user.password) {
    return {
      status: StatusCodes.NOT_FOUND,
      error: { message: "User not found" },
    };
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      error: { message: "Old password is incorrect" },
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return {
    status: StatusCodes.OK,
    message: "Password updated successfully",
  };
};