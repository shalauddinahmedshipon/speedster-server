import { Router } from "express";
import { subCategoryController } from "./subCategory.controller";
import validationRequest from "../../middlewares/validateRequest";
import { subCategoryValidation } from "./subCategory.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constant";


const router = Router();

router.post(
  "/create-subcategory",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(subCategoryValidation.createSubCategoryValidationSchema),
  subCategoryController.createSubCategory
);

router.get("/", subCategoryController.getAllSubCategories);

router.get(
  "/:id",
  subCategoryController.getSubCategoryById
);

router.get(
  "/category/:categoryId",
  subCategoryController.getSubCategoriesByCategory
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(subCategoryValidation.updateSubCategoryValidationSchema),
  subCategoryController.updateSubCategory
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  subCategoryController.deleteSubCategory
);

router.patch(
  "/:id/soft-delete",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  subCategoryController.softDeleteSubCategory
);

router.post(
  "/associate",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  subCategoryController.addSubCategoryToCategory
);

router.post(
  "/remove",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  subCategoryController.removeSubCategoryFromCategory
);

export const subCategoryRoutes = router;
