import express from "express";
import {
  addAddress,
  blockUser,
  deleteAddress,
  deleteUser,
  getUserProfile,
  getUsers,
  updateUserProfile,
} from "./userController.js";
import { protect, authorize } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, authorize("Admin"), getUsers);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/addresses").post(protect, addAddress);

router.route("/addresses/:id").delete(protect, deleteAddress);

router.route("/:id").delete(protect, authorize("Admin"), deleteUser);

router.route("/:id/block").put(protect, authorize("Admin"), blockUser);

export default router;
