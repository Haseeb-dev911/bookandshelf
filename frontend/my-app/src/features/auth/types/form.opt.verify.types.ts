import z from "zod";

export const otpSchemaVerifyAccount = z.object({
    token: z
        .string()
        .min(6, "OTP must be 6 digits")
        .max(6, "OTP must be 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export type optTypeVerifyAccount = z.infer<typeof otpSchemaVerifyAccount>;