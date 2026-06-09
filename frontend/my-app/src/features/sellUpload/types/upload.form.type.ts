import { product_condition_states } from "@/shared/utils/constant.values";
import { z } from "zod";

const imageValidationSchema = z.object({
  // Image validation
  public_id: z.string({
    required_error: "Cloudinary Image ID is required"
  }).min(1),

  secure_url: z.string({
    required_error: "Image URL is required"
  }).url("Invalid image URL format"),

  format: z.string({
    required_error: "Image format is required"
  }).max(50, "Error in Format, Upload Again"),

  resource_type: z.enum(["image", "video"], {
    invalid_type_error: "Resource must be an image or video",
    required_error: "Resource type is required"
  }),

  isUploading: z.boolean().optional()
});


export const bookUploadValidationSchema = z.object({

  // Upload product form validation
  title: z.string({ required_error: "Title is requried" })
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .max(254, "Title must be 254 characters or fewer"),

  description: z.string()
    .trim()
    .min(10, "Minimum 10 characters description of is required")
    .max(2000, "Description must be 2000 characters or fewer"),

  price: z.coerce.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a valid number"
  }).positive("Price must be greater than zero")
    .max(1000000, "Price exceeds maximum allowed value")
    .refine((v) => /^\d+(\.\d{1,2})?$/.test(String(v)), "Price can have at most 2 decimal places"),

  condition: z.enum(product_condition_states,
    {
      errorMap: () => ({
        message: "Please select a valid book condition"
      })
    }),

  categoryId: z.string({ required_error: "Category is required" })
    .uuid("Invalid Category selection"),

  city: z.string({ required_error: "City id requried" })
    .regex(/^\d+$/, "Invalid City, Try again."),

  country: z.string({ required_error: "Country id requried" })
    .regex(/^\d+$/, "Invalid Country, Try again."),


  customFields: z.record(z.any(), {
    required_error: "These fields are required"
  }),

  images: z.array(imageValidationSchema)
    .min(1, "You must upload one image of the book")
    .max(12, "You cannot upload more then 12 images")
    .refine(
      (image) => image.every((img) => img.isUploading !== true),
      { message: "Please wait for all images to finsh uploading!" })
});

export type bookUploadValidationType = z.infer<typeof bookUploadValidationSchema>;

