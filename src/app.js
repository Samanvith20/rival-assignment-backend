import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";






const app = express();
app.use(cookieParser());
app.use(errorHandler);
app.use(express.json());


app.use(
  cors({
    origin:
      "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/tasks",
  taskRoutes
);

export default app;