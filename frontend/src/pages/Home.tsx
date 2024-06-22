import { IoIosRocket } from "react-icons/io";
import { PiVideoCameraFill } from "react-icons/pi";
import { SiPivotaltracker } from "react-icons/si";
import Details from "../components/Details";
import Counter from "../components/ui/animata/text/counter";
import TypingText from "../components/ui/animata/text/TypingText";

const Home = () => {
  const featureDetails = [
    {
      title: "Try it out",
      description:
        "Our algo handles plates that are blurry, dark, angled, and much more!",
      iconColor: "#3572EF",
      icon: SiPivotaltracker,
    },
    {
      title: "Images and Videos",
      description:
        "We handle both. Snapshot decodes plates from images. Stream processes live camera or video files.",
      iconColor: "#EF4444",
      icon: PiVideoCameraFill,
    },
    {
      title: "Fast and Accurate",
      description:
        "Snapshot’s inference speed is 50-100 ms and Stream processes 5-10 cameras on a mid-range CPU.  No GPU needed!",
      iconColor: "#16A34A",
      icon: IoIosRocket,
    },
  ];
  return (
    <div className="min-w-full">
      <div className="py-32 flex bg-slate-200 justify-evenly items-center gap-10">
        <div className="flex flex-col mb-2 w-full sm:w-1/2">
          <TypingText
            delay={100}
            className="text-4xl font-bold font-poppins text-blue-900 my-4 sm:text-5xl"
            text="Accurate, Fast, User-Friendly ALNPR System"
          />
          <p className="text-base text-slate-600 sm:text-lg leading-snug">
            Real-time plate recognition, seamless integration with existing
            systems, and powerful analytics to optimize operations
          </p>
        </div>
        <div className="w-64">
          <div className="text-xl flex flex-col justify-center items-center h-24 sm:text-2xl px-3 text-white font-bold self-end bg-blue-300 rounded-lg bg-gradient-to-r from-blue-800 ">
            <Counter
              targetValue={96}
              className="text-xl text-center sm:text-2xl mx-1 "
            />
            DETECTED
          </div>
        </div>
      </div>

      <div className="px-24 mt-10">
        <div className="text-start ml-24 text-2xl font-poppins font-semibold uppercase text-blue-950/90">
          Our features
        </div>
        <div className="flex justify-evenly items-center font-poppins sm:gap-4">
          {featureDetails.map((ft) => (
            <Details
              key={`features_${ft}`}
              title={ft.title}
              description={ft.description}
              iconColor={ft.iconColor}
              icon={ft.icon}
            />
          ))}
        </div>
      </div>
      <marquee loop="4" scroolamount="6">
        <h1 className="text-5xl font-poppins font-bold mt-10 p-8 uppercase text-blue-950/20 tracking-wide">
          Automatic License Number Plate Recognition
        </h1>
      </marquee>
    </div>
  );
};

export default Home;
