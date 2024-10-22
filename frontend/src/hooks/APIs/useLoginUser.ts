import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLoginUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/");
      toast.success(`Successfully logged in `, {});
    },
    onError: (err) => {
      toast.error(err.message || "Unable to login");
    },
    onSettled: (message) => {
      toast.info(message.message, {});
    },
  });
};
