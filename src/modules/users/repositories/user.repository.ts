import type {User, CreateUserInput} from "../types/user.types.js";

export interface UserRepository {
  create(data: CreateUserInput): Promise<User>;

  findByEmail(email: string): Promise<User | null>;
}