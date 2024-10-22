// import Button from "./Button";
import Table from "./Table.tsx";
import { useDeleteUrl } from "../hooks/APIs/useDeleteUrl.ts";
import { useEditUrl } from "../hooks/APIs/useEditUrl.ts";
import { useGetAllUrls } from "../hooks/APIs/useGetAllUrl.ts";

const ShowUrls = () => {
  const { data, isSuccess } = useGetAllUrls();

  const { mutate } = useEditUrl();

  const { mutate: deleteUrlMutate } = useDeleteUrl();

  async function handleEditUrl(values: { url: string; id: number }) {
    mutate({ id: values.id, newShortUrl: values.url });
  }

  const handleDeleteUrl = async (id: number) => {
    deleteUrlMutate({ id: id });
  };

  return (
    <>
      <div className="flex flex-col items-center mt-10 shadow-lg p-3 rounded-md">
        <div>
          {data && isSuccess && (
            <Table
              urls={data.data}
              handleDeleteUrl={handleDeleteUrl}
              handleEditUrl={handleEditUrl}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ShowUrls;
