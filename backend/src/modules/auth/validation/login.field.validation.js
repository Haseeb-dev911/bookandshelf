import z from "zod";

export const validateLoginAccountSchema = z.object({
    email: z.string()
        .trim()
        .email("Invalid email format"),
    password: z.string()
        .trim()
        .min(8, "Minimum 8 characters"),
    remember: z.boolean().optional()
});

export const emailFormatVerify = z.object({
    email: z.string()
        .trim()
        .email("Invalid email format")
});

export const passwordUpdateValidationScehma = z.object({
    sessionId: z.string()
        .uuid(),
    password: z.string()
        .trim()
        .min(8, "Minimum 8 characters")
        .regex(/[A-Za-z]/, "Must include uppercase and lowercase letters")
        .regex(/\d/, "Must include numbers"),
    confirmPassword: z.string()
        .trim()
        .min(8, "Minimum 8 characters")

}).refine((data) => data.password === data.confirmPassword, {
    message: "Password doesnot match",
    path: ["confirmPassword"]
});