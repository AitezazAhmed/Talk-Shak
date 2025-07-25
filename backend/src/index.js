import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();




app.use(express.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
const PORT = process.env.PORT;
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173","https://talk-shak-p5bw.vercel.app"],
    credentials: true
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
