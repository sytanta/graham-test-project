import { Router } from "express";

import { AuthController } from "../controllers/auth";
import { validateBody } from "../middleware/validation.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";

const router = Router();
const authController = new AuthController();

router.post("/register", validateBody(registerSchema), authController.register);
router.post("/login", validateBody(loginSchema), authController.login);

export { router as authRoutes };
