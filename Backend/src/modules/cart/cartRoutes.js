import express from "express";
import {
  addItemToCart,
  getCart,
  removeItemFromCart,
  updateCartItemQty,
} from "./cartController.js";
import { getWishlist, toggleWishlist } from "./wishlistController.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

// Cart
router.route("/cart").get(getCart).post(addItemToCart);

router.route("/cart/:itemId").put(updateCartItemQty).delete(removeItemFromCart);

// Wishlist
router.route("/wishlist").get(getWishlist);

router.post("/wishlist/:productId", toggleWishlist);

export default router;
