import { NavigateFunction, useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";
import { signupUser } from "../../API";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { signupSchema } from "../schemas/schemas";

let navigate: NavigateFunction;

const initialValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const onSubmit = async (values: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await signupUser({
    email: values.email,
    username: values.username,
    password: values.password,
  });
  if (response.success) {
    toast.success("Succesfully created user");
    navigate("/login");
  } else {
    toast.error(response.message);
  }
};

const Signup = () => {
  navigate = useNavigate();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit,
  });

  return (
    <>
      <div className="flex-1 w-full flex items-center justify-center">
        <form
          className="flex flex-col w-full max-w-[520px] shadow-lg px-9 py-8 bg-four items-center"
          onSubmit={handleSubmit}
        >
          <h2 className="uppercase text-xl font-semibold text-primary my-2 w-full text-center">
            create an account
          </h2>
          <InputField
            type="text"
            placeholder="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          <InputField
            type="text"
            placeholder="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username}
            touched={touched.username}
          />
          <InputField
            type="password"
            placeholder="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />
          <InputField
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
          />

          <Button disabled={isSubmitting} type="submit">
            Signup
          </Button>
          <div
            className="w-full text-end cursor-pointer mt-3 hover:underline hover:text-primary"
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
