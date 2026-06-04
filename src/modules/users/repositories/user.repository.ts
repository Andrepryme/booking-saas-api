import { db } from "../../../infrastructure/database/db.js";
import type { User, UserRow, CreateUserData } from "../types/user.types.js";

export class UserRepository {

  private mapRowToUser(row: UserRow): User {
    return {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async create(data: CreateUserData): Promise<User> {

    const result = await db.query<UserRow>(
      `
      INSERT INTO users (first_name, last_name, email, password_hash, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        data.firstName,
        data.lastName,
        data.email,
        data.passwordHash,
        data.role
      ]
    );
    return this.mapRowToUser(result.rows[0]!);
  }

  async findByEmail(email: string): Promise<User | null> {

    const result = await db.query<UserRow>(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (!result.rows[0]) {
      return null;
    }

    return this.mapRowToUser(result.rows[0]);
  }

  async findById(id: string): Promise<User | null> {

    const result = await db.query<UserRow>(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );

    if (!result.rows[0]) {
      return null;
    }
    return this.mapRowToUser(result.rows[0]);
  }
}