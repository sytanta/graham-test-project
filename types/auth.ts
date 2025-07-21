export interface User {
  id?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface JWTPayload {
  user_id: string;
  email: string;
}
