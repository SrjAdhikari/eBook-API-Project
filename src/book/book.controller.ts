//* src/book/book.controller.ts

import { Request, Response, NextFunction } from "express";
import { Book as bookType } from "./book.types";
import { AuthRequest } from "../middlewares/auth.middleware";

import path from "node:path";
import fs from "node:fs";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";
import Book from "./book.model";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
	const { title, genre } = req.body;

	// Multer attaches files in req.files
	const files = req.files as { [fieldname: string]: Express.Multer.File[] };

	// Extract book cover image, mimetype and filename
	const coverImage = files.coverImage[0];
	const coverImageMimeType = coverImage.mimetype.split("/")[1];
	const fileName = coverImage.filename;

	// Build absolute path of file saved by multer
	const filePath = path.resolve(
		__dirname,
		"../../public/data/uploads",
		fileName
	);

	// Upload book cover image to Cloudinary
	let coverImageUploadResult;
	try {
		coverImageUploadResult = await cloudinary.uploader.upload(filePath, {
			filename_override: fileName,
			folder: "book_covers",
			format: coverImageMimeType,
		});
	} catch (error) {
		const err = createHttpError(
			500,
			"Error occurred while uploading cover image"
		);
		return next(err);
	}

	// Extract book file, mimetype and filename
	const bookFile = files.file[0];
	const bookFileMimeType = bookFile.mimetype.split("/")[1];
	const bookFileName = bookFile.filename;

	// Build absolute path of file saved by multer
	const bookFilePath = path.resolve(
		__dirname,
		"../../public/data/uploads",
		bookFileName
	);

	// Upload book PDF file to Cloudinary
	let bookUploadResult;
	try {
		bookUploadResult = await cloudinary.uploader.upload(bookFilePath, {
			resource_type: "raw",
			filename_override: bookFileName,
			folder: "book_pdfs",
			format: bookFileMimeType,
		});
	} catch (error) {
		const err = createHttpError(
			500,
			"Error occurred while uploading book PDF file"
		);
		return next(err);
	}

	// database operation and response
	let newBook: bookType;
	const _req = req as AuthRequest;
	try {
		newBook = await Book.create({
			title,
			genre,
			author: _req.userId,
			coverImage: coverImageUploadResult.secure_url,
			file: bookUploadResult.secure_url,
		});

		// delete files from local uploads folder
		await fs.promises.unlink(filePath);
		await fs.promises.unlink(bookFilePath);

		// send response
		res.status(201).json({
			id: newBook._id,
			message: "New book created successfully",
		});
	} catch (error) {
		console.log(`Error occurred while creating book: ${error}`);

		const err = createHttpError(500, "Error occurred while creating book");
		return next(err);
	}
};

export { createBook };
