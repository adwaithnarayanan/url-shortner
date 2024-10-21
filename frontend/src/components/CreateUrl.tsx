import { FormEvent, useState } from "react";
import Button from "./Button";
import { generateShortUrl } from "../../API";
import { toast } from "react-toastify";
import InputField from "./InputField";

const CreateUrl = () => {
  const [fullUrl, setFullUrl] = useState("");
  const [encodedLength, setEncodedLength] = useState("");

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    const response = await generateShortUrl({
      fullUrl: fullUrl.trim(),
      urlLength: encodedLength.trim(),
    });


    if (response.success) {
      setFullUrl("");
      setEncodedLength("");
      toast.success(response.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else {
      toast.info(response.message, {});
    }
  }

  return (
    <div className="w-full flex justify-center py-9 ">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col w-full max-w-[40%] shadow-lg px-9 py-8 bg-four items-center"
      >
        <h2 className="uppercase text-xl font-semibold text-primary my-2 w-full text-center">
          URL Shortner
        </h2>
        <div className="flex w-full">
          <InputField
            type="url"
            value={fullUrl}
            placeholder="Enter your link here..."
            onChange={(e) => setFullUrl(e.target.value)}
          />
          <input
            type="number"
            value={encodedLength}
            onChange={(e) => setEncodedLength(e.target.value)}
            min={3}
            max={10}
            placeholder="url length"
            className="border mb-3 px-3 py-1 bg-transparent shadow-lg focus:outline-2 focus:outline-three max-w-[20%]"
            required
          />
        </div>

        <Button type="submit">Get link</Button>
      </form>
    </div>
  );
};

export default CreateUrl;
