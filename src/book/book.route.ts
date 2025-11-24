//* src/book/book.route.ts

import { Router } from "express";
import { createBook, updateBook } from "./book.controller";

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

// Update Book
bookRouter.patch(
	"/update/:bookId",
	authenticate,
	upload.fields([
		{ name: "coverImage", maxCount: 1 },
		{ name: "file", maxCount: 1 },
	]),
	updateBook
);

// Delete Book
// Get Book
export default bookRouter;
