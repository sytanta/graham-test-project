import { Router } from "express";

import {
  validateBody,
  validateQuery,
} from "../middleware/validation.middleware";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.validator";
import { TaskController } from "../controllers/task";

const router = Router();
const taskController = new TaskController();

router.post("/", validateBody(createTaskSchema), taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.patch("/:id", validateBody(updateTaskSchema), taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export { router as taskRoutes };
