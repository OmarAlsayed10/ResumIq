import { StatusCodes } from "http-status-codes";
import { CVParams } from "../types/cvBuilder.types";
import prisma from "../lib/prisma";

// Create CV
export const createCV = async (cvData: CVParams & { userId: string }) => {
  try {
    const cv = await prisma.cV.create({
      data: {
        userId: cvData.userId,
        personalInfo: cvData.personalInfo ?? {},
        experience: cvData.experience ?? {},
        education: cvData.education ?? [],
        skills: cvData.skills ?? [],
      },
    });
    return {
      status: StatusCodes.CREATED,
      message: "CV created successfully",
      cv,
    };
  } catch (error) {
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Failed to create CV" },
    };
  }
};

// Get CVs by User ID
export const getCVsByUser = async (userId: string) => {
  try {
    const cvs = await prisma.cV.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return cvs || [];
  } catch (error) {
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Failed to fetch CVs" },
    };
  }
};

// Get CV by ID
export const getCVById = async (cvId: string) => {
  try {
    const cv = await prisma.cV.findUnique({
      where: { id: cvId },
    });
    if (!cv) {
      return {
        status: StatusCodes.NOT_FOUND,
        error: { message: "CV not found" },
      };
    }
    return {
      status: StatusCodes.OK,
      cv,
    };
  } catch (error) {
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Failed to fetch CV" },
    };
  }
};

// Update CV
export const updateCV = async (cvId: string, cvData: Partial<CVParams>) => {
  try {
    const cv = await prisma.cV.update({
      where: { id: cvId },
      data: {
        ...(cvData.personalInfo && { personalInfo: cvData.personalInfo ?? {} }),
        ...(cvData.experience && { experience: cvData.experience ?? {} }),
        ...(cvData.education && { education: cvData.education ?? [] }),
        ...(cvData.skills && { skills: cvData.skills ?? [] }),
      },
    });
    return {
      status: StatusCodes.OK,
      message: "CV updated successfully",
      cv,
    };
  } catch (error: any) {
    if (error.code === "P2025") {
      return {
        status: StatusCodes.NOT_FOUND,
        error: { message: "CV not found" },
      };
    }
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Failed to update CV" },
    };
  }
};

// Delete CV
export const deleteCV = async (cvId: string) => {
  try {
    await prisma.cV.delete({
      where: { id: cvId },
    });
    return {
      status: StatusCodes.OK,
      message: "CV deleted successfully",
    };
  } catch (error: any) {
    if (error.code === "P2025") {
      return {
        status: StatusCodes.NOT_FOUND,
        error: { message: "CV not found" },
      };
    }
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Failed to delete CV" },
    };
  }
};