import { Request, Response } from "express";

import { TaskService } from "../services/task";
import { ApiResponse, CreateTaskRequest, UpdateTaskRequest } from "../types";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  createTask = async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> => {
    try {
      const taskData: CreateTaskRequest = req.body;

      const task = await this.taskService.createTask(taskData);

      res.status(201).json({
        status: "success",
        data: task,
      });
    } catch (error) {
      throw error;
    }
  };

  getTasks = async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> => {
    try {
      const result = await this.taskService.getTasks();

      res.status(200).json({
        status: "success",
        data: result.tasks,
      });
    } catch (error) {
      throw error;
    }
  };

  getTaskById = async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const task = await this.taskService.getTaskById(id);

      res.status(200).json({
        status: "success",
        data: task,
      });
    } catch (error) {
      throw error;
    }
  };

  updateTask = async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData: UpdateTaskRequest = req.body;

      const task = await this.taskService.updateTask(id, updateData);

      res.status(200).json({
        status: "success",
        data: task,
      });
    } catch (error) {
      throw error;
    }
  };

  deleteTask = async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> => {
    try {
      const { id } = req.params;

      await this.taskService.deleteTask(id);

      res.status(204).json({
        status: "success",
        message: "Task deleted successfully",
      });
    } catch (error) {
      throw error;
    }
  };
}
