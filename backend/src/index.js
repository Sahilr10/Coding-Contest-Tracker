import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './db/index.js';
import { app } from './app.js';
import { startReminders } from './utils/reminder.utils.js';

// Start the reminder service
startReminders();

dotenv.config({
    path: './.env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
})