import { Router } from "express";
import { upload } from "../middlewhere/multer.js"; // Corrected the import statement
import fs from "fs";
import  uploadToCloudinary  from "../utils/upload.js";



const router = Router();
router.post('/upload', upload.single('file'), async (req, res) => {
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  try {
    const cloudinaryUrl = await uploadToCloudinary(uploadedFile.path);
console.log("uploadedFile======",cloudinaryUrl)
    // if (uploadedFile) {
    //   fs.unlinkSync(uploadedFile.path);
    // }
    return res.send({ message: 'File uploaded successfully', url: cloudinaryUrl });
  } catch (error) {
console.log(error)

    if (uploadedFile) {
      fs.unlinkSync(uploadedFile.path);
    }

    return res.status(500).send({ message: 'Error uploading file' });
  }
});






export default router;
