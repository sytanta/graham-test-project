import { Request, Response, NextFunction } from "express";
import Joi from "joi";

import { ApiResponse } from "../types";

// Joi validates request body
export const validateBody = (schema: Joi.ObjectSchema) => {
  return (
    req: Request,
    res: Response<ApiResponse>,
    next: NextFunction
  ): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      res.status(400).json({
        status: "error",
        message: errorMessage,
      });
      return;
    }

    req.body = value;
    next();
  };
};

// Validate query params
export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (
    req: Request,
    res: Response<ApiResponse>,
    next: NextFunction
  ): void => {
    const { error } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      res.status(400).json({
        status: "error",
        message: errorMessage,
      });
      return;
    }

    next();
  };
};
