import { FormEvent, useContext, useState } from "react";
import Button from "./Button";
import { generateShortUrl, getAllUrls } from "../../API";
import { UrlContext } from "../App";
import { UrlType } from "../../types";

const CreateUrl = () => {
  const { setUrls } = useContext(UrlContext);

  const [fullUrl, setFullUrl] = useState("");

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    await generateShortUrl({ fullUrl: fullUrl.trim() });

    const data = await getAllUrls();
    setUrls(data.data.map((url: UrlType[]) => ({ ...url, edit: false })));
  }

  return (
    <div className="w-full flex justify-center py-9">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col w-full max-w-[40%] shadow-lg px-5 py-8 bg-four items-center"
      >
        <h2 className="uppercase text-xl font-semibold text-primary my-2 w-full text-center">
          URL Shortner
        </h2>
        <input
          type="url"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
          className="border mb-3 px-3 py-1 bg-transparent shadow-lg focus:outline-2 focus:outline-three w-full"
          placeholder="Enter your link here..."
        />
        <Button type="submit">Get link</Button>
      </form>
    </div>
  );
};

export default CreateUrl;
