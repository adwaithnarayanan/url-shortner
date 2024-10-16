import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { UrlType } from "../../types";
import Button from "./Button";
import { FormEvent, useState } from "react";

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
  const [newShortUrl, setNewShortUrl] = useState("");

  const handleEdit = (id: number) => {
    const myurl = urls.find((url) => url.id === id);

    setNewShortUrl(myurl?.encodedUrl!);
    handleEnableEditUrl(id);
  };

  return (
    <table>
      <thead>
        <tr>
          <th className="px-24">Encoded Url</th>
          <th className="mx-20">Full url</th>
          <th className="px-3">edit</th>
          <th className="px-3">delete</th>
        </tr>
      </thead>
      <tbody>
        {urls.map((url) => (
          <tr
            key={url.id}
            className={`text-center ${url.id % 2 === 0 && "bg-tableBg"}`}
          >
            <td className="rounded-l-lg ">
              {url.edit ? (
                <span className="flex text-[15px] items-center">
                  {url.encodedLink.split("/").slice(0, 3).join("/") + "/"}
                  <form onSubmit={(e) => handleEditUrl(e, url.id, newShortUrl)}>
                    <input
                      value={newShortUrl}
                      onChange={(e) => setNewShortUrl(e.target.value)}
                      className="min-w-[100px] w-0 border-2 border-primary focus:outline-2 focus:outline-primary text-[15px] bg-[rgba(255,255,255,0.3)] rounded-sm"
                    />
                  </form>
                </span>
              ) : (
                <a
                  href={url.encodedLink}
                  className="hover:text-blue-500 hover:underline text-[15px]"
                >
                  {url.encodedLink}
                </a>
              )}
            </td>
            <td>{url.fullUrl}</td>
            <td className="py-1.5">
              <Button
                // handleClick={() => handleEditUrl(url.id, url.encodedUrl)}
                handleClick={() => handleEdit(url.id)}
                type="edit"
              >
                <ModeEditOutlinedIcon />
              </Button>
            </td>
            <td>
              <Button type="delete" handleClick={() => handleDeleteUrl(url.id)}>
                <ClearOutlinedIcon />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
