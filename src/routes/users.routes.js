import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/users.controllers.js";

const router = Router();

/* NUEVO */
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUser); /* PATCH PARA MODIFICAR PARCIALMENTE || PUT PARA MODIFICAR TODO */
router.post("/users", createUser);

export default router;
