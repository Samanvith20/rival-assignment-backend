import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required"),

  description: z
    .string()
    .optional(),

  status: z
    .enum([
      "PENDING",
      "IN_PROGRESS",
      "COMPLETED",
    ])
    .optional(),

  priority: z
    .enum([
      "LOW",
      "MEDIUM",
      "HIGH",
    ])
    .optional(),

  dueDate: z
    .string()
    .datetime()
    .optional(),
});

export const updateTaskSchema =
  createTaskSchema.partial();
  
export const taskIdSchema = z.object({
  id: z.string().uuid("Invalid task id"),
});