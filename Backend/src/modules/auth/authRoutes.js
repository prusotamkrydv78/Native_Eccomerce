import {
  login,
  logout,
  refresh,
  register,
  forgotPassword,
  resetPassword,
} from "./authController.js";
import { protect } from "../../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", protect, logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

export default router;
