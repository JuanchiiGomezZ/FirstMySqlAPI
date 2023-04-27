import { Router } from "express";
import {
  getUsers,
  getUser,
  signUp,
  deleteUser,
  updateUser,
  login,
  verifyToken,
  checkEmail,
} from "../controllers/users.controllers.js";
import {
  addFav,
  getAllFavs,
  getFavsUser,
  deleteFav,
} from "../controllers/favorite.controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", verifyToken, getUser);

router.delete("/users/:id", verifyToken, deleteUser);

router.patch("/users/:id", verifyToken, updateUser);

router.post("/signUp", checkEmail, signUp);
router.post("/login", login);

router.post("/favorite/:user_id", addFav);
router.get("/favorite/:user_id", getFavsUser);
router.get("/favorite", getAllFavs);
router.delete("/favorite/:fav_id", deleteFav);

export default router;
