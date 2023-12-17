import fs from "fs";

import { v2 as cloudinary  } from "cloudinary";

cloudinary.config({ 
  cloud_name: "dhj0psj1x", 
  api_key: "737741374866656", 
  api_secret: "qqcxP8oabYgtAqYKw6OiuR2iXTg" 
});


async function uploadToCloudinary(filePath) {
  try {
    const response = await cloudinary.uploader.upload(filePath);
    console.log("response===============",response)
    return response.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default uploadToCloudinary;