import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 chars"),

  email: z.email("Invalid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 chars"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),

  password: z.string().min(1, "Password required"),
});