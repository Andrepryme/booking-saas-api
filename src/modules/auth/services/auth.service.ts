import bcrypt from "bcrypt";
import { UserRepository } from "../../users/repositories/user.repository.js";
import { JwtService } from "./jwt.service.js";
import type { RegisterInput } from "../validators/register.validator.js";
import type { LoginInput } from "../validators/login.validator.js";
import type { User, UserResponse } from "../../users/types/user.types.js";
import type {  AuthResponse } from "../types/auth.types.js";
import { EmailConflictError } from "../../../shared/errors/EmailConflictError.js";
import { InvalidCredentialsError } from "../../../shared/errors/InvalidCredentialsError.js";

export class AuthService {

  private readonly userRepository: UserRepository;
  private readonly jwtService: JwtService;
  constructor(userRepository: UserRepository, jwtService: JwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  private toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }

  private generateAuthResponse(user: User): AuthResponse {

  const accessToken = this.jwtService.signAccessToken({
      sub: user.id,
      role: user.role
    });

  const refreshToken = this.jwtService.signRefreshToken({
      sub: user.id
    });

  return {
    user: this.toUserResponse(user),
    accessToken,
    refreshToken
  };
}

  async register(data: RegisterInput): Promise<AuthResponse> {

    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new EmailConflictError();
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        passwordHash
      });

    return this.generateAuthResponse(user);
  }

  async login(data: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) { throw new InvalidCredentialsError(); }

    const validPassword = await bcrypt.compare(data.password, user.passwordHash);
    if (!validPassword) { throw new InvalidCredentialsError(); }

    return this.generateAuthResponse(user);
  }
}