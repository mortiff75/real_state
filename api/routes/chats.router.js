import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addChat,
  getChat,
  getChats,
  readChat,
} from "../controllers/chats.controller.js";

const router = express();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);

router.post("/", verifyToken, addChat);

router.put("/read/:id", verifyToken, readChat);

export default router;
