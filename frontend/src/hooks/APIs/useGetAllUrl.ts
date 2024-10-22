import { useQuery } from "@tanstack/react-query";
import { getAllUrls } from "../../../API";

export const useGetAllUrls = () => {
  return useQuery({
    queryKey: ["urls"],
    queryFn: getAllUrls,
  });
};
