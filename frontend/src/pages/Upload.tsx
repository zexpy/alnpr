import { useRef } from "react";
import { BsUpload } from "react-icons/bs";
import Loading from "../components/Loading";
import { useUpload } from "../hooks/useUpload";
import { cn } from "../utils/cn";

const Upload = () => {
    const { loading, file, setFile, handleDetect } = useUpload();
    const uploadRef = useRef<HTMLInputElement>(null);

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
                    onClick={() => uploadRef.current?.click()}
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
