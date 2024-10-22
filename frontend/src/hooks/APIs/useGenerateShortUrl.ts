import { useMutation } from "@tanstack/react-query";
import { useMatch } from "react-router-dom";
import { generateShortUrl } from "../../../API";
import { toast } from "react-toastify";

export const useGenerateShortUrl = () => {
  return useMutation({
    mutationFn: generateShortUrl,
    onSuccess: (message) => {
      toast.success(message.message);
    },
  });
};
