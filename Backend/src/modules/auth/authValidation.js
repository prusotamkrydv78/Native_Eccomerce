import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["Customer", "Seller"]).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
  }),
});

export const resetPasswordSchema = z.object({
  params: z.object({
    token: z.string(),
  }),
  body: z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});
