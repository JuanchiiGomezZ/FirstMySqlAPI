import { Router } from "express";
import {
  getUsers,
  getUser,
  signUp,
  deleteUser,
  updateUser,
  login,
  verifyToken,
  signUpConfirmation,
} from "../controllers/users.controllers.js";
import {
  addFav,
  getAllFavs,
  getFavsUser,
  deleteFav,
} from "../controllers/favorite.controller.js";
import {
  validateSignUpCreate,
  validateLoginCreate,
} from "../validator/users.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", verifyToken, getUser);

router.delete("/users/:id", verifyToken, deleteUser);

router.patch("/users/:id", verifyToken, updateUser);

router.post("/signUp", validateSignUpCreate, signUp);
router.patch("/signUp/Confirmation", signUpConfirmation);
router.post("/login", validateLoginCreate, login);

router.post("/favorite/:user_id", verifyToken, addFav);
router.get("/favorite/:user_id", verifyToken, getFavsUser);
router.get("/favorite", verifyToken, getAllFavs);
router.delete("/favorite/:fav_id", verifyToken, deleteFav);

export default router;
