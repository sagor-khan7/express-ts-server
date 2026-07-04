import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todosRouter } from "./modules/todo/todo.routes";

const app = express();
const port = config.port;
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

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
