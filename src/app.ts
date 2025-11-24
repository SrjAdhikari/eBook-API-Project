//* src/app.ts

import express from "express";
import globalErrorHandler from "./middlewares/error.middleware";
import userRouter from "./user/user.route";
import bookRouter from "./book/book.route";

const app = express();

// Parse JSON request body
app.use(express.json());

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
