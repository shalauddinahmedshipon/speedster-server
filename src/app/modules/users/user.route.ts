import { Router } from "express";
import { userController } from "./user.controller";
import validationRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();

router.post('/register',validationRequest(userValidation.registerUserValidationSchema),userController.registerUser);
router.get('/',userController.getAllUser);

export const userRoutes = router;