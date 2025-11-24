//* src/book/book.types.ts

import { Types } from "mongoose";
import { User } from "../user/user.types";

export interface Book {
	_id: string;
	title: string;
	author: Types.ObjectId | User;
	genre: string;
	coverImage: string;
	file: string;
	createdAt: Date;
	updatedAt: Date;
}
