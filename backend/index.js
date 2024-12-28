import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/route.js";

// Load environment variables from .env file
dotenv.config({
  path: "./.env", // Ensure the correct path is used
});

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Use environment variable for origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(morgan("dev")); // Logging HTTP requests

// MongoDB connection
if(!process.env.MONGO_URI){
  console.log("Error passed database is empty.");
}else{
  mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
      });

}

// Set up routes
app.use("/", userRouter);


// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
