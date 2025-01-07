import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();

//TODO: Register User

router.post("/register", register);

// TODO: Login User

router.post("/login", login);
// TODO: Logout User
router.post("/logout", logout);

export default router;
