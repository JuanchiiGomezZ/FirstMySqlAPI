import { Router } from "express";
import {
  getUsers,
  getUser,
  signUp,
  deleteUser,
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

router.post("/signUp", validateSignUpCreate, signUp);
router.patch("/signUp/Confirmation", verifyToken, signUpConfirmation);
router.post("/login", validateLoginCreate, login);

router.get("/user", verifyToken, getUser);

router.post("/favorite", verifyToken, addFav);
router.get("/favorite", verifyToken, getFavsUser);
router.delete("/favorite/:fav_id", verifyToken, deleteFav);

/* router.delete("/users", verifyToken, deleteUser);
router.get("/favorite", verifyToken, getAllFavs);
router.get("/users", getUsers); */
export default router;
