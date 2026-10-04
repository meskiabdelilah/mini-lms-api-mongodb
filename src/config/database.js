import mongoose from "mongoose";


/**
 * Connects the application to MongoDB using the MONGODB_URI environment variable.
 * Stops the Node.js process if the connection fails.
 */
const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed", error.message);
        process.exit(1);
    }
};

export default connectDatabase;