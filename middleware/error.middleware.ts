import { Request, Response, NextFunction } from "express";

import { ApiResponse } from "../types";
import { ValidationError } from "sequelize";

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Handle all errors in one middleware
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Internal server error";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof ValidationError) {
    statusCode = 400;
    message = error.errors[0]?.message ?? "Validation error";
  } else if (error.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    message = "Resource already exists";
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

// Handle not-found routes
export const notFound = (req: Request, res: Response<ApiResponse>): void => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
};
