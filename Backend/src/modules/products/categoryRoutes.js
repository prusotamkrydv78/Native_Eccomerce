import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./categoryController.js";
import { protect, authorize } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(protect, authorize("Admin"), createCategory);

router
  .route("/:id")
  .put(protect, authorize("Admin"), updateCategory)
  .delete(protect, authorize("Admin"), deleteCategory);

export default router;
