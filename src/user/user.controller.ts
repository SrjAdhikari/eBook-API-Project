//* src/user/user.controller.ts

import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import User from "./user.model";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
	// validation
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		const error = createHttpError(400, "All fields are required");
		return next(error);
	}

	// database operation
	const user = await User.findOne({ email });
	if (user) {
		const error = createHttpError(400, "User already exists with this email");
		return next(error);
	}

	// password hash
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// process

	// send response
	res.json({         
		message: "User created successfully",
	});
};

export { createUser };
