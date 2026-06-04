export const userRoles = ["ADMIN", "HOST", "GUEST"] as const;

// The UserRole type is a union of the string literals defined in userRoles, ensuring that only valid roles can be assigned to users.
export type UserRole = typeof userRoles[number];

// This is the main interface representing a user in the system, including all properties stored in the database.
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  passwordHash: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// This is the input type for creating a new user, which includes the necessary fields to create a user record in the database.
export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  passwordHash: string;
}

// This is the interface representing the user data as stored in the database, with snake_case properties to match the database schema.
export interface UserRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  password_hash: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// This is the interface representing the user data that will be sent in API responses, which excludes sensitive information like passwordHash and uses camelCase properties.
export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}