import z from "zod";

export const passwordForgetEmailPageSchema = z.object({
    email: z.string().trim().min(1, "Email is required")
        .email("Email format is invalid")
});

export type passswordForgetEmailPageType = z.infer<typeof passwordForgetEmailPageSchema>;

export const resetUpdatePasswordSchema = z
    .object({
        sessionId: z.string()
            .uuid({ message: "Invalid or expired session link. Please request a new one." }),
        password: z.string()
            .trim()
            .min(1, "Password cannot be empty")
            .min(8, "Minimum 8 characters")
            .regex(/[A-Za-z]/, "Must include letters")
            .regex(/\d/, "Must include numbers"),
        confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password doesnot match",
        path: ["confirmPassword"],
    });

export type ResetUpdatePasswordFormDataType = z.infer<typeof resetUpdatePasswordSchema>;