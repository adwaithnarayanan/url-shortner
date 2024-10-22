import { useEffect, useState } from "react";
import { UrlType } from "../../types";
import Button from "./Button";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useFormik } from "formik";
import { editUrlSchema } from "../schemas/schemas";

type FullUrlFieldPropsType = {
  url: UrlType;
  handleEditUrl: (values: { url: string; id: number }) => void;
};

const FullUrlField = ({ url, handleEditUrl }: FullUrlFieldPropsType) => {
  const [editUrl, setEditUrl] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, setValues } =
    useFormik({
      initialValues: { fullUrl: url.fullUrl },
      onSubmit: (values) => {
        handleEditUrl({ url: values.fullUrl, id: url.id });
        setEditUrl(false);
      },
      validationSchema: editUrlSchema,
    });

  useEffect(() => {
    return () => {
      setEditUrl(false);
    };
  }, []);

  return (
    <>
      <td className="">
        {editUrl ? (
          <form
            className="flex flex-col relative justify-center"
            onSubmit={(e) => {
              e.preventDefault();
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
          <span>{url.fullUrl}</span>
        )}
      </td>
      <td className="py-1.5">
        <Button
          handleClick={() => {
            setValues({ fullUrl: url.fullUrl });
            setEditUrl((prev) => !prev);
          }}
          type="edit"
        >
          <ModeEditOutlinedIcon />
        </Button>
      </td>
    </>
  );
};

export default FullUrlField;
