import { z } from "zod";

const createSubCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "SubCategory name is required" }).trim(),
    category: z.string().min(1, { message: "Category ID is required" }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateSubCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "SubCategory name is required" }).trim().optional(),
    slug: z.string().trim().toLowerCase().optional(),
    category: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const subCategoryValidation = {
  createSubCategoryValidationSchema,
  updateSubCategoryValidationSchema,
};
