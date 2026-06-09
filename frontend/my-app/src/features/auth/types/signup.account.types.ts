import z from "zod";

export const signUpFeildsValidationSchema = z.object({
    name: z.string({
        invalid_type_error: "Name is required",
        required_error: "Name is required"
    })
        .trim()
        .min(1, "Name cannot be empty")
        .min(2, "Minimum 2 characters")
        .regex(/^[A-Za-z\s]+$/, "Only letters are allowed"),

    email: z.string({
        invalid_type_error: "Email is required",
        required_error: "Email is required"
    })
        .trim()
        .min(1, "Email cannot be empty")
        .email("Invalid email format"),

    password: z.string({
        invalid_type_error: "Password is required",
        required_error: "Password is required"
    })
        .trim()
        .min(1, "Password cannot be empty")
        .min(8, "Minimum 8 characters")
        .regex(/[A-Za-z]/, "Must include letters")
        .regex(/\d/, "Must include numbers"),

    confirmPassword: z.string({
        invalid_type_error: "Confirm password is required",
        required_error: "Confirm password is required"
    })
        .trim()
        .min(1, "Confirm password cannot be empty")
        .min(8, "Minimum 8 characters"),

    country: z.string({
        invalid_type_error: "Country is required",
        required_error: "Country is required"
    })
        .trim()
        .min(1, "Country is required")
        .regex(/^\d+$/, "Only numbers are allowed"),

    city: z.string({
        invalid_type_error: "City is required",
        required_error: "City is required"
    })
        .trim()
        .min(1, "City is required")
        .regex(/^\d+$/, "Only numbers are allowed")

}).refine((data) => data.password === data.confirmPassword, {
    message: "Password doesnot match",
    path: ["confirmPassword"]
});


export type signUpFieldsValidationTypes = z.infer<typeof signUpFeildsValidationSchema>;