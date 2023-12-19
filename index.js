import express from "express"; 
import cors from "cors"
import authRouter from "./src/routes/auth.js"
import uploadFileRouter from "./src/routes/upload.js"
import studentRouter from "./src/routes/student.js"
import attendeceRouter from "./src/routes/attendece.js"
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB is connected"))
  .catch(err => console.error(err));


const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(cors())
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use("/api/v1/image",uploadFileRouter)
app.use("/api/v1/student",studentRouter)
app.use("/api/v1/",attendeceRouter)