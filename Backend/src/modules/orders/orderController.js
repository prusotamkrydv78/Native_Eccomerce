import asyncHandler from "express-async-handler";
import Order from "../../models/orderModel.js";
import Product from "../../models/productModel.js";
import Cart from "../../models/cartModel.js";
import mongoose from "mongoose";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Check stock and reduce stock atomically
    for (const item of orderItems) {
      const product = await Product.findById(item.product).session(session);
      if (!product) throw new Error(`Product not found: ${item.name}`);

      // If product has variants, find the correct one
      if (item.variant && (item.variant.size || item.variant.color)) {
        const variant = product.variants.find(
          (v) => v.size === item.variant.size && v.color === item.variant.color
        );
        if (!variant || variant.stock < item.qty) {
          throw new Error(
            `Insufficient stock for ${item.name} (${item.variant.size}/${item.variant.color})`
          );
        }
        variant.stock -= item.qty;
      } else {
        // Assume non-variant product or fallback to totalStock logic if variants aren't used
        if (product.totalStock < item.qty) {
          throw new Error(`Insufficient stock for ${item.name}`);
        }
      }

      product.totalStock -= item.qty;
      await product.save({ session });
    }

    // 2. Create order
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save({ session });

    // 3. Clear Cart
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(createdOrder);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "firstName lastName email"
  );

  if (order) {
    // Check if order belongs to user or if user is admin
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      res.status(403);
      throw new Error("Not authorized to view this order");
    }
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = "paid";
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = "delivered";
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "id firstName lastName")
    .sort("-createdAt");
  res.json(orders);
});
