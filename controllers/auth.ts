import { Request, Response } from "express";

import { AuthService } from "../services/auth";
import { LoginRequest, RegisterRequest } from "../types/auth";
import { ApiResponse } from "../types/index";

// Handle user registration & logging in
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> => {
    const userData: RegisterRequest = req.body;
    const { user, token } = await this.authService.register(userData);

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      },
    });
  };

  login = async (req: Request, res: Response<ApiResponse>): Promise<void> => {
    const loginData: LoginRequest = req.body;
    const { user, token } = await this.authService.login(loginData);

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      },
    });
  };
}
