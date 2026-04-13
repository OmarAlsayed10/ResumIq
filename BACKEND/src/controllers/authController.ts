import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "../middleware/validateJWTMiddleware";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { cloudinary, deleteImageFromCloudinary } from "../services/importService";

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;

  if (!customReq.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const dbUser = await prisma.user.findUnique({ where: { id: customReq.user.userId } });

  res.status(200).json({
    user: {
      ...customReq.user,
      firstName: dbUser?.firstName,
      lastName: dbUser?.lastName,
      photo: dbUser?.photo,
      isGoogleUser: !!dbUser?.googleId,
    },
    token: req.cookies.token,
  });
};

export const upgradeToPro = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const now = new Date();
  const oneMonthFromNow = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  );

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      role: "pro user",
      proExpiresAt: oneMonthFromNow,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      proExpiresAt: oneMonthFromNow.getTime(),
    },
    process.env.JWT_SECRET_Key || "jwt_secret",
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

  res.json({
    message: "User upgraded to Pro successfully",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      proExpiresAt: oneMonthFromNow.getTime(),
    },
    token,
  });
};


export const updateProfile = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  const { firstName, lastName } = req.body;

  if (!customReq.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const dbUser = await prisma.user.findUnique({ where: { id: customReq.user.userId } });
    if (!dbUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const nameChanged = dbUser.firstName !== firstName || dbUser.lastName !== lastName;
    const now = new Date();

    if (nameChanged && dbUser.lastNameChange) {
      const daysSince = (now.getTime() - dbUser.lastNameChange.getTime()) / (1000 * 3600 * 24);
      if (daysSince < 30) {
        res.status(400).json({ message: `Name can only be changed once every 30 days. Remaining: ${Math.ceil(30 - daysSince)} days.` });
        return;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: customReq.user.userId },
      data: {
        firstName,
        lastName,
        ...(nameChanged ? { lastNameChange: now } : {})
      },
    });
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;

  if (!customReq.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const dbUser = await prisma.user.findUnique({ where: { id: customReq.user.userId } });

    if (dbUser?.photo) {
      await deleteImageFromCloudinary(dbUser.photo);
    }

    await prisma.user.delete({
      where: { id: customReq.user.userId },
    });

    res.clearCookie("token", {
      httpOnly: true,
    });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Account deletion error:", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
};

export const getPlan = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  if (!customReq.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: customReq.user.userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    let plan = user.role;
    let daysLeft = 0;

    if (user.proExpiresAt) {
      const now = new Date();
      if (user.proExpiresAt > now) {
        const diffTime = user.proExpiresAt.getTime() - now.getTime();
        daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      } else {
        plan = "normal user";
      }
    }

    res.status(200).json({ plan, daysLeft, expiresAt: user.proExpiresAt });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfilePhoto = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  if (!customReq.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (!req.file || !req.file.path) {
    res.status(400).json({ message: "No photo provided" });
    return;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: customReq.user.userId },
      data: { photo: req.file.path }
    });
    res.status(200).json({ message: "Photo updated successfully", photo: updatedUser.photo });
  } catch (error) {
    console.error("Photo update error:", error);
    res.status(500).json({ message: "Failed to update photo" });
  }
};

export const deleteProfilePhoto = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  if (!customReq.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const dbUser = await prisma.user.findUnique({ where: { id: customReq.user.userId } });

    if (dbUser?.photo) {
      await deleteImageFromCloudinary(dbUser.photo);
    }

    await prisma.user.update({
      where: { id: customReq.user.userId },
      data: { photo: null },
    });
    res.status(200).json({ message: "Photo removed successfully" });
  } catch (error) {
    console.error("Photo delete error:", error);
    res.status(500).json({ message: "Failed to remove photo" });
  }
};