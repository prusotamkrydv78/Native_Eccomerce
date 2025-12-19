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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and administration
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.route("/").get(protect, authorize("Admin"), getUsers);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

/**
 * @swagger
 * /api/users/addresses:
 *   post:
 *     summary: Add an address
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - street
 *               - city
 *               - zipCode
 *               - phone
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address added
 */
router.route("/addresses").post(protect, addAddress);

/**
 * @swagger
 * /api/users/addresses/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address removed
 */
router.route("/addresses/:id").delete(protect, deleteAddress);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Soft delete user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
router.route("/:id").delete(protect, authorize("Admin"), deleteUser);

/**
 * @swagger
 * /api/users/{id}/block:
 *   put:
 *     summary: Block/Unblock user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User status toggled
 */
router.route("/:id/block").put(protect, authorize("Admin"), blockUser);

export default router;
