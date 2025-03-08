import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import SubCategory from "./subCategory.model";
import { TSubCategory } from "./subCategory.interface";
import { Category } from "../category/category.model";
import mongoose from "mongoose";

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




// Create Subcategory with Transaction
const createSubCategoryInDB = async (payload: TSubCategory) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const categoryExists = await Category.findById(payload.category).session(session);
    if (!categoryExists) {
      throw new AppError(StatusCodes.NOT_FOUND, "Category not found");
    }

   
    const existingSubCategory = await SubCategory.findOne({ name: payload.name }).session(session);
    if (existingSubCategory) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Subcategory with this name already exists");
    }


    const subCategory = await SubCategory.create([payload], { session });

    await Category.findByIdAndUpdate(
      payload.category,
      { $push: { subCategories: subCategory[0]._id } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return subCategory[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export default createSubCategoryInDB;



// Update Subcategory
const updateSubCategoryInDB = async (id: string, payload: Partial<TSubCategory>) => {
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    throw new AppError(StatusCodes.NOT_FOUND, "Subcategory not found");
  }

  const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, payload, { new: true });
  return updatedSubCategory;
};



// Soft Delete Subcategory
const softDeleteSubCategoryFromDB = async (id: string) => {
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    throw new AppError(StatusCodes.NOT_FOUND, "Subcategory not found");
  }

  subCategory.isDeleted = true;
  await subCategory.save();

  
  await Category.findByIdAndUpdate(subCategory.category, { $pull: { subCategories: id } });

  return subCategory;
};


export const subCategoryService = {
  getAllSubCategoriesFromDB,
  getSingleSubCategoryFromDB, 
  getSubCategoriesByCategory,
  createSubCategoryInDB,
  updateSubCategoryInDB,
  softDeleteSubCategoryFromDB,
};
