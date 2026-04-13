import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "resumes",
      resource_type: "raw",
      public_id: `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '')}`,
    };
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = [
    "application/pdf",
    "application/doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF and DOC/DOCX files are supported") as any, false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "avatars",
      format: "jpg",
      public_id: `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '')}`,
    };
  },
});

const imageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are supported") as any, false);
  }
};

export const uploadAvatar = multer({ storage: avatarStorage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } });

export const deleteImageFromCloudinary = async (imageUrl: string) => {
  const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/);
  if (match && match[1]) {
    const publicId = match[1];
    console.log("Deleting from Cloudinary, public_id:", publicId);
    await cloudinary.uploader.destroy(publicId).catch((err) => console.error("Cloudinary error:", err));
    return true;
  }
  console.warn("Could not extract public_id from photo URL:", imageUrl);
  return false;
};

export { cloudinary };
export default upload;
