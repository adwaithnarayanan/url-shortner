import express from "express";
import {
  createUrl,
  deleteUrl,
  editUrl,
  getUrls,
} from "../controllers/urlController.js";
const router = express.Router();

router.route("/").get(getUrls).post(createUrl);
router.route("/:id").put(editUrl).delete(deleteUrl);

export { router };
