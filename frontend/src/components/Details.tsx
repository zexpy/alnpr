import { PiApertureFill } from "react-icons/pi";

function Details() {
  return (
    <div className="flex w-96 mt-6 rounded-xl shadow-lg bg-white/45">
      <div className="flex justify-center m-4 p-2 flex-col space-y-3">
        <div className="flex space-x-3 items-center">
          <PiApertureFill size={34} color="#3572EF" />
          <p className="font-semibold text-xl font-poppins text-blue-950">
            Customer
          </p>
        </div>
        <p>
          Our algo handles plates that are blurry, dark, angled, and much more!
          See our ALPR in Nepal.
        </p>
      </div>
    </div>
  );
}

export default Details;
