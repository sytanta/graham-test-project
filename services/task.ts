import { Task } from "../models/task";
import { CreateTaskRequest, TasksQuery, UpdateTaskRequest } from "../types";
import { AppError } from "../middleware/error.middleware";

export class TaskService {
  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const task = await Task.create(taskData);
    return task;
  }

  async getTasks(query: TasksQuery) {
    let { page = 1, limit = 10, completed } = query;

    page = Number(page ?? 1);
    limit = Number(limit ?? 10);
    const offset = (page - 1) * limit;

    const whereClause: Record<string, string | number | boolean | undefined> =
      {};
    if (completed !== undefined) {
      const parsed = JSON.parse(completed);
      if (typeof parsed === "boolean") whereClause.completed = parsed;
    }

    const { count, rows } = await Task.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset,
      order: [["created_at", "DESC"]],
    });

    return {
      tasks: rows,
      pagination: {
        page,
        limit,
        total: count,
        total_pages: Math.ceil(count / limit),
      },
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
