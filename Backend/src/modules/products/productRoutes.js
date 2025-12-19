import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createProductReview,
} from "./productController.js";
import { protect, authorize } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, authorize("Admin", "Seller"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, authorize("Admin", "Seller"), updateProduct)
  .delete(protect, authorize("Admin", "Seller"), deleteProduct);

router.post("/:id/reviews", protect, createProductReview);

export default router;
