//* src/user/user.controller.ts

import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "./user.model";
import config from "../config/config";
import { User as UserType } from "./user.types";

const JWT_SECRET = config.jwt_secret as string;
const createUser = async (req: Request, res: Response, next: NextFunction) => {
	// validation
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		const error = createHttpError(400, "All fields are required");
		return next(error);
	}

	// database operation
	try {
		const user = await User.findOne({ email });
		if (user) {
			const error = createHttpError(400, "User already exists with this email");
			return next(error);
		}
	} catch (error) {
		const err = createHttpError(500, "Error occurred while getting user");
		return next(err);
	}

	// password hash
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// create user
	let newUser: UserType;
	try {
		newUser = await User.create({
			name,
			email,
			password: hashedPassword,
		});
	} catch (error) {
		const err = createHttpError(500, "Error occurred while creating user");
		return next(err);
	}

	// Token generation and response
	try {
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
		res.status(201).json({
			accessToken: token,
			message: "User created successfully",
		});
	} catch (error) {
		const err = createHttpError(
			500,
			"Error occurred while signing the jwt token"
		);
		return next(err);
	}
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	// validation
	const { email, password } = req.body;
	if (!email || !password) {
		const error = createHttpError(400, "All fields are required");
		return next(error);
	}

	// database operation
	let user;
	try {
		user = await User.findOne({ email });
		if (!user) {
			const error = createHttpError(400, "User not found");
			return next(error);
		}
	} catch (error) {
		const err = createHttpError(500, "Error occurred while getting user");
		return next(err);
	}

	// password check
	try {
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			const error = createHttpError(400, "Invalid credentials");
			return next(error);
		}
	} catch (error) {
		const err = createHttpError(500, "Error occurred while checking password");
		return next(err);
	}

	// Token generation and response
	try {
		const token = jwt.sign(
			{
				sub: user._id,
			},
			JWT_SECRET,
			{
				expiresIn: "7d",
			}
		);

		// send response
		res.status(200).json({
			accessToken: token,
			message: "Login successfully",
		});
	} catch (error) {
		const err = createHttpError(
			500,
			"Error occurred while signing the jwt token"
		);
		return next(err);
	}
};

export { createUser, loginUser };
