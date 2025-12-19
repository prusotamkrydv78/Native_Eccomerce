import asyncHandler from "express-async-handler";
import Order from "../../models/orderModel.js";

// @desc    Create payment intent (Mock)
// @route   POST /api/payments/create-intent
// @access  Private
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency, orderId } = req.body;

  // In a real app, you'd call Stripe/Razorpay here
  // const paymentIntent = await stripe.paymentIntents.create({ ... });

  res.json({
    clientSecret: "mock_secret_" + Math.random().toString(36).substring(7),
    amount,
    currency,
    orderId,
  });
});

// @desc    Verify payment (Mock)
// @route   POST /api/payments/verify
// @access  Private
export const verifyPayment = asyncHandler(async (req, res) => {
  const { orderId, paymentId, status } = req.body;

  if (status === "succeeded") {
    const order = await Order.findById(orderId);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.status = "paid";
      order.paymentResult = {
        id: paymentId,
        status: "succeeded",
        update_time: new Date().toISOString(),
      };
      await order.save();
      res.json({
        success: true,
        message: "Payment verified and order updated",
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } else {
    res.status(400);
    throw new Error("Payment failed");
  }
});
