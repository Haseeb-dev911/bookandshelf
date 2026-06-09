import z from "zod";

export const loginFormSchema = z.object({
    email: z.string().trim().min(1, "Email is required").email("Invalid email format"),
    password: z.string().trim().min(1, "Password is required"),
    remember: z.boolean().optional()
});

export type loginFormType = z.infer<typeof loginFormSchema>;
