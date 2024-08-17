import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useUpload } from "../hooks/useUpload";
import { cn } from "../utils/cn";

const Upload = () => {
  const { loading, file, setFile, handleUpload } = useUpload();
  const uploadRef = useRef<HTMLInputElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>();
  const navigate = useNavigate();

  const handleImageUpload = () => {
    uploadRef.current?.click();
  };

  const handleDetect = async () => {
    try {
      const result = await handleUpload();
      if (!result) {
        return toast.error("Failed to detect. Please try again.");
      }
      if (file?.type.split("/")[0] === "video") {
        setDownloadUrl(result.full);
        toast.success("Video Detected Successfully!");
        return;
      }

      toast.success("Detected Successfully!");
      console.log(result);
      navigate("/result", { state: { ...result, file }, replace: true });
    } catch (error) {
      toast.error("Failed to detect. Please try again.");
    }
  };

  const handleDownload = async () => {
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

  return (
    <div className="flex flex-col items-center p-4 md:p-8 lg:p-12">
      <div className="space-y-2 h-auto p-3 flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold font-poppins sm:text-3xl md:text-4xl text-center text-blue-800">
          Upload Media for Number Plate Recognition
        </h2>
        <p className="text-center text-slate-600 text-base sm:text-lg">
          Enhance your vehicle tracking experience by uploading relevant images
          and videos for our number plate recognition system.
        </p>
      </div>
      <div className="flex flex-col w-full md:w-5/6 lg:w-4/6 mt-4 md:mt-6 lg:mt-8">
        <div
          className="border-2 border-black/25 p-6 md:p-10 w-full border-dashed flex flex-col items-center justify-center gap-y-4 cursor-pointer"
          onClick={handleImageUpload}
        >
          {file ? (
            file.type.split("/")[0] !== "video" ? (
              <img
                src={URL.createObjectURL(file)}
                className="h-40 md:h-60 lg:h-80 w-auto rounded"
                alt="Uploaded preview"
              />
            ) : (
              <video className="w-full max-w-md" controls autoPlay>
                <source src={URL.createObjectURL(file)} type="video/mp4" />
              </video>
            )
          ) : (
            <BsUpload size={32} color="gray" />
          )}
          <input
            type="file"
            hidden
            ref={uploadRef}
            onChange={(e) => setFile(e.target?.files?.[0])}
          />
          <h2 className="text-base font-poppins text-black/45 text-center">
            Drag and drop your files here, or click to select files
          </h2>
        </div>
        <div className="self-end flex gap-5 my-2">
          {downloadUrl && (
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-300 rounded my-2"
            >
              Download Video
            </button>
          )}
          <button
            onClick={handleDetect}
            className={cn("px-4 py-2 bg-blue-300 rounded my-2 self-end", {
              "text-white bg-gray-500 cursor-not-allowed flex items-center":
                loading || !file,
            })}
            disabled={loading || !file}
          >
            {loading && <Loading />}
            Detect{loading && "ing.."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
