import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import resturentRouter from "./routes/resturent.route.js";
import userRouter from "./routes/user.routes.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  }),
);

app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", resturentRouter);
app.use("/api/v1/users", userRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    statusCode,
    message: err.message || "Internal server error",
    success: false,
  });
});

export { app };
