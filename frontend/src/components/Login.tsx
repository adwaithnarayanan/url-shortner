import Button from "./Button";
import { NavigateFunction, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/schemas";
import { useLoginUser } from "../hooks/APIs/useLoginUser";

let navigate: NavigateFunction;

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { mutate } = useLoginUser();
  navigate = useNavigate();

  const {
    values,
    isSubmitting,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="flex-1 w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[520px] shadow-lg px-9 py-8 bg-four items-center"
      >
        <h2 className="uppercase text-xl font-semibold text-primary my-2 w-full text-center">
          Login
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
          type="password"
          placeholder="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
        />
        <Button disabled={isSubmitting} type="submit">
          Login
        </Button>
        <div
          className="w-full text-end cursor-pointer mt-3 hover:underline hover:text-primary"
          onClick={() => navigate("/signup")}
        >
          Create an account
        </div>
      </form>
    </div>
  );
};

export default Login;
