const POSSIBLE_URL =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
// total length 64

function generateURl({ urlLength }) {
  let shortenedUrl = "";

  for (let i = 0; i < Number(urlLength); i++) {
    const randPos = Math.floor(Math.random() * POSSIBLE_URL.length);
    shortenedUrl += POSSIBLE_URL.charAt(randPos);
  }

  return shortenedUrl;
}

export { generateURl };
