import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { subCategoryService } from "./subCategory.service";
import { StatusCodes } from "http-status-codes";

// Create Subcategory
export const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  const subCategory = await subCategoryService.createSubCategoryInDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Subcategory created successfully",
    data: subCategory,
  });
});

// Get All Subcategories
export const getAllSubCategories = catchAsync(async (_req: Request, res: Response) => {
  const subCategories = await subCategoryService.getAllSubCategoriesFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategories retrieved successfully",
    data: subCategories,
  });
});

// Get Single Subcategory
export const getSubCategoryById = catchAsync(async (req: Request, res: Response) => {
  const subCategory = await subCategoryService.getSingleSubCategoryFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategory retrieved successfully",
    data: subCategory,
  });
});

// Get Subcategories by Category
export const getSubCategoriesByCategory = catchAsync(async (req: Request, res: Response) => {
  const subCategories = await subCategoryService.getSubCategoriesByCategory(req.params.categoryId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategories retrieved successfully",
    data: subCategories,
  });
});

// Update Subcategory
export const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
  const subCategory = await subCategoryService.updateSubCategoryInDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategory updated successfully",
    data: subCategory,
  });
});

// Delete Subcategory
export const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
  await subCategoryService.deleteSubCategoryFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategory deleted successfully",
  });
});

// Soft Delete Subcategory
export const softDeleteSubCategory = catchAsync(async (req: Request, res: Response) => {
  const subCategory = await subCategoryService.softDeleteSubCategoryFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategory soft deleted successfully",
    data: subCategory,
  });
});

// Associate Subcategory with Category
export const addSubCategoryToCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId, subCategoryId } = req.body;
  const subCategory = await subCategoryService.addSubCategoryToCategory(categoryId, subCategoryId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategory added to category successfully",
    data: subCategory,
  });
});

// Remove Subcategory from Category
export const removeSubCategoryFromCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId, subCategoryId } = req.body;
  const category = await subCategoryService.removeSubCategoryFromCategory(categoryId, subCategoryId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Subcategory removed from category successfully",
    data: category,
  });
});

export const subCategoryController = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoriesByCategory,
  updateSubCategory,
  deleteSubCategory,
  softDeleteSubCategory,
  addSubCategoryToCategory,
  removeSubCategoryFromCategory,
};
