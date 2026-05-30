import { AuthController } from "./controllers/auth.controller.js";
import { AuthService } from "./services/auth.service.js";

const authService = new AuthService();

const authController = new AuthController(authService);

export { authController };