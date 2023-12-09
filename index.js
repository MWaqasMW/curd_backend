import express from "express"; 
import cors from "cors"
import authRouter from "./routes/auth.js"
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
app.use('/api/auth', authRouter);