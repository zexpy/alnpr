import { useRef } from "react";
import toast from "react-hot-toast";
import { BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useUpload } from "../hooks/useUpload";
import { cn } from "../utils/cn";

const Upload = () => {
  const { loading, file, setFile, handleUpload } = useUpload();
  const uploadRef = useRef<HTMLInputElement>(null);
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

      toast.success("Detected Successfully!");
      navigate("/result", { state: { ...result, file }, replace: true });
    } catch (error) {
      toast.error("Failed to detect. Please try again.");
    }
  };

  return (
    <div className="flex items-center flex-col">
      <div className="space-y-2 h-40 p-3 flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold font-poppins sm:text-4xl text-center text-blue-800 w-1/2">
          Upload Media for Number Plate Recognition
        </h2>
        <p className="max-w-full text-center text-slate-600 text-base sm:text-lg">
          Enhance your vehicle tracking experience by uploading relevant images
          and videos for our number plate recognition system.
        </p>
      </div>
      <div className="flex w-5/6 flex-col mt-4">
        <div
          className="border-2 border-black/25 p-10 w-full border-dashed flex items-center flex-col justify-center gap-y-4"
          onClick={handleImageUpload}
        >
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              className="h-1/4 w-1/2 rounded"
            />
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

        <button
          onClick={handleDetect}
          className={cn("px-4 py-2 bg-blue-300 rounded my-2 self-end", {
            "text-white bg-gray-500 cursor-not-allowed": loading || !file,
          })}
          disabled={loading || !file}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default Upload;
