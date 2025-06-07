import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.js";
import orderRouter from './src/routes/Order.js';
import mailRouter from './src/routes/Mail.js';

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api/auth", userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/mail', mailRouter);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
