import request from "supertest";

import app from "../../app";
import { Task } from "../../models/task";

describe("Task Controller", () => {
  beforeEach(async () => {
    await Task.destroy({ where: {} });
  });

  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      const taskData = {
        title: "Test Task",
        description: "Test Description",
      };

      const response = await request(app)
        .post("/api/tasks")
        .send(taskData)
        .expect(201);

      expect(response.body.status).toBe("success");
      expect(response.body.data.title).toBe(taskData.title);
      expect(response.body.data.description).toBe(taskData.description);
      expect(response.body.data.completed).toBe(false);
    });

    it("should return 400 if title is missing", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .send({ description: "Test Description" })
        .expect(400);

      expect(response.body.status).toBe("error");
      expect(response.body.message).toContain("Title is required");
    });
  });

  describe("GET /api/tasks", () => {
    beforeEach(async () => {
      await Task.bulkCreate([
        { title: "Task 1", description: "Description 1", completed: false },
        { title: "Task 2", description: "Description 2", completed: true },
        { title: "Task 3", description: "Description 3", completed: false },
      ]);
    });

    it("should return paginated tasks", async () => {
      const response = await request(app)
        .get("/api/tasks?page=1&limit=2")
        .expect(200);

      expect(response.body.status).toBe("success");
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination).toEqual(
        expect.objectContaining({
          page: 1,
          limit: 2,
          total: 3,
          total_pages: 2,
        })
      );
    });

    it("should filter tasks by completion status", async () => {
      const response = await request(app)
        .get("/api/tasks?completed=true")
        .expect(200);

      expect(response.body.status).toBe("success");
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].completed).toBe(true);
    });
  });

  describe("GET /api/tasks/:id", () => {
    it("should return a single task", async () => {
      const task = await Task.create({
        title: "Test Task",
        description: "Test Description",
        completed: false,
      });

      const response = await request(app)
        .get(`/api/tasks/${task.id}`)
        .expect(200);

      expect(response.body.status).toBe("success");
      expect(response.body.data.id).toBe(task.id);
      expect(response.body.data.title).toBe(task.title);
    });

    it("should return 404 if task not found", async () => {
      const response = await request(app)
        .get("/api/tasks/non-existent-id")
        .expect(404);

      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Task not found");
    });
  });

  describe("PATCH /api/tasks/:id", () => {
    it("should update a task", async () => {
      const task = await Task.create({
        title: "Original Title",
        description: "Original Description",
        completed: false,
      });

      const updateData = {
        title: "Updated Title",
        completed: true,
      };

      const response = await request(app)
        .patch(`/api/tasks/${task.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.status).toBe("success");
      expect(response.body.data.title).toBe("Updated Title");
      expect(response.body.data.completed).toBe(true);
      expect(response.body.data.description).toBe("Original Description");
    });

    it("should return 400 if invalid data provided", async () => {
      const task = await Task.create({
        title: "Test Task",
        description: "Test Description",
        completed: false,
      });

      const response = await request(app)
        .patch(`/api/tasks/${task.id}`)
        .send({ completed: "invalid-boolean" })
        .expect(400);

      expect(response.body.status).toBe("error");
      expect(response.body.message).toContain("Completed must be a boolean");
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    // it("should delete a task", async () => {
    //   const task = await Task.create({
    //     title: "Task to Delete",
    //     description: "This task will be deleted",
    //     completed: false,
    //   });

    //   const response = await request(app)
    //     .delete(`/api/tasks/${task.id}`)
    //     .expect(204);
    //   expect(response.body.status).toBe("success");

    //   // Verify task is deleted
    //   const deletedTask = await Task.findByPk(task.id);
    //   expect(deletedTask).toBeNull();
    // });

    it("should return 404 if task not found", async () => {
      const response = await request(app)
        .delete("/api/tasks/non-existent-id")
        .expect(404);

      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Task not found");
    });
  });
});
