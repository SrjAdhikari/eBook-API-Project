//* src/app.ts

import express from "express";
import globalErrorHandler from "./middlewares/error.middleware";
import userRouter from "./user/user.route";

const app = express();

// ---- Home Route -----
app.get("/", (req, res, next) => {
	res.json({
		message: "Welcome to eBook API Project",
	});
});

// ---- API Routes -----
app.use("/api/users", userRouter);

// ---- Global Error Handler -----
app.use(globalErrorHandler);

export default app;
