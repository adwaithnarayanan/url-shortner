import { nanoid } from "nanoid";

function generateURl(fullUrl) {
  const shortenedUrl = nanoid(6);

  return shortenedUrl;
}

export { generateURl };
