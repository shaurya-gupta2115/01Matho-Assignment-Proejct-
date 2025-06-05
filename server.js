const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const chapterRoutes = require("./routes/chapterRoutes");
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");
const sessionRoutes = require("./routes/sessionRoutes");

dotenv.config();
connectDB();

const app = express();

// yaha pr loggin + parsing  + ratelimiting laga diya hai
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);

// Debug middleware: log all incoming requests
app.use((req, res, next) => {
  console.log(`>>> REQUEST: ${req.method} ${req.url}`);
  next();
});

// yaha pr routing hai
app.use("/api/v1/chapters", chapterRoutes);
app.use("/api/v1/session", sessionRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
    } else {
      console.error("Server error:", err);
    }
  });
