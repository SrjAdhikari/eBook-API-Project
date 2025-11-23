import "dotenv/config";

const _config = {
	port: process.env.PORT,
	db_url: process.env.MONGODB_URI,
	env: process.env.NODE_ENV,
};

// Freeze the object to prevent changes
const config = Object.freeze(_config);
export default config;
