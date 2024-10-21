import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { UrlType } from "../../types";
import Button from "./Button";
import { useRef } from "react";
import { toast, Zoom } from "react-toastify";
import { useFormik } from "formik";
import { editUrlSchema } from "../schemas/schemas";

const initialValues = { fullUrl: "" };

type TablePropType = {
  urls: UrlType[];
  handleDeleteUrl: (id: number) => void;
  handleEditUrl: (values: { url: string; id: number }) => void;
  handleEnableEditUrl: (id: number) => void;
};

const Table = ({
  urls,
  handleDeleteUrl,
  handleEditUrl,
  handleEnableEditUrl,
}: TablePropType) => {
  const idRef = useRef(0);
  const { values, setValues, handleBlur, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        handleEditUrl({ url: values.fullUrl, id: idRef.current });
      },
      validationSchema: editUrlSchema,
    });

  const handleEdit = (id: number) => {
    const currentUrl = urls.find((url) => url.id === id);
    setValues({ fullUrl: currentUrl?.fullUrl! });

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
                <td className="">
                  {url.edit ? (
                    <form
                      className="flex flex-col relative justify-center"
                      onSubmit={(e) => {
                        e.preventDefault();
                        idRef.current = url.id;
                        handleSubmit();
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Enter URL here...."
                        name="fullUrl"
                        value={values.fullUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full border-2 focus:outline-2  text-[15px] bg-[rgba(255,255,255,0.3)] rounded-sm px-1 ${
                          errors.fullUrl
                            ? "border-red-500 focus:outline-red-500"
                            : "border-primary focus:outline-primary"
                        }`}
                      />
                      {errors.fullUrl && (
                        <span className="text-red-700 text-xs w-full text-end absolute bottom-[-17px] right-1">
                          {errors.fullUrl}
                        </span>
                      )}
                    </form>
                  ) : (
                    // <form
                    //   onSubmit={(e) => handleEditUrl(e, url.id, newFullUrl)}
                    // >
                    //   <input
                    //     type="url"
                    //     value={newFullUrl}
                    //     onChange={(e) => setNewFullUrl(e.target.value)}
                    //     className="w-ful border-2 border-primary focus:outline-2 focus:outline-primary text-[15px] bg-[rgba(255,255,255,0.3)] rounded-sm"
                    //   />
                    // </form>
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
