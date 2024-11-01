import * as yup from "yup";

const emailExprssion = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/;
const usernameExpression = /^\S+$/;
const passwordExpresssion =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{5,}$/;
const urlExpression =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailExprssion, "Please enter  a valid email")
    .required("Required"),
  username: yup
    .string()
    .matches(
      usernameExpression,
      "username should not contain white spaces in it"
    )
    .required("Required"),
  password: yup
    .string()
    .min(5, "Password should be minimum 5 characters long")
    .matches(
      passwordExpresssion,
      "Password should contain atleat one uppercase, one lowercase, one digit and one symbol"
    )
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password doesn't match")
    .required("Required"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailExprssion, "Please enter a valid email address")
    .required("Requred"),
  password: yup.string().required("Required"),
});

const createUrlSchema = yup.object().shape({
  fullUrl: yup
    .string()
    .matches(urlExpression, "Enter a valid URL")
    .required("Please add url "),
  encodedLength: yup
    .number()
    .min(3, "Minimum 3")
    .max(10, "Maximum 10")
    .required("Required"),
});

const editUrlSchema = yup.object().shape({
  fullUrl: yup
    .string()
    .matches(urlExpression, "Enter a valid URL")
    .required("Field should not be empty"),
});

export { signupSchema, loginSchema, createUrlSchema, editUrlSchema };
