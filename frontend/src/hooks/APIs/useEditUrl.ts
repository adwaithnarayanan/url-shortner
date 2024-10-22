import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUrl } from "../../../API";
import { toast } from "react-toastify";

export const useEditUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUrl,
    onSuccess: (success) => {
      toast.success(success.message, { position: "bottom-center" });
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },

    onError: (err) => {
      toast.error(err.message || "Coudn't edit url", {
        position: "bottom-center",
      });
    },
    onSettled: (message) => {
      toast.info(message.error, { position: "bottom-center" });
    },
  });
};
