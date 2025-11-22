import mongoose from "mongoose";
import config from "./config";

const db_url = config.db_url as string;
const connectDB = async () => {
	try {
		// Connection events
		mongoose.connection.on("connected", () => {
			console.log("✅ Connected successfully to MongoDB");
		});

		// Error events
		mongoose.connection.on("error", (error) => {
			console.log("❌ Error occurred while connecting to MongoDB : ", error);
		});

		await mongoose.connect(db_url);
	} catch (error) {
		console.log("❌ Failed to connect to MongoDB : ", error);
		process.exit(1);
	}
};

export default connectDB;
