import { Router } from "express";
import { authController } from "../auth.module.js";
import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { validate } from "../../../shared/middleware/validate.js";
import { registerSchema } from "../validators/register.validator.js";
import { loginSchema } from "../validators/login.validator.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register.bind(authController))
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login.bind(authController))
);

export default router;