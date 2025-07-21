import { Task } from "../models/task";
import { CreateTaskRequest, Query, UpdateTaskRequest } from "../types";
import { AppError } from "../middleware/error.middleware";

export class TaskService {
  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const task = await Task.create(taskData);
    return task;
  }

  async getTasks(query: Query) {
    const { completed } = query;

    const whereClause: Record<string, string | number | boolean | undefined> =
      {};
    if (completed !== undefined) {
      const parsed = JSON.parse(completed);
      if (typeof parsed === "boolean") whereClause.completed = parsed;
    }

    const { rows } = await Task.findAndCountAll({
      where: whereClause,
      order: [["created_at", "DESC"]],
    });

    return {
      tasks: rows,
    };
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    return task;
  }

  async updateTask(id: string, updateData: UpdateTaskRequest): Promise<Task> {
    const task = await this.getTaskById(id);
    await task.update(updateData);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.getTaskById(id);
    await task.destroy();
  }
}
