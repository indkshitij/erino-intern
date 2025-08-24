import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import leadRouter from "./routes/lead.js";
import connectDB from "./db/connectDB.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/leads", leadRouter);

if (process.env.NODE_ENV === "production") { 
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

connectDB();

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Working on port ${port}`);
});
