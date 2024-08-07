import express from "express";
import path from "path";
import cors from "cors";
const NODE_ENV = "production";
import cron from 'node-cron';

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes, { processPayments } from "./routes/adminRoutes.js";

const app = express();
app.use(cors());

// Database connection
import connectDB from "./config/db.js";
connectDB();
// Database connection

app.use(express.json());

// Uploads
const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/uploads", express.static("/var/www/seclob/futurx/login/uploads"));
// Uploads
cron.schedule("29 18 * * *", () => {
  console.log('Running daily payment process');
  processPayments().catch(console.error);
});
const appDir = path.resolve(process.cwd());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

if (NODE_ENV == "production") {
  // app.use(express.static(__dirname + "/frontend/dist"));
  app.use(express.static("/var/www/seclob/futurx/login/frontend/dist"));

  app.get("*", (req, res) => {
    // res.sendFile(__dirname + "/frontend/dist/index.html");
    res.sendFile("/var/www/seclob/futurx/login/frontend/dist/index.html");
  });
} else {
  app.get("/", (req, res) => {
    res.status(201).json("Running");
  });
}

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 6008;

app.listen(port, () => console.log(`Server running in ${port}`));
