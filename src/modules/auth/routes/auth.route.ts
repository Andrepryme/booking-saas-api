import { Router } from "express";
import { authController } from "../auth.module.js";
import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { validate } from "../../../shared/middleware/validate.js";
import { registerSchema } from "../validators/register.validator.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register.bind(authController))
);

export default router;