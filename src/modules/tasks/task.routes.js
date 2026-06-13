import { Router } from "express";

import {
  createTask,
  getTasks,
} from "./task.controller.js";

import {
  createTaskSchema,
  taskIdSchema,
} from "./task.validation.js";

import { validate } from "../../middlewares/validate.middleware.js";

import { protect } from "../../middlewares/auth.middleware.js";
import {
  getTaskById,
  updateTask,
  deleteTask,
} from "./task.controller.js";

import {
  updateTaskSchema,
} from "./task.validation.js";

const router = Router();

router.use(protect);

router.post(
  "/",
  validate(createTaskSchema, "body"),
  createTask
);

router.get(
  "/",
  getTasks
);
router.get(
  "/:id",
  validate(taskIdSchema, "params"),
  getTaskById
);

router.patch(
  "/:id",
  validate(updateTaskSchema, "body"),
  updateTask
);

router.delete(
  "/:id",
  validate(taskIdSchema, "params"),
  deleteTask
);


export default router;