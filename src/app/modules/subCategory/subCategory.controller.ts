import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { subCategoryService } from "./subCategory.service";
import { StatusCodes } from "http-status-codes";


export const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  const subCategory = await subCategoryService.createSubCategoryInDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Subcategory created successfully",
    data: subCategory,
  });
});


export const getAllSubCategories = catchAsync(async (_req: Request, res: Response) => {
  const subCategories = await subCategoryService.getAllSubCategoriesFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Subcategories retrieved successfully",
    data: subCategories,
  });
});

export const getSubCategoryById = catchAsync(async (req: Request, res: Response) => {
  const subCategory = await subCategoryService.getSingleSubCategoryFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Subcategory retrieved successfully",
    data: subCategory,
  });
});


export const getSubCategoriesByCategory = catchAsync(async (req: Request, res: Response) => {
  const subCategories = await subCategoryService.getSubCategoriesByCategory(req.params.categoryId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Subcategories retrieved successfully",
    data: subCategories,
  });
});


export const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
  const subCategory = await subCategoryService.updateSubCategoryInDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Subcategory updated successfully",
    data: subCategory,
  });
});


export const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
  await subCategoryService.deleteSubCategoryFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Subcategory deleted successfully",
  });
});


export const softDeleteSubCategory = catchAsync(async (req: Request, res: Response) => {
  const subCategory = await subCategoryService.softDeleteSubCategoryFromDB(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Subcategory soft deleted successfully",
    data: subCategory,
  });
});


export const addSubCategoryToCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId, subCategoryId } = req.body;
  const subCategory = await subCategoryService.addSubCategoryToCategory(categoryId, subCategoryId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Subcategory added to category successfully",
    data: subCategory,
  });
});


export const removeSubCategoryFromCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId, subCategoryId } = req.body;
  const category = await subCategoryService.removeSubCategoryFromCategory(categoryId, subCategoryId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
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
