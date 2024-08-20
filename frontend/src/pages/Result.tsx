import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

export type ResultData = {
  full: string;
  crop: string;
  file: File;
  conf: string;
  cords: number[];
};
function Result() {
  const { state } = useLocation();
  if (!state) {
    toast.error("Invalid");
    return <Navigate to="/" replace={true} />;
  }
  const { full, crop, file, conf, cords } = state as ResultData;

  console.log(crop)

  const handleRecognized = async (image: string) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/recog`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json() as {text: string}
    console.log(data.text)
  }
  return (
    <div className="flex h-full max-w-7xl flex-col font-poppins items-center justify-center m-auto px-8 gap-3">
      <div className="flex flex-row justify-center gap-1 items-center rounded-md mt-12">
        <div className="border-black/15">
          <span className="text-blue-900 font-semibold">Before</span>
          <img
            src={URL.createObjectURL(file)}
            className="h-full w-full "
            alt={file.name}
          />
        </div>
        <div className="border-black/15">
          <span className="text-blue-900 font-semibold">After</span>
          <img src={full} className="h-full w-full " alt="" />
        </div>
      </div>

      <div className="flex w-full border-[1px] text-blue-900 rounded mt-6 p-4 justify-between gap-2 items-center">
        <div className="flex-col flex w-full p-2 bg-[#F7F9F2] rounded">
          <span className="border-b-[1px] border-black/40 font-semibold text-xl">
            Result:
          </span>
          <div className="flex flex-col gap-3 my-3">
            <div className="text-base font-semibold">
              Confidence: {Number(conf).toFixed(3)}
            </div>
            <div className="text-base font-semibold">
              Co-ordinate: ({cords.map((cord) => cord.toFixed(2)).join(", ")})
            </div>
          </div>
        </div>
        <img src={crop} className="h-full w-full flex-2" />
      </div>
      <div className="flex gap-5">
        <button className="px-4 py-2 bg-blue-300 rounded self-end" onClick={() => handleRecognized(crop)}>
          Recognize Number Plate
        </button>
        <button className="px-4 py-2 bg-blue-300 rounded self-end">
          Detect Another
        </button>
      </div>
    </div>
  );
}

export default Result;
