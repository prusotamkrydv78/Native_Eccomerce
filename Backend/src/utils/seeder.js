import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Wishlist from "../models/wishlistModel.js";
import DbConnect from "../config/dbConnect.js";

dotenv.config();

DbConnect();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();

    // Create Admin
    const admin = await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: "password123",
      role: "Admin",
      isVerified: true,
    });

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
