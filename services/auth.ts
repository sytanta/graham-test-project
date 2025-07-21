import bcrypt from "bcryptjs";

import { LoginRequest, RegisterRequest, JWTPayload } from "../types/auth";
import { User } from "../models/user";
import { generateToken } from "../utils/jwt";
import { AppError } from "../middleware/error.middleware";

export class AuthService {
  async register(
    userData: RegisterRequest
  ): Promise<{ user: User; token: string }> {
    const existingUser = await User.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new AppError("User already exists with this email", 409);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    const payload: JWTPayload = { user_id: user.id!, email: user.email };
    const token = generateToken(payload);

    return { user, token };
  }

  async login(loginData: LoginRequest): Promise<{ user: User; token: string }> {
    const user = await User.findOne({ where: { email: loginData.email } });
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isValidPassword = await bcrypt.compare(
      loginData.password,
      user.password
    );
    if (!isValidPassword) {
      throw new AppError("Invalid email or password", 401);
    }

    const payload: JWTPayload = { user_id: user.id!, email: user.email };
    const token = generateToken(payload);

    return { user, token };
  }
}
