import asyncHandler from "express-async-handler";
import Cart from "../../models/cartModel.js";
import Product from "../../models/productModel.js";

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  if (cart) {
    res.json(cart);
  } else {
    // Should have been created on register, but just in case
    const newCart = await Cart.create({ user: req.user._id, items: [] });
    res.json(newCart);
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, qty, variant } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const cart = await Cart.findOne({ user: req.user._id });

  const itemIndex = cart.items.findIndex(
    (p) =>
      p.product.toString() === productId &&
      JSON.stringify(p.variant) === JSON.stringify(variant)
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
  } else {
    cart.items.push({ product: productId, qty, variant });
  }

  const updatedCart = await cart.save();
  res.status(201).json(updatedCart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeItemFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    await cart.save();
    res.json(cart);
  } else {
    res.status(404);
    throw new Error("Cart not found");
  }
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItemQty = asyncHandler(async (req, res) => {
  const { qty } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const item = cart.items.find((i) => i._id.toString() === req.params.itemId);
    if (item) {
      item.qty = qty;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404);
      throw new Error("Item not found in cart");
    }
  } else {
    res.status(404);
    throw new Error("Cart not found");
  }
});
