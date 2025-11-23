//* src/user/user.model.ts

import mongoose from "mongoose";
import { User } from "./user.types";

const { Schema } = mongoose;
const userSchema = new Schema<User>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model<User>("User", userSchema);
export default User;
