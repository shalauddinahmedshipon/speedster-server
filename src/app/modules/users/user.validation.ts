import { z } from "zod";

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }).trim(),
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    status: z.enum(["in-progress", "blocked"]).optional().default("in-progress"),
    role: z.enum(["superAdmin", "admin", "customer"]).optional().default("customer"),
  }),
});

const updateUserProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }).trim().optional(),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .optional(),
    status: z.enum(["in-progress", "blocked"]).optional(),
    role: z.enum(["superAdmin", "admin", "customer"]).optional(),
  }),
});

const updateUserPasswordValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

export const userValidation = {
  registerUserValidationSchema,
  updateUserProfileValidationSchema,
  updateUserPasswordValidationSchema,
};
