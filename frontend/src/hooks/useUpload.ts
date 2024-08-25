import { useState } from "react";
import { callAsync } from "../utils/callAsync";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type ResultResponse = {
    result: {
        url: string;
        path: string;
        conf: string;
        cords: string;
    }[];
};
export function useUpload() {
    const [status, setStatus] = useState({ error: false, loading: false });
    const [file, setFile] = useState<File>();
    const navigate = useNavigate();

    const handleDownload = async (downloadUrl?: string) => {
        if (!downloadUrl) {
            return;
        }
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file?.name ?? "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        navigate("/", { replace: true });
    };

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
            if(!response.ok){
                toast.error("No Detection");    
                return;
            }
            const data: ResultResponse = await response.json();
            return data;
        } catch (error) {
            setStatus((prev) => ({ ...prev, error: true }));
        } finally {
            setStatus((prev) => ({ ...prev, loading: false }));
        }
    };

    const handleDetect = async () => {
        const [data, error] = await callAsync(handleUpload());
        if (error) {
            toast.error("Failed to detect the number plate");
            return;
        }
        if (!data) {
            return;
        }
        const result = data?.result?.map((d) => ({
            ...d,
            full: `${import.meta.env.VITE_BACKEND_URL}/${d.url}/${d.path}`,
            crop: `${import.meta.env.VITE_BACKEND_URL}/${d.url
                }/crops/number_plate/${d.path}`,
        }));
        if (file?.type.split("/")[0] === "image") {
            toast.success("Detection successful");
            navigate("/result", { state: { ...result[0], file } });
        } else {
            toast.success("Video detection successful");
            navigate("/video-result", { state: result });
        }
    };

    return {
        ...status,
        file,
        handleUpload,
        setFile,
        handleDownload,
        handleDetect,
    };
}
