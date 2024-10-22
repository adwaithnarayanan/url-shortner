import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorType } from "../../../types";

export const useLoginUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/");
      toast.success(`Successfully logged in `, {});
    },
    onError: (err: ErrorType) => {
      toast.error(err?.response?.data?.message || "Unable to login");
    },
  });
};
