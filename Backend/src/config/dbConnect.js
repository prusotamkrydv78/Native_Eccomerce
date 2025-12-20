import mongoose from "mongoose";

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (e) {
    console.error("MongoDB connection error:", e);
  }
};
export default DbConnect;
