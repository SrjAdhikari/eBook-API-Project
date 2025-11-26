//* src/book/book.route.ts

import { Router } from "express";
import {
	createBook,
	getSingleBook,
	getBooks,
	updateBook,
	deleteBook,
} from "./book.controller";

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

// Get All Book
bookRouter.get("/list", getBooks);

// Get Single Book
bookRouter.get("/:bookId", getSingleBook);

// Delete Book
bookRouter.delete("/:bookId", authenticate, deleteBook);

export default bookRouter;
