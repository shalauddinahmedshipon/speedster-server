import express from "express";
import { productController } from "./bicyle.controller";
const router = express.Router();

router.post('/',productController.createProduct);
router.get('/',productController.getAllProducts)
export const productRoutes = router;