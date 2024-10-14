import validUrl from "valid-url";
import { generateURl } from "./urlShortner.js";
import { getAllUrls, insertIntoDB } from "../database/table.js";

//@desc Get all urls
//@route GET /links
//@access public
const getUrls = async (req, res) => {
  const response = await getAllUrls({ res });
  console.log("###*** ", response);
  // res.status(200).json({ message: "Get all urls" });
  res.status(response.status).json(response);
};

//@desc create url
//@route POST /links
//@access public
const createUrl = (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(404);
    throw new Error(`URL is mandatory`);
  }

  // check for whether a valid url
  if (!validUrl.isUri(url)) {
    res.status(400);
    throw new Error(`Provided is not a valid URL`);
  }

  // generateURl(res, req.body.url);
  insertIntoDB({ res, fullUrl: req.body.url });

  res.status(200).json({ message: "Create url" });
};

//@desc edit url
//@route PUT /links/:id
//@access public
const editUrl = (req, res) => {
  res.status(200).json({ message: `Edit url for id ${req.params.id}` });
};

//@desc delete url
//@route DELETE /links/:id
//@access public
const deleteUrl = (req, res) => {
  res.status(200).json({ message: `Delete url for id ${req.params.id}` });
};

export { getUrls, createUrl, editUrl, deleteUrl };
