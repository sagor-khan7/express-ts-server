import express, { Request, Response } from "express";

import initDB from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todosRouter } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());

// middlewares
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World!");
});

// initializing db
initDB();

// users CRUD
app.use("/users", userRoutes);

// todos CRUD
app.use("/todos", todosRouter);

// auth routes
app.use("/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
