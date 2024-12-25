// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON requests
app.use(cors());          // For handling cross-origin requests
app.use(morgan('dev'));   // For logging HTTP requests

// MongoDB connection
if(process.env.MONGO_URI=="" || process.env.MONGO_URI==" " || process.env.MONGO_URI==null){
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


// Set up a sample route
app.get('/', (req, res) => {
  res.send('Welcome to the backend with MongoDB!');
});

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
