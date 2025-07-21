import { Router } from "express";

import { TaskController } from "../controllers/task";

const router = Router();
const taskController = new TaskController();

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export { router as taskRoutes };
