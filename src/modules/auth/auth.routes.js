import { Router } from "express";

import {
  signup,
  login,
  logout,
  me,
} from "./auth.controller.js";

import {
  signupSchema,
  loginSchema,
} from "./auth.validation.js";

import { validate } from "../../middlewares/validate.middleware.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/signup",
  validate(signupSchema),
  signup
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.post(
  "/logout",
  logout
);

router.get(
  "/me",
  protect,
  me
);

export default router;