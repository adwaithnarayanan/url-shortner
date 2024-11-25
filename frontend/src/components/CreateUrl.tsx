import Button from "./Button";
import InputField from "./InputField";
import { useFormik } from "formik";
import { createUrlSchema } from "../schemas/schemas";
import { useGenerateShortUrl } from "../hooks/APIs/useGenerateShortUrl";

const initialValues = {
  fullUrl: "",
  encodedLength: "",
};

const CreateUrl = () => {
  const { mutate } = useGenerateShortUrl();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: createUrlSchema,
    onSubmit: (values) => {
      console.log(values);
      mutate({ fullUrl: values.fullUrl, urlLength: values.encodedLength });
    },
  });

  return (
    <div className="w-full flex justify-center py-9 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[40%] shadow-lg px-9 py-8 bg-four items-center"
      >
        <h2 className="uppercase text-xl font-semibold text-primary my-2 w-full text-center">
          URL Shortner
        </h2>
        <div className="flex w-full">
          <span className="w-full">
            <InputField
              type="text"
              placeholder="Paste the link here..."
              name="fullUrl"
              value={values.fullUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fullUrl}
              touched={touched.fullUrl}
            />
          </span>
          <span className="max-w-[20%] flex flex-col">
            <input
              type="number"
              name="encodedLength"
              value={values.encodedLength}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="url length"
              className={`border px-3 py-1 bg-transparent shadow-lg focus:outline-2 focus:outline-three w-full rounded-sm ${
                errors.encodedLength && touched.encodedLength
                  ? "mb-1 border-red-600"
                  : "mb-3"
              }`}
            />
            {errors.encodedLength && touched.encodedLength && (
              <span className="mb-2 text-red-700 text-xs w-full text-end">
                {errors.encodedLength}
              </span>
            )}
          </span>
        </div>

        <Button disabled={isSubmitting} type="submit">
          Get link
        </Button>
      </form>
    </div>
  );
};

export default CreateUrl;
