import app from "./src/app";
import config from "./src/config/config";
import connectDB from "./src/config/db";

const port = config.port || 3000;
const startServer = async () => {
	// Connect to MongoDB
	await connectDB();

	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
};

startServer();
