import { Router } from "express";
import {
  getUsers,
  getUser,
  signUp,
  deleteUser,
  updateUser,
  login,
  verifyToken,
} from "../controllers/users.controllers.js";
import {
  addFav,
  getAllFavs,
  getFavsUser,
} from "../controllers/favorite.controller.js";

const router = Router();

/* NUEVO */
router.get("/users", getUsers);
router.get("/users/:id", verifyToken, getUser);

router.delete("/users/:id", verifyToken, deleteUser);

router.patch(
  "/users/:id",
  verifyToken,
  updateUser
); /* PATCH PARA MODIFICAR PARCIALMENTE || PUT PARA MODIFICAR TODO */

router.post("/signUp", signUp);
router.post("/login", login);

router.post("/favorite/:user_id", addFav);
router.get("/favorite/:user_id", getFavsUser);
router.get("/favorite", getAllFavs);

export default router;
