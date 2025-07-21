import { Request, Response } from "express";

import { TaskService } from "../services/task";
import {
  ApiResponse,
  CreateTaskRequest,
  TasksQuery,
  UpdateTaskRequest,
} from "../types";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  createTask = async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> => {
    const taskData: CreateTaskRequest = req.body;

    const task = await this.taskService.createTask(taskData);

    res.status(201).json({
      status: "success",
      data: task,
    });
  };

  getTasks = async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> => {
    const query: TasksQuery = req.query;

    const result = await this.taskService.getTasks(query);

    res.status(200).json({
      status: "success",
      data: result.tasks,
      pagination: result.pagination,
    });
  };

  getTaskById = async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> => {
    const { id } = req.params;

    const task = await this.taskService.getTaskById(id);

    res.status(200).json({
      status: "success",
      data: task,
    });
  };

  updateTask = async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> => {
    const { id } = req.params;
    const updateData: UpdateTaskRequest = req.body;

    const task = await this.taskService.updateTask(id, updateData);

    res.status(200).json({
      status: "success",
      data: task,
    });
  };

  deleteTask = async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<void> => {
    const { id } = req.params;

    await this.taskService.deleteTask(id);

    res.status(204).json({
      status: "success",
      message: "Task deleted successfully",
    });
  };
}
