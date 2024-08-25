import { useState } from "react";
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";
import { Link, Navigate, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";

export type ResultData = {
  full: string;
  crop: string;
  file: File;
  conf: string;
  cords: number[];
};

function Result() {
  const { state } = useLocation();
  const [character, setCharacter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!state) {
    toast.error("Invalid state");
    return <Navigate to="/" replace={true} />;
  }

  const { full, crop, file, conf, cords } = state as ResultData;

  const handleRecognized = async (image: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/character/recognition`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: image.split("/result")[1],
            type: "image",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = (await response.json()) as { text: string };
      toast.success("Successfully recognized the character");
      setCharacter(data.text);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to recognize the character");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-lg text-blue-800 font-medium">Original Image</h2>
          <img
            src={URL.createObjectURL(file)}
            className="w-full h-72 object-cover"
            alt={file.name}
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg text-blue-800 font-medium">
            Detected Number Plate
          </h2>
          <img
            src={full}
            className="w-full h-72 object-cover"
            alt="Detected number plate"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full mt-20">
        <div className="flex w-max justify-center border-[1px] text-blue-900 rounded-lg p-3 gap-4 items-center shadow-md">
          <div className="flex-col flex w-full p-2 rounded">
            <span className="border-b-[1px] border-black/40 font-semibold text-2xl mb-4">
              Result:
            </span>
            <div className="flex flex-col gap-4 my-4">
              <div className="text-lg font-semibold">
                Confidence: {Number(conf).toFixed(3)}
              </div>
              <div className="text-lg font-semibold">
                Co-ordinate: ({cords.map((cord) => cord.toFixed(2)).join(", ")})
              </div>
              <div
                className={cn("text-lg font-semibold", {
                  hidden: !character,
                })}
              >
                Character: {character}
              </div>
            </div>
          </div>
          <img src={crop} className="h-60 w-full object-contain" />
        </div>
      </div>

      <div className="flex gap-6 mt-8 items-center justify-center">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center"
          onClick={() => handleRecognized(crop)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LuLoader2 className="mr-3 h-5 w-5 animate-spin" />
              Recognizing...
            </>
          ) : (
            "Recognize Number Plate"
          )}
        </button>
        <Link
          to="/upload"
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out inline-block text-center"
        >
          Detect Another
        </Link>
      </div>
    </div>
  );
}

export default Result;