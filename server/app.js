import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import leadRouter from "./routes/lead.js";
import connectDB from "./db/connectDB.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/leads", leadRouter);
// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

connectDB();

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Working on port ${port}`);
});
