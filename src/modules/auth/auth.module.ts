import { UserRepository } from "../users/repositories/user.repository.js";
import { JwtService } from "./services/jwt.service.js";
import { AuthService } from "./services/auth.service.js";
import { AuthController } from "./controllers/auth.controller.js";
import { authMiddleware } from "./middlewares/authenticate.middleware.js";
import { authorizeMiddleware } from "./middlewares/authorize.middleware.js";

const userRepository = new UserRepository();
const jwtService = new JwtService();
const authService = new AuthService(userRepository, jwtService);
const authController = new AuthController(authService);
const authenticate = authMiddleware(jwtService);
const authorize = authorizeMiddleware;

export {
  authController,
  authenticate,
  authorize
};