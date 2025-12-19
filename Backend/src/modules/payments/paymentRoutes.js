import express from "express";
import { createPaymentIntent, verifyPayment } from "./paymentController.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Mock payment processing
 */

/**
 * @swagger
 * /api/payments/create-intent:
 *   post:
 *     summary: Create a payment intent (Mock)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *               - orderId
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               orderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Intent created
 */
router.post("/create-intent", createPaymentIntent);

/**
 * @swagger
 * /api/payments/verify:
 *   post:
 *     summary: Verify a payment (Mock)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - paymentId
 *               - status
 *             properties:
 *               orderId:
 *                 type: string
 *               paymentId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified
 */
router.post("/verify", verifyPayment);

export default router;
