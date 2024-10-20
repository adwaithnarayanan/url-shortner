import axios from "axios";

const API_URL = "http://localhost:8000/";

export const signupUser = async (userDetails: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios
    .post(API_URL + "users/register/", userDetails)
    .then((response) => response.data)
    .catch((err) => console.log("##****", err));

  return response;
};

export const loginUser = async (loginDetails: {
  email: string;
  password: string;
}) => {
  const response = await axios
    .post(API_URL + "users/login/", loginDetails)
    .then((response) => response.data)
    .catch((err) => console.log("###**", err));

  if (response.status === 200 && response.accessToken) {
    sessionStorage.setItem("accessToken", response.accessToken);
  }

  // console.log(response);
  return response;
};

export const getAllUrls = async () => {
  const urls = await axios
    .get(API_URL + "links/")
    .then((response) => response.data)
    .catch((err) => console.error("Error: ", err));

  return urls;
};

export const generateShortUrl = async ({
  fullUrl,
  urlLength,
}: {
  fullUrl: string;
  urlLength: string;
}) => {
  const accessToken = getAccessToken();
  const response = await axios
    .post(API_URL + "links/", {
      headers: { Authorization: `Bearer ${accessToken}` },
      url: fullUrl,
      urlLength: urlLength,
    })
    .then((response) => response.data);

  return response;
};

export const editUrl = async ({
  id,
  newShortUrl,
}: {
  id: number;
  newShortUrl: string;
}) => {
  const response = await axios
    .put(API_URL + `links/${id}`, { url: newShortUrl })
    .then((response) => response.data);

  return response;
};

export const deleteUrl = async ({ id }: { id: number }) => {
  const response = await axios
    .delete(API_URL + `links/${id}`)
    .then((response) => response.data);

  return response;
};

function getAccessToken() {
  const token = sessionStorage.getItem("accessToken");
  return token;
}
