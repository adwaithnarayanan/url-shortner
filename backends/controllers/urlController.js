import validUrl from "valid-url";
import {
  deleteFromDb,
  editUrlFromDb,
  getAllUrls,
  getLink,
  insertIntoDB,
} from "../database/table.js";

//@desc Get all urls
//@route GET /links
//@access public
const getUrls = async (req, res) => {
  const response = await getAllUrls({ res });
  res.status(response.status).json(response);
};

//@desc create url
//@route POST /links
//@access public
const createUrl = async (req, res) => {
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

  const response = await insertIntoDB({ res, fullUrl: req.body.url });

  res.status(response.status).json({ message: response.message });
};

//@desc edit url
//@route PUT /links/:id
//@access public
const editUrl = async (req, res) => {
  const id = req.params.id;
  const newShortenedUrl = req.body.url;

  const response = await editUrlFromDb({ id, newShortenedUrl });

  res.status(response.status).json(response);
};

//@desc delete url
//@route DELETE /links/:id
//@access public
const deleteUrl = async (req, res) => {
  const id = req.params.id;
  await deleteFromDb({ id });

  res.status(200).json({ message: `Successfully deleted URL` });
};

//@desc get url
//@route GET /:id
//@access public
const getUrl = async (req, res) => {
  const encodedUrl = req.params.id;
  const response = await getLink({ encodedUrl });

  if (response.status === 200) {
    res.redirect(response.data);
  } else {
    res.status(404).json({ message: "URL not found" });
  }
};

export { getUrls, createUrl, editUrl, deleteUrl, getUrl };
