import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_kEY,
    api_secret: process.env.CLOUDINARY_API_kEY 
})

export default cloudinary;