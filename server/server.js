import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './models/User.js';

dotenv.config(); // Load variables from .env

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware setup
const allowedOrigins = [
  // 'http://localhost:5173',
  'https://mini-project-ai-driven-traffic-violation.onrender.com'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json()); // Allows parsing of JSON request bodies

// 1. Connection to MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Atlas Connected: Ready for data operations.');
  } catch (err) {
    console.error('Connection Error:', err.message);
    process.exit(1);
  }
};
connectDB();

app.get('/', (req, res) => { 
  res.send('Traffic Challan Management System API is running');
});

app.get('/api/users', async (req, res) => {
  console.log('Received request from react'); 
  res.send("hello");
});

app.get('/api/:email', async (req, res) => {
  try {
    const {email} = req.params;
    console.log(email);
    const user = await User.findOne({email: email}); // Fetch all users for demo purposes 
    console.log('Fetched User Data:', user); // Debugging line  
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Mongoose documents need to be converted to plain JavaScript objects for safe manipulation
    // We send the entire user object, which contains all vehicles and challans.
    res.json(user); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start server
app.listen(PORT, () => console.log(`Backend API running on http://localhost:${PORT}`));