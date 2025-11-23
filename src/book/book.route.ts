//* src/book/book.route.ts

import { Router } from "express";
import { createBook } from "./book.controller";
import upload from "../middlewares/upload.middleware";

const bookRouter = Router();

// Create Book
bookRouter.post(
	"/create",
	upload.fields([
		{ name: "coverImage", maxCount: 1 },
		{ name: "file", maxCount: 1 },
	]),
	createBook
);

export default bookRouter;
