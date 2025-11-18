import express from "express";
import { signup, login, logout, getMe } from "../controllers/authControllers.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// 2 key information from here => Route is api/auth/myInfo request is a GET request
router.get("/myInfo", getMe);

export default router;