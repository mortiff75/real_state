import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  profileePost,
  savePost,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express();

// TODO: FETCH USERS
router.get("/", getUsers);

// TODO: FETCH SINGLE USER
router.get("/:id", verifyToken, getUser);

// TODO: UPDATE USER
router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

// TODO: SAVE POST BY USER
router.post("/save", verifyToken, savePost);

// TODO: FETCH ALL USER POSTS

router.post("/profile-posts", verifyToken, profileePost);

export default router;
