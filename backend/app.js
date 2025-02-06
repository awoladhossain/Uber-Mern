import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectToDb from "./database/db.js";
import userRoutes from "./routes/user.route.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToDb();

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/users", userRoutes);

export default app;
