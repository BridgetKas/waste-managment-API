import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const mongoUri = process.env.MONGO_URI 


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUri || 'undefined');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
};
