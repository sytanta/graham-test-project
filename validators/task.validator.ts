import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 1 character long",
    "string.max": "Title cannot exceed 255 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().max(4000).required().messages({
    "string.empty": "Description cannot be empty",
    "string.max": "Description cannot exceed 4000 characters",
    "string.min": "Description must be at least 1 character long",
    "any.required": "Description is required",
  }),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).optional().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 1 character long",
    "string.max": "Title cannot exceed 255 characters",
  }),
  description: Joi.string().max(4000).optional().messages({
    "string.min": "Description must be at least 1 character long",
    "string.max": "Description cannot exceed 4000 characters",
  }),
  completed: Joi.boolean().optional().messages({
    "boolean.base": "Completed must be a boolean value",
  }),
}).min(1);
