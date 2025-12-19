import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import authRoutes from "./modules/auth/authRoutes.js";
import productRoutes from "./modules/products/productRoutes.js";
import categoryRoutes from "./modules/products/categoryRoutes.js";
import cartRoutes from "./modules/cart/cartRoutes.js";
import orderRoutes from "./modules/orders/orderRoutes.js";
import userRoutes from "./modules/users/userRoutes.js";
import paymentRoutes from "./modules/payments/paymentRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();

// Security Headers
app.use(helmet());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", limiter);

// Standard Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(compression());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

// Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the eCommerce API" });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
