import app from "./app.js";
import { connDB } from "./config/DBConfig.js";
import cloudinary from "cloudinary";
import { config } from "dotenv";

// Dot env files configuration
config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// connecting to database
connDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
