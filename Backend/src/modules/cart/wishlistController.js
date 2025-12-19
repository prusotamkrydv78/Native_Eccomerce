import asyncHandler from "express-async-handler";
import Wishlist from "../../models/wishlistModel.js";

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
    "products"
  );
  res.json(wishlist || { products: [] });
});

// @desc    Toggle wishlist item
// @route   POST /api/wishlist/:productId
// @access  Private
export const toggleWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [] });
  }

  const index = wishlist.products.indexOf(productId);
  if (index > -1) {
    wishlist.products.splice(index, 1);
    await wishlist.save();
    res.json({ message: "Removed from wishlist", wishlist });
  } else {
    wishlist.products.push(productId);
    await wishlist.save();
    res.json({ message: "Added to wishlist", wishlist });
  }
});
