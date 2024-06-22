import { useState } from "react";
import toast from "react-hot-toast/headless";

type ResultResponse = {
  url: string;
  path: string;
  conf: string;
  cords: string;
  error: boolean;
};
export function useUpload() {
  const [status, setStatus] = useState({ error: false, loading: false });
  const [file, setFile] = useState<File>();

  const handleUpload = async () => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      const formData = new FormData();
      formData.append("file", file as Blob);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/uploads`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data: ResultResponse = await response.json();

      if (data.error) {
        toast.error("Not Detected Number Plate");
        throw new Error("Error uploading file");
      }
      return {
        full: `${import.meta.env.VITE_BACKEND_URL}/${data.url}/${data.path}`,
        crop: `${import.meta.env.VITE_BACKEND_URL}/${
          data.url
        }/crops/number_plate/${data.path}`,
        conf: data.conf,
        cords: data.cords,
      };
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: true }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };
  return { ...status, file, handleUpload, setFile };
}
