import express from "express";
import globalErrorHandler from "./middlewares/error.middleware";

const app = express();

// ---- Home Route -----
app.get("/", (req, res, next) => {
	res.json({
		message: "Welcome to eBook API Project",
	});
});

// ---- Global Error Handler -----
app.use(globalErrorHandler);

export default app;
