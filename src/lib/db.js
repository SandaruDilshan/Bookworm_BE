import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected : ${conn.connection.host}`);
    } catch (error) {
        console.log("Error while connecting to database", error);
        process.exit(1); // Exit with faliure, 1 meeans faliur, 0 means success
    }
};