import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import coursesRouter from './routes/courses.routes.js';
import modulesRouter from './routes/modules.routes.js';
import notFound from './middlewares/notFound.js';
import errorHandler from "./middlewares/errorHandler.js";

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

app.use("/api/courses",coursesRouter);
app.use("/api/modules", modulesRouter);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});