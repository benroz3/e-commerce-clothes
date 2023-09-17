import mongoose from 'mongoose'
import dotenv from "dotenv";

//configs
dotenv.config();

//mongoDB connection
const mongoURL = process.env.MONGO_URL || "";
const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB!");
  });
};

export default connectMongo