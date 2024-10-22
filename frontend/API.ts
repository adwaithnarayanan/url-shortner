import { apiClient } from "./src/httpClient/httpClient";

export const signupUser = async (userDetails: {
  username: string;
  email: string;
  password: string;
}) => {
  return (await apiClient.post("users/register/", userDetails)).data;
};

export const loginUser = async (loginDetails: {
  email: string;
  password: string;
}) => {
  const response = (await apiClient.post("/users/login/", loginDetails)).data;

  if (response.status === 200 && response.accessToken) {
    sessionStorage.setItem("accessToken", response.accessToken);
  }

  return response;
};

export const getAllUrls = async () => {
  const accessToken = getAccessToken();

  return (
    await apiClient.get("/links", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  ).data;
};

export const generateShortUrl = async ({
  fullUrl,
  urlLength,
}: {
  fullUrl: string;
  urlLength: string;
}) => {
  const accessToken = getAccessToken();

  const data = { url: fullUrl, urlLength: urlLength };

  return (
    await apiClient.post("/links/", data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  ).data;
};

export const editUrl = async ({
  id,
  newShortUrl,
}: {
  id: number;
  newShortUrl: string;
}) => {
  const accessToken = getAccessToken();

  return (
    await apiClient.put(
      `links/${id}`,
      { url: newShortUrl },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
  ).data;
};

export const deleteUrl = async ({ id }: { id: number }) => {
  const accessToken = getAccessToken();
  return (
    await apiClient.delete(`links/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  ).data;
};

function getAccessToken() {
  const token = sessionStorage.getItem("accessToken");
  return token;
}
