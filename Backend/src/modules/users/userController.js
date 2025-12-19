import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      addresses: user.addresses,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Add address
// @route   POST /api/users/addresses
// @access  Private
export const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const newAddress = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      country: req.body.country,
      isDefault: req.body.isDefault || false,
    };

    if (newAddress.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push(newAddress);
    await user.save();
    res.status(201).json(user.addresses);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete address
// @route   DELETE /api/users/addresses/:id
// @access  Private
export const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.id
    );
    await user.save();
    res.json(user.addresses);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isDeleted: false });
  res.json(users);
});

// @desc    Delete user (Soft delete)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isDeleted = true;
    await user.save();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Block/Unblock user
// @route   PUT /api/users/:id/block
// @access  Private/Admin
export const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"}` });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
