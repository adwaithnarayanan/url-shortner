import { FormEvent, useState } from "react";
import Button from "./Button";

const CreateUrl = () => {
  const [fullUrl, setFullUrl] = useState("");

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    console.log("form submnitted");
  }

  return (
    <div className="w-full flex justify-center py-9">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col w-full max-w-[40%] shadow-md px-5 py-8 bg-four "
      >
        <input
          type="text"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
          className="border mb-3 px-3 py-1 bg-transparent shadow-md focus:outline-2 focus:outline-three"
          placeholder="Enter your link here..."
        />
        <Button type="submit">Get link</Button>
      </form>
    </div>
  );
};

export default CreateUrl;
