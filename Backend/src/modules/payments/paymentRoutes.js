import express from "express";
import { createPaymentIntent, verifyPayment } from "./paymentController.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/create-intent", createPaymentIntent);
router.post("/verify", verifyPayment);

export default router;
