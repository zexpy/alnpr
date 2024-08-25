import { useEffect, useState } from "react";
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
      icon: <SiPivotaltracker size={34} color="#3572EF" />,
    },
    {
      title: "Images and Videos",
      description:
        "We handle both. Snapshot decodes plates from images. Stream processes live camera or video files.",
      iconColor: "#EF4444",
      icon: <PiVideoCameraFill size={34} color="#EF4444" />,
    },
    {
      title: "Fast and Accurate",
      description:
        "Snapshot's inference speed is 50-100 ms and Stream processes 5-10 cameras on a mid-range CPU.  No GPU needed!",
      iconColor: "#16A34A",
      icon: <IoIosRocket size={34} color="#16A34A" />,
    },
  ];
  const [stats, setStats] = useState({ detections: 0, recognitions: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/stats`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-w-full max-h-screen">
      <div className="py-10 md:py-32 flex flex-col md:flex-row bg-slate-200 justify-evenly items-center gap-10 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col mb-2 w-full md:w-1/2">
          <TypingText
            delay={100}
            className="text-4xl font-bold font-poppins text-blue-900 my-4 sm:text-5xl"
            text="Accurate, Fast, User-Friendly ALNPR System"
          />
          <p className="text-base text-slate-600 sm:text-lg leading-snug">
            Real-time plate recognition, seamless integration with existing
            systems, and powerful analytics to optimize operations.
          </p>
        </div>
        <div className="w-full md:w-64 space-y-6">
          <div className="text-xl flex  justify-center items-center h-16 sm:text-2xl px-4 font-bold self-end rounded-lg border-b-2 border-green-900 text-blue-900">
            <div className="flex items-center">
              <div className="flex items-center">
                +
                <Counter
                  targetValue={stats.detections}
                  className="text-lg text-center sm:text-2xl mx-1"
                />
              </div>
              <div>DETECTED</div>
            </div>
          </div>
          <div className="text-xl flex  justify-center items-center h-16 sm:text-2xl px-4 font-bold self-end rounded-lg border-t-2 border-green-900 text-blue-900">
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                +
                <Counter
                  targetValue={stats.recognitions}
                  className="text-lg text-center sm:text-2xl mx-1"
                />
              </div>
              <div>RECOGNIZED</div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:px-24 mt-10">
        <div className="text-center md:text-start md:ml-24 text-2xl font-poppins font-semibold uppercase text-blue-950/90">
          Our features
        </div>
        <div className="flex  flex-col md:flex-row justify-evenly items-center font-poppins sm:gap-4">
          {featureDetails.map((feature) => (
            <Details key={`features_${feature.title}`} detail={feature} />
          ))}
        </div>
      </div>
      <div className="overflow-hidden">
        <h1 className="text-5xl font-poppins font-bold mt-14 p-8 uppercase text-blue-950/20 tracking-wide whitespace-nowrap animate-marquee">
          Automatic License Number Plate Recognition
        </h1>
      </div>
    </div>
  );
};

export default Home;