import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUrl } from "../../../API";
import { toast } from "react-toastify";
import { ErrorType } from "../../../types";

export const useEditUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUrl,
    onSuccess: (success) => {
      console.log(success);
      toast.success(success.message, { position: "bottom-center" });
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },

    onError: (err: ErrorType) => {
      toast.error(err.response.data.message || "Coudn't edit url", {
        position: "bottom-center",
      });
    },
  });
};
