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

export const getTasksSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be an integer",
    "number.min": "Page must be at least 1",
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number",
    "number.integer": "Limit must be an integer",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100",
  }),
  completed: Joi.boolean().optional().messages({
    "boolean.base": "Completed filter must be a boolean value",
  }),
});
