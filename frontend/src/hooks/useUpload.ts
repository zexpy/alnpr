import { useState } from "react";

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
        }
      );
      const data: { url: string; path: string } = await response.json();
      return {
        full: `${import.meta.env.VITE_BACKEND_URL}/${data.url}/${data.path}`,
        crop: `${import.meta.env.VITE_BACKEND_URL}/${
          data.url
        }/crops/number_plate/${data.path}`,
      };
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: true }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };
  return { ...status, file, handleUpload, setFile };
}
