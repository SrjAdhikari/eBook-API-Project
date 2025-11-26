//* src/app.ts

import express from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/error.middleware";
import userRouter from "./user/user.route";
import bookRouter from "./book/book.route";
import config from "./config/config";

const app = express();
const frontend_url = config.frontend_url as string;

// Parse JSON request body
app.use(express.json());

// Enable CORS for all routes
app.use(
	cors({
		origin: [frontend_url],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// ---- Home Route -----
app.get("/", (req, res, next) => {
	res.json({
		message: "Welcome to eBook API Project",
	});
});

// ---- API Routes -----
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// ---- Global Error Handler -----
app.use(globalErrorHandler);

export default app;
