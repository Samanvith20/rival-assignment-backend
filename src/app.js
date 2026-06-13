import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";





const app = express();
app.use(cookieParser());

app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});

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

export default app;