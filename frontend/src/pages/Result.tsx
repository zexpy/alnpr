import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  if (!state) {
    toast.error("Invalid");
    return <Navigate to="/" replace={true} />;
  }
  const { full, crop, file } = state as {
    full: string;
    crop: string;
    file: File;
  };
  return (
    <div className="flex h-full max-w-7xl flex-col font-poppins items-center justify-center m-auto px-8 ">
      <div className="flex flex-row justify-center gap-1 items-center rounded-md mt-12">
        <div className="realtive border-black/15">
          <span>Before</span>
          <img
            src={URL.createObjectURL(file)}
            className="h-full w-full "
            alt=""
          />
        </div>
        <div className="border-black/15">
          <span>After</span>
          <img src={full} className="h-full w-full " alt="" />
        </div>
      </div>

      <div className=" flex flex-row text-2xl w-full border-[1px] text-blue-900 rounded mt-6 p-4 justify-between gap-2">
        <div className="flex-col flex w-full p-2  bg-[#F7F9F2] rounded">
          <span className="border-b-[1px] border-black/40">Result:</span>
          <div className="flex flex-col my-4">
            <span className="text-base">Co-ordinate: </span>
            <span className="text-base mt-8">Confidence: </span>
          </div>
        </div>
        <img src={crop} className="h-1/2 w-1/2 flex" />
      </div>
    </div>
  );
}

export default Result;
