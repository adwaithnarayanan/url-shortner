import express from "express";
const urlRouter = express.Router();
import {
  createUrl,
  deleteUrl,
  editUrl,
  getUrl,
  getUrls,
} from "../controllers/urlController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

urlRouter
  .route("/links/")
  .get(validateToken, getUrls)
  .post(validateToken, createUrl);

urlRouter
  .route("/links/:id")
  .put(validateToken, editUrl)
  .delete(validateToken, deleteUrl);
urlRouter.route("/:id").get(getUrl);

export { urlRouter };
