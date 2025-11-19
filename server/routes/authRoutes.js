import express from "express";
import { signup, login, logout, getMe, forgotPassword,resetPassword } from "../controllers/authControllers.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token", resetPassword);

// 2 key information from here => Route is api/auth/myInfo request is a GET request
router.get("/myInfo", getMe);

export default router;