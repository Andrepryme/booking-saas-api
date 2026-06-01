export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  createdAt: Date;
};

export type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
};

export type PublicUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};