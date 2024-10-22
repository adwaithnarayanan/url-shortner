import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUrl } from "../../../API";
import { toast } from "react-toastify";

const useDeleteUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUrl,
    onSuccess: (success) => {
      toast.success(success.message, { position: "bottom-center" });
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
    onError: (err) => {
      toast.error(err.message || "Coudn't delete url", {
        position: "bottom-center",
      });
    },
  });
};

export { useDeleteUrl };
