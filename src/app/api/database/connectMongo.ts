import mongoose from "mongoose";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config();
const mongoURL = process.env.MONGO_URL || "";

export const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json({
      success: false,
      message: "There was an error connecting to database!",
    });
  }
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB!");
  });
};
