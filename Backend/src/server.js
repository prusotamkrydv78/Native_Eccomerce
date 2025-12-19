import "dotenv/config";
import http from "http";
import app from "./app.js";
import DbConnect from "./config/dbConnect.js";

const PORT = process.env.PORT || 5000;

// Connect to Database
DbConnect();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
