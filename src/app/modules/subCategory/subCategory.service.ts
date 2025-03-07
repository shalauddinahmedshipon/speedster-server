import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import SubCategory from "./subCategory.model";
import { TSubCategory } from "./subCategory.interface";
import mongoose from "mongoose";
import { Category } from "../category/category.model";

// Get All Subcategories
const getAllSubCategoriesFromDB = async () => {
  const subCategories = await SubCategory.find().populate("category");
  return subCategories;
};

// Get Single Subcategory
const getSingleSubCategoryFromDB = async (id: string) => {
  const subCategory = await SubCategory.findById(id).populate("category");
  if (!subCategory) {
    throw new AppError(StatusCodes.NOT_FOUND, "Subcategory not found");
  }
  return subCategory;
};

// Get Subcategories by Category
const getSubCategoriesByCategory = async (categoryId: string) => {
  const subCategories = await SubCategory.find({ category: categoryId });
  return subCategories;
};

// Create Subcategory
const createSubCategoryInDB = async (payload: TSubCategory) => {
  const existingSubCategory = await SubCategory.findOne({ name: payload.name });
  if (existingSubCategory) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Subcategory with this name already exists");
  }

  const subCategory = await SubCategory.create(payload);
  return subCategory;
};

// Update Subcategory
const updateSubCategoryInDB = async (id: string, payload: Partial<TSubCategory>) => {
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    throw new AppError(StatusCodes.NOT_FOUND, "Subcategory not found");
  }

  const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, payload, { new: true });
  return updatedSubCategory;
};

// Delete Subcategory
const deleteSubCategoryFromDB = async (id: string) => {
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    throw new AppError(StatusCodes.NOT_FOUND, "Subcategory not found");
  }

  const result = await SubCategory.findByIdAndDelete(id);
  return result;
};

// Soft Delete Subcategory
const softDeleteSubCategoryFromDB = async (id: string) => {
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    throw new AppError(StatusCodes.NOT_FOUND, "Subcategory not found");
  }

  subCategory.isDeleted = true;
  await subCategory.save();
  return subCategory;
};

// Associate Subcategory with Category
const addSubCategoryToCategory = async (categoryId: string, subCategoryId: string) => {
  const subCategory = await SubCategory.findById(subCategoryId);
  if (!subCategory) {
    throw new AppError(StatusCodes.NOT_FOUND, "Subcategory not found");
  }

  subCategory.category = new mongoose.Types.ObjectId(categoryId);
  await subCategory.save();

  return subCategory;
};

const removeSubCategoryFromCategory = async (categoryId: string, subCategoryId: string) => {
  const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
  const subCategoryObjectId = new mongoose.Types.ObjectId(subCategoryId);

  // Find and update category in one step using $pull
  const category = await Category.findByIdAndUpdate(
    categoryObjectId,
    { $pull: { subCategories: subCategoryObjectId } }, // ✅ Removes subcategory
    { new: true } // ✅ Returns updated category
  );

  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, "Category not found");
  }

  return category;
};

export const subCategoryService = {
  getAllSubCategoriesFromDB,
  getSingleSubCategoryFromDB, // ✅ Added missing API
  getSubCategoriesByCategory,
  createSubCategoryInDB,
  updateSubCategoryInDB,
  deleteSubCategoryFromDB,
  softDeleteSubCategoryFromDB,
  addSubCategoryToCategory,
  removeSubCategoryFromCategory, // ✅ Added missing API
};
