//* src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import config from "../config/config";

const jwt_secret = config.jwt_secret as string;
export interface AuthRequest extends Request {
	userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
	try {
		let token;

		// Check if the Authorization header is present and starts with "Bearer"
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			// Extract the token from the Authorization header
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			const error = createHttpError(401, "Authentication token is missing");
			return next(error);
		}

		// Verify the token
		const decodedToken = jwt.verify(token, jwt_secret);

		// Attach user information (userId) to the request object for further use
		const _req = req as AuthRequest;
		_req.userId = decodedToken.sub as string;

		// Proceed to the next middleware or route handler
		next();
	} catch (error) {
		console.log(`Error during authentication: ${error}`);

		const err = createHttpError(401, "Invalid authentication token");
		return next(err);
	}
};

export default authenticate;
