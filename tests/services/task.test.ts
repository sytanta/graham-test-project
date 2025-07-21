import { TaskService } from "../../services/task";
import { Task } from "../../models/task";
import { AppError } from "../../middleware/error.middleware";

describe("Task Service", () => {
  let taskService: TaskService;

  beforeAll(() => {
    taskService = new TaskService();
  });

  beforeEach(async () => {
    await Task.destroy({ where: {}, truncate: true });
  });

  afterAll(async () => {
    await Task.destroy({ where: {}, truncate: true });
  });

  describe("createTask", () => {
    it("should create a new task", async () => {
      const taskData = {
        title: "Test Task",
        description: "Test Description",
      };

      const task = await taskService.createTask(taskData);

      expect(task.title).toBe(taskData.title);
      expect(task.description).toBe(taskData.description);
      expect(task.completed).toBe(false);
      expect(task.id).toBeDefined();
    });
  });

  describe("getTasks", () => {
    beforeEach(async () => {
      await Task.bulkCreate([
        { title: "Task 1", description: "Description 1", completed: false },
        { title: "Task 2", description: "Description 2", completed: true },
        { title: "Task 3", description: "Description 3", completed: false },
        { title: "Task 4", description: "Description 4", completed: true },
        { title: "Task 5", description: "Description 5", completed: false },
      ]);
    });

    it("should return paginated tasks", async () => {
      const result = await taskService.getTasks({ page: 1, limit: 3 });

      expect(result.tasks).toHaveLength(3);
      expect(result.pagination).toEqual({
        page: 1,
        limit: 3,
        total: 5,
        total_pages: 2,
      });
    });

    it("should filter tasks by completion status", async () => {
      const result = await taskService.getTasks({ completed: true });

      expect(result.tasks).toHaveLength(2);
      expect(result.tasks.every((task) => task.completed)).toBe(true);
    });

    it("should return tasks ordered by creation date (newest first)", async () => {
      const result = await taskService.getTasks({});

      if (result.tasks.length > 1) {
        expect(
          result.tasks[0].created_at &&
            result.tasks[1].created_at &&
            result.tasks[0].created_at >= result.tasks[1].created_at
        ).toBe(true);
      }
    });
  });

  describe("getTaskById", () => {
    it("should return a task by id", async () => {
      const createdTask = await Task.create({
        title: "Test Task",
        description: "Test Description",
        completed: false,
      });

      const task = await taskService.getTaskById(String(createdTask.id));

      expect(task.id).toBe(createdTask.id);
      expect(task.title).toBe(createdTask.title);
    });

    it("should throw AppError if task not found", async () => {
      await expect(taskService.getTaskById("non-existent-id")).rejects.toThrow(
        AppError
      );
    });
  });

  describe("updateTask", () => {
    it("should update a task", async () => {
      const createdTask = await Task.create({
        title: "Original Title",
        description: "Original Description",
        completed: false,
      });

      const updateData = {
        title: "Updated Title",
        completed: true,
      };

      const updatedTask = await taskService.updateTask(
        String(createdTask.id),
        updateData
      );

      expect(updatedTask.title).toBe("Updated Title");
      expect(updatedTask.completed).toBe(true);
      expect(updatedTask.description).toBe("Original Description");
    });

    it("should throw AppError if task not found", async () => {
      await expect(
        taskService.updateTask("non-existent-id", { title: "New Title" })
      ).rejects.toThrow(AppError);
    });
  });

  describe("deleteTask", () => {
    it("should delete a task", async () => {
      const createdTask = await Task.create({
        title: "Task to Delete",
        description: "This will be deleted",
        completed: false,
      });

      await taskService.deleteTask(String(createdTask.id));

      const deletedTask = await Task.findByPk(createdTask.id);
      expect(deletedTask).toBeNull();
    });

    it("should throw AppError if task not found", async () => {
      await expect(taskService.deleteTask("non-existent-id")).rejects.toThrow(
        AppError
      );
    });
  });
});
