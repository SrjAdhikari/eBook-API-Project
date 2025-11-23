//* src/book/book.controller.ts

import { Request, Response, NextFunction } from "express";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
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
	try {
		const coverImageUploadResult = await cloudinary.uploader.upload(filePath, {
			filename_override: fileName,
			folder: "book_covers",
			format: coverImageMimeType,
		});

		console.log(
			`Cover image uploaded to Cloudinary: ${JSON.stringify(
				coverImageUploadResult
			)}`
		);
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
	try {
		const bookUploadResult = await cloudinary.uploader.upload(bookFilePath, {
			resource_type: "raw",
			filename_override: bookFileName,
			folder: "book_pdfs",
			format: bookFileMimeType,
		});

		console.log(
			`Book PDF file uploaded to Cloudinary: ${JSON.stringify(
				bookUploadResult
			)}`
		);
	} catch (error) {
		const err = createHttpError(
			500,
			"Error occurred while uploading book PDF file"
		);
		return next(err);
	}
};

export { createBook };
