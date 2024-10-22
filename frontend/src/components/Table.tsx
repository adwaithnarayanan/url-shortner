import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { UrlType } from "../../types";
import Button from "./Button";
import { toast, Zoom } from "react-toastify";
import FullUrlField from "./FullUrlField";

type TablePropType = {
  urls: UrlType[];
  handleDeleteUrl: (id: number) => void;
  handleEditUrl: (values: { url: string; id: number }) => void;
};

const Table = ({ urls, handleDeleteUrl, handleEditUrl }: TablePropType) => {
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
                  <span
                    onClick={() => handleCopyClick(url.encodedLink)}
                    className="cursor-pointer hover:bg-[rgba(0,0,0,0.1)] px-2 py-0.5"
                  >
                    {url.encodedLink}
                  </span>
                </td>
                <FullUrlField
                  handleEditUrl={handleEditUrl}
                  key={url.id}
                  url={url}
                />

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
