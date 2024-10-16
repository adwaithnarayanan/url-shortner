import asyncHandler from "express-async-handler";
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
const getUrls = asyncHandler(async (req, res) => {
  const response = await getAllUrls({ res });
  res.status(response.status).json(response);
});

//@desc create url
//@route POST /links
//@access public
const createUrl = asyncHandler(async (req, res) => {
  const { url, urlLength } = req.body;

  if (!url) {
    res.status(403);
    throw new Error(`URL is mandatory`);
  }

  // check for whether a valid url
  if (!validUrl.isUri(url)) {
    res.status(400);
    throw new Error(`Provided is not a valid URL`);
  }

  // Check whether given url length is greater than 3
  if (Number(urlLength) < 3) {
    res.status(400);
    throw new Error(`Please provide minimum url length of 3 characters`);
  }

  const response = await insertIntoDB({
    fullUrl: url,
    urlLength: urlLength,
  });

  res.status(response.status).json(response);
});

//@desc edit url
//@route PUT /links/:id
//@access public
const editUrl = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const newFullUrl = req.body.url;

  if (!validUrl.isUri(newFullUrl)) {
    res.status(400);
    throw new Error(`Provided is not a valid url`);
  }

  const response = await editUrlFromDb({ id, newFullUrl });

  res.status(200).json(response);
});

//@desc delete url
//@route DELETE /links/:id
//@access public
const deleteUrl = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const response = await deleteFromDb({ id });

  res.status(response.status).json(response);
});

//@desc get url
//@route GET /:id
//@access public
const getUrl = asyncHandler(async (req, res) => {
  const encodedUrl = req.params.id;
  const response = await getLink({ encodedUrl });

  if (response.status === 200) {
    res.redirect(response.data);
  } else {
    res.status(404).json({ message: "URL not found" });
  }
});

export { getUrls, createUrl, editUrl, deleteUrl, getUrl };
