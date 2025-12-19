import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import Cart from "../../models/cartModel.js";
import Wishlist from "../../models/wishlistModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../../utils/tokenUtils.js";
import sendEmail from "../../utils/sendEmail.js";
import crypto from "crypto";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: role || "Customer",
  });

  if (user) {
    // Create initial cart and wishlist
    await Cart.create({ user: user._id, items: [] });
    await Wishlist.create({ user: user._id, products: [] });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      accessToken: generateAccessToken({ id: user._id }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.comparePassword(password))) {
    if (user.isBlocked) {
      res.status(403);
      throw new Error("Your account is blocked. Please contact support.");
    }

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token in cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (uses cookie)
export const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.status(401);
    throw new Error("Invalid refresh token");
  }

  try {
    const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (user._id.toString() !== decoded.id) {
      throw new Error("Token mismatch");
    }

    const accessToken = generateAccessToken({ id: user._id });
    res.json({ accessToken });
  } catch (error) {
    res.status(401);
    throw new Error("Token expired or invalid");
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken });

  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error("There is no user with that email");
  }

  // Get reset token
  const resetToken = user.getPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  // Create reset URL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500);
    throw new Error("Email could not be sent");
  }
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    res.status(400);
    throw new Error("Invalid token");
  }

  // Set new password
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});
