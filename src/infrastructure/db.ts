import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;

    if (!connectionString) {
      throw new Error("connectionString undefined");
    }
    await mongoose.connect(`${connectionString}`);
    console.log("DB connection successful");
  } catch (error) {
    console.log("DB connection failed", error);
  }
};
