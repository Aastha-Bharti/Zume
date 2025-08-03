import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(' MongoDB connected');
    } catch (err) {
        console.error(' MongoDB connection error:', err.message);
        process.exit(1); // Exit process if connection fails
    }
};
