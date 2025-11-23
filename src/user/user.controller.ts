//* src/user/user.controller.ts

import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "./user.model";
import config from "../config/config";

const JWT_SECRET = config.jwt_secret as string;
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

	// create user
	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	// Token generation
	const token = jwt.sign(
		{
			sub: newUser._id,
		},
		JWT_SECRET,
		{
			expiresIn: "7d",
		}
	);

	// send response
	res.json({
		accessToken: token,
		message: "User created successfully",
	});
};

export { createUser };
