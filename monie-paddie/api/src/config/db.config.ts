import { config } from 'dotenv';
import mongoose from 'mongoose';

config();
const without_internet = false;

const URI = process.env.MONGO_URI || '';
const password = process.env.MONGO_PASSWORD || '';
let connectionString = URI.replace('<password>', password);

async function connectDB() {
  try {
    if (without_internet) connectionString = process.env.MONGO_URI_OFFLINE as string;
    await mongoose.connect(connectionString);
    console.log(`Db connected`);
  } catch (err) {
    console.error(`db connection failed`);
    console.error(err);
  }
}

export default connectDB;
