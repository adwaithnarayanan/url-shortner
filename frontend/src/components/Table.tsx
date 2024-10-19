import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { UrlType } from "../../types";
import Button from "./Button";
import { FormEvent, useState } from "react";
import { Slide, toast, Zoom } from "react-toastify";

type TablePropType = {
  urls: UrlType[];
  handleDeleteUrl: (id: number) => void;
  handleEditUrl: (e: FormEvent, id: number, encodedUrl: string) => void;
  handleEnableEditUrl: (id: number) => void;
};

const Table = ({
  urls,
  handleDeleteUrl,
  handleEditUrl,
  handleEnableEditUrl,
}: TablePropType) => {
  const [newFullUrl, setNewFullUrl] = useState("");

  const handleEdit = (id: number) => {
    const currentUrl = urls.find((url) => url.id === id);

    setNewFullUrl(currentUrl?.fullUrl!);
    handleEnableEditUrl(id);
  };

  function handleCopyClick(copyUrl: string) {
    navigator.clipboard.writeText(copyUrl);
    toast.info("Copied to clipboard", {
      autoClose: 1000,
      hideProgressBar: true,
      transition: Zoom,
      closeOnClick: false,
    });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className={`${urls.length > 0 ? "px-24" : "px-10"}`}>
              Encoded Url
            </th>
            <th className="mx-20">Full url</th>
            <th className="px-3">edit</th>
            <th className="px-3">delete</th>
          </tr>
        </thead>
        <tbody>
          {urls.length > 0 &&
            urls.map((url, index) => (
              <tr
                key={url.id}
                className={`text-center ${index % 2 !== 0 && "bg-tableBg"}`}
              >
                <td className="rounded-l-lg ">
                  {/* <a
                    href={url.encodedLink}
                    className="hover:text-blue-500 hover:underline text-[15px]"
                  >
                    {url.encodedLink}
                  </a> */}
                  <span
                    onClick={() => handleCopyClick(url.encodedLink)}
                    className="cursor-pointer hover:bg-[rgba(0,0,0,0.1)] px-2 py-0.5"
                  >
                    {url.encodedLink}
                  </span>
                </td>
                <td>
                  {url.edit ? (
                    <form
                      onSubmit={(e) => handleEditUrl(e, url.id, newFullUrl)}
                    >
                      <input
                        type="url"
                        value={newFullUrl}
                        onChange={(e) => setNewFullUrl(e.target.value)}
                        className="w-ful border-2 border-primary focus:outline-2 focus:outline-primary text-[15px] bg-[rgba(255,255,255,0.3)] rounded-sm"
                      />
                    </form>
                  ) : (
                    <span>{url.fullUrl}</span>
                  )}
                </td>
                <td className="py-1.5">
                  <Button handleClick={() => handleEdit(url.id)} type="edit">
                    <ModeEditOutlinedIcon />
                  </Button>
                </td>
                <td>
                  <Button
                    type="delete"
                    handleClick={() => handleDeleteUrl(url.id)}
                  >
                    <ClearOutlinedIcon />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {urls.length < 1 && (
        <span className="w-full text-center flex justify-center mt-5 bg-[rgba(0,0,0,0.1)] rounded-sm py-1 text-sm font-bold">
          No urls to display
        </span>
      )}
    </div>
  );
};

export default Table;
