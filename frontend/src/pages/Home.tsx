import Details from "../components/Details";
import Counter from "../components/ui/animata/text/counter";

const Home = () => {
  return (
    <div className="min-w-full">
      <div className="py-32 flex bg-slate-200 justify-evenly items-center">
        <div className="flex flex-col mb-2 w-full sm:w-1/2">
          <h2 className="text-4xl font-bold font-poppins sm:text-5xl my-4">
            Accurate, Fast, User-Friendly ALNPR
          </h2>

          <p className="max-w-full text-base text-slate-600 sm:text-lg leading-snug">
            Real-time plate recognition, seamless integration with existing
            systems, and powerful analytics to optimize operations.
          </p>
        </div>
        <div className="text-xl  sm:text-2xl text-white font-bold self-end bg-blue-400 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 ">
          +<Counter targetValue={96} className="text-xl sm:text-2xl mx-1" />
          DETECTIONS
        </div>
      </div>

      <div className="px-24 mt-10">
        <div className="text-start ml-24 text-2xl font-poppins font-semibold uppercase  text-blue-950">
          Our features
        </div>
        <div className="flex justify-evenly items-center">
          <Details />
          <Details />
          <Details />
        </div>
      </div>
      <marquee>
        <h1 className="text-5xl font-poppins font-bold mt-10 p-8 uppercase text-blue-950/20 tracking-wide">
          Automatic License Number Plate Recognition
        </h1>
      </marquee>
    </div>
  );
};

export default Home;
