import { Request, Response, NextFunction } from "express";

import { JWTPayload } from "../types/auth";
import { ApiResponse } from "../types/index";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      status: "error",
      message: "Access token required",
    });
    return;
  }

  try {
    const decoded = verifyToken(token) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      status: "error",
      message: "Invalid or expired token",
    });
  }
};
