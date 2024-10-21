// import Button from "./Button";
import { FormEvent, useContext, useEffect } from "react";
import { deleteUrl, editUrl, getAllUrls } from "../../API.ts";
import { UrlType } from "../../types.ts";
import Table from "./Table.tsx";
import { UrlContext } from "../App.tsx";
import { toast } from "react-toastify";

const ShowUrls = () => {
  const { urls, setUrls } = useContext(UrlContext);

  const displayUrls = async () => {
    const data = await getAllUrls();
    setUrls(data.data.map((url: UrlType[]) => ({ ...url, edit: false })));
  };

  async function handleEditUrl(e: FormEvent, id: number, encodedUrl: string) {
    e.preventDefault();

    const response = await editUrl({ id: id, newShortUrl: encodedUrl });

    if (response.success) {
      toast.success(response.message, {
        position: "bottom-center",
      });
    } else {
      toast.info(response.message, {});
    }

    await displayUrls();
  }

  const handleDeleteUrl = async (id: number) => {
    const response = await deleteUrl({ id });

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.info(response.message);
    }

    await displayUrls();
  };

  const handleEnableEditUrl = (id: number) => {
    setUrls((prevUrls) =>
      prevUrls.map((prevUrl) =>
        prevUrl.id === id
          ? { ...prevUrl, edit: !prevUrl.edit }
          : { ...prevUrl, edit: false }
      )
    );
  };

  useEffect(() => {
    displayUrls();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-10 shadow-lg p-3 rounded-md">
        {/* <Button handleClick={displayUrls} type="showUrls">
        Show Urls
      </Button> */}
        <div>
          <Table
            urls={urls}
            handleDeleteUrl={handleDeleteUrl}
            handleEditUrl={handleEditUrl}
            handleEnableEditUrl={handleEnableEditUrl}
          />
        </div>
      </div>
    </>
  );
};

export default ShowUrls;
