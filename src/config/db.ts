import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI as string;
export const connectDB = () => {
	mongoose.
		connect(mongoURI)
		.then(() => {
			console.log('connected to MongoDB');
		}).catch((error) => {
			console.log(error);
		});
};