import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
    "image/jpeg", "image/jpg", "image/png", "image/webp",
    "video/mp4", "video/webm", "video/quicktime"
];

export const fileUploadValidation = z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE,
        { message: "File size must be under 10MB" })

    .refine((file) => ALLOWED_MIME_TYPES.includes(file.type),
        { message: "Only standard images and MP4 videos are allowed." });


export type imageStateType = {
    public_id: string,
    secure_url: string,
    format: string,
    resource_type: "image" | "video",
    isUploading: boolean
}