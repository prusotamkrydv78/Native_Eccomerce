const ENV = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGO_URI || process.env.MONGODB_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT: {
    ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  },
};
export default ENV;
