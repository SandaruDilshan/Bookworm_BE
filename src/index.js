import express from 'express';
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from './lib/db.js';
import cors from 'cors';
import job from "./lib/corn.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
job.start(); // Start the cron job

//Routes
app.use("/api/auth", authRoutes); // Registering the auth routes
app.use("/api/books", bookRoutes);  


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
    connectDB();
});
