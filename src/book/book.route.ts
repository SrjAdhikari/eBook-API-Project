//* src/book/book.route.ts

import { Router } from "express";
import { createBook, getBooks, updateBook } from "./book.controller";

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

// Get Book
bookRouter.get("/list", getBooks);

// Delete Book

export default bookRouter;
