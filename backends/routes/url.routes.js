import express from "express";
import {
  createUrl,
  deleteUrl,
  editUrl,
  getUrl,
  getUrls,
} from "../controllers/urlController.js";
const router = express.Router();

router.route("/links/").get(getUrls).post(createUrl);
router.route("/links/:id").put(editUrl).delete(deleteUrl);
router.route("/:id").get(getUrl);

export { router };
