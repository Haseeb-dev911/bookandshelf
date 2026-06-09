import z from "zod";

export const tokenFieldValidateSchema = z.object({
    token: z.string()
        .trim()
        .min(1, "Token field is empty")
        .regex(/^\d{6}$/, "Token must be 6 digits [0-9]")
});

export const sessionIdFieldValidateSchema = z.object({
    sessionId: z.string()
        .trim()
        .min(1, "Token field is empty")
});

export const sessionPagePassordsUpdateSchema = z.object({
    sessionId: z.string().uuid()
});