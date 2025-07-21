import { Task } from "../models/task";
import { CreateTaskRequest, UpdateTaskRequest } from "../types";

export class TaskService {
  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const task = await Task.create(taskData);
    return task;
  }

  async getTasks() {
    const { rows } = await Task.findAndCountAll({
      order: [["created_at", "DESC"]],
    });

    return {
      tasks: rows,
    };
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new Error("Task not found");
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
