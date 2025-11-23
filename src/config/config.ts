import "dotenv/config";

const _config = {
	port: process.env.PORT,
	db_url: process.env.MONGODB_URI,
	env: process.env.NODE_ENV,
	jwt_secret: process.env.JWT_SECRET,
	cloudinary_name: process.env.CLOUDINARY_NAME,
	cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
	cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};

// Freeze the object to prevent changes
const config = Object.freeze(_config);
export default config;
