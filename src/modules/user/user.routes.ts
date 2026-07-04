import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

// user related routes
router.post("/", userControllers.createUser);
router.get("/", userControllers.getUser);
router.get("/:id", userControllers.getSingleUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
