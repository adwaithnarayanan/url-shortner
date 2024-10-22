import { NavigateFunction, useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";
import { useFormik } from "formik";
import { signupSchema } from "../schemas/schemas";
import { useSignupUser } from "../hooks/APIs/useSignupUser";

let navigate: NavigateFunction;

const initialValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  navigate = useNavigate();

  const { mutate } = useSignupUser();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: signupSchema,
      onSubmit: (values) => mutate(values),
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

          <Button type="submit">Signup</Button>
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
