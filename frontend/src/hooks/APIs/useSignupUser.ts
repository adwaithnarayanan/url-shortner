import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../../API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "../../../types";

export const useSignupUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (message) => {
      console.log(message);
      toast.success("Successfully created user");
      navigate("/");
    },
    onError: (err: ErrorType) => {
      toast.error(err.response.data.message);
    },
  });
};
