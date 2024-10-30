import express from "express";
import "dotenv/config";
import { urlRouter } from "./routes/url.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

import { userRouter } from "./routes/userRoutes.js";
const app = express();

const port = process.env.PORT || 8000;
// const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", urlRouter);
app.use("/users", userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
