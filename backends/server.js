import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/url.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();
app.use(cors());

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

// // Requirements

// http://localhost:8000/links
