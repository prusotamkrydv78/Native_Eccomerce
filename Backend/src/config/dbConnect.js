import mongoose from "mongoose";
import ENV from "../config/ENV.js";

const DbConnect =  async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (e) {
    console.error("MongoDB connection error:", e);
  }
};
export default DbConnect;
