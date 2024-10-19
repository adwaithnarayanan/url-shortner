import express from "express";
import {
  createUrl,
  deleteUrl,
  editUrl,
  getUrl,
  getUrls,
} from "../controllers/urlController.js";
const urlRouter = express.Router();

urlRouter.route("/links/").get(getUrls).post(createUrl);
urlRouter.route("/links/:id").put(editUrl).delete(deleteUrl);
urlRouter.route("/:id").get(getUrl);

export { urlRouter };
