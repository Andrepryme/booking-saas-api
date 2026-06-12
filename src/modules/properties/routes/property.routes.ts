import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.module.js";
import { propertyController } from "../property.module.js";
import { validate } from "../../../shared/middleware/validate.js";
import { createPropertySchema } from "../validators/create-property.validator.js";
import { asyncHandler } from "../../../shared/utils/async-handler.js";

const propertyRoutes = Router();

propertyRoutes.get(
    "/",
    asyncHandler(propertyController.findMany.bind(propertyController))
);

propertyRoutes.get(
    "/:id",
    asyncHandler(propertyController.findById.bind(propertyController))
);

propertyRoutes.get(
    "/me",
    authenticate,
    authorize("HOST"),
    asyncHandler(propertyController.findMyProperties.bind(propertyController))
);

propertyRoutes.post(
    "/",
    authenticate,
    authorize("HOST"),
    validate(createPropertySchema),
    asyncHandler(propertyController.create.bind(propertyController))
);

export {
  propertyRoutes
};