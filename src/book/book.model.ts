//* src/book/book.model.ts

import mongoose from "mongoose";
import { Book } from "./book.types";

const { Schema } = mongoose;
const bookSchema = new Schema<Book>(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		genre: {
			type: String,
			required: true,
		},
		coverImage: {
			type: String,
			required: true,
		},
		file: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Book = mongoose.model<Book>("Book", bookSchema);
export default Book;
