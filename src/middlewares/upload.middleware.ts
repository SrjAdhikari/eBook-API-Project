import path from "node:path";
import multer from "multer";

/**
 * Configure Multer for file uploads
 *
 * - `dest`: Absolute path where uploaded files will be stored
 *    (../../public/data/uploads relative to current file)
 * - `limits`: Maximum allowed file size (10MB)
 *
 * - Multer will automatically save incoming files to the specified directory
 *   and include metadata in `req.file` or `req.files`.
 */
const upload = multer({
	dest: path.resolve(__dirname, "../../public/data/uploads"),
	limits: { fileSize: 1e7 },
});

export default upload;
