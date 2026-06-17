import { z } from "zod";

const cloudinaryFileSchema = z.object({
    public_id: z.string().min(1, "Public ID is required"),
    secure_url: z.string().url("Must be a valid URL").min(1, "URL is required"),
    format: z.string().min(1, "Format is required"),
    resource_type: z.string().min(1, "Resource type is required")
});

export const ebookValidationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(255, "Title is too long"),
    author: z.string().min(2, "Author must be at least 2 characters").max(255, "Author name is too long"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().min(0, "Price must be a positive number"),
    categoryId: z.string().uuid("Invalid category ID"),
    discountPercentage: z.number().min(0).max(100).optional().default(0),
    coverImage: cloudinaryFileSchema,
    pdfFile: cloudinaryFileSchema
});

export const ebookUpdateValidationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(255, "Title is too long"),
    author: z.string().min(2, "Author must be at least 2 characters").max(255, "Author name is too long"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().min(0, "Price must be a positive number"),
    categoryId: z.string().uuid("Invalid category ID"),
    discountPercentage: z.number().min(0).max(100).optional().default(0),
    coverImage: cloudinaryFileSchema.optional(),
    pdfFile: cloudinaryFileSchema.optional()
});

export const ebookBulkDiscountSchema = z.object({
    discountPercentage: z.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100"),
    categoryId: z.string().uuid("Invalid category ID").optional()
});
