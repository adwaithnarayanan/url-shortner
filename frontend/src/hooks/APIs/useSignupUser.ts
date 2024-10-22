import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../../API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useSignupUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success("Successfully created user");
      navigate("/");
    },
    onError: (response) => {
      toast.error(response.message);
    },
  });
};
