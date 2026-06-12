import { Router } from "express";
import { authController } from "../auth.module.js";
import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { validate } from "../../../shared/middleware/validate.js";
import { registerSchema } from "../validators/register.validator.js";
import { loginSchema } from "../validators/login.validator.js";
import { authenticate, authorize } from "../auth.module.js";

const authRoutes = Router();

authRoutes.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register.bind(authController))
);

authRoutes.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login.bind(authController))
);

authRoutes.get(
  "/me",
  authenticate,
  asyncHandler(authController.me.bind(authController))
);

authRoutes.get(
  "/admin-test",
  authenticate,
  authorize("GUEST", "HOST", "ADMIN"),
  asyncHandler(authController.adminTest.bind(authController))
);

export { authRoutes }