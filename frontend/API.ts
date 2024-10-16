import axios from "axios";

const API_URL = "http://localhost:8000/";

export const getAllUrls = async () => {
  const urls = await axios
    .get(API_URL + "links/")
    .then((response) => response.data)
    .catch((err) => console.error("***", err));

  return urls;
};

export const generateShortUrl = async ({ fullUrl }: { fullUrl: string }) => {
  console.log(fullUrl);
  const response = await axios
    .post(API_URL + "links/", { url: fullUrl })
    .then((response) => response.data);

  console.log("!@# ", response);
};

export const editUrl = async ({
  id,
  newShortUrl,
}: {
  id: number;
  newShortUrl: string;
}) => {
  console.log(id, newShortUrl);

  const response = await axios
    .put(API_URL + `links/${id}`, { url: newShortUrl })
    .then((response) => response.data);

  return response;
};

export const deleteUrl = async ({ id }: { id: number }) => {
  const response = await axios
    .delete(API_URL + `links/${id}`)
    .then((response) => response.data);

  console.log("111", response);
  return response;
};
