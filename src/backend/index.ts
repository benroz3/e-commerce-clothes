import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//configs
const app = express();
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

//middlewares
app.use(express.json());

//start server
app.listen(8080, () => {
  connectMongo();
  console.log(`Server running.`);
});
