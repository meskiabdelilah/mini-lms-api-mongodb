import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

dotenv.config();

connectDatabase();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "mini-lms-api",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});