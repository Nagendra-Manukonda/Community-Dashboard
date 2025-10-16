import { z } from "zod";

export const loginSignupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSignupSchema>;