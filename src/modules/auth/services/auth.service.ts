import { randomUUID } from "crypto";

export class AuthService {
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return {
      id: randomUUID(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: "CUSTOMER"
    };
  }
}