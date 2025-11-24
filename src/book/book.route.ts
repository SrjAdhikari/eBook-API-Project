//* src/book/book.route.ts

import { Router } from "express";
import { createBook } from "./book.controller";
import upload from "../middlewares/upload.middleware";
import authenticate from "../middlewares/auth.middleware";

const bookRouter = Router();

// Create Book
bookRouter.post(
	"/create",
	authenticate,
	upload.fields([
		{ name: "coverImage", maxCount: 1 },
		{ name: "file", maxCount: 1 },
	]),
	createBook
);

export default bookRouter;
