import { randomUUID } from "crypto";
import { RegisterInput } from "../validators/register.validator.js";

export class AuthService {
  async register(data: RegisterInput) {
    return {
      id: randomUUID(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: "ADMIN"
    };
  }
}