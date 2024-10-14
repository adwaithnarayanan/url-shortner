import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/url.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/links", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

// // Requirements

// url create /url
// /url/create  - create an entry in db
// /url/update  - edit the entry in db
// /url/delete   - remove the url from db
// /utl/get - send all url as response
// url.route.js

// abcdefg |  /z
