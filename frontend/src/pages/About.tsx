import { FaUserFriends } from "react-icons/fa";
import { FaCubesStacked } from "react-icons/fa6";
import { FcProcess } from "react-icons/fc";
import { GiTargeting } from "react-icons/gi";
import { LuScale3D } from "react-icons/lu";
import { MdConnectWithoutContact } from "react-icons/md";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row space-y-4 items-center md:items-center md:space-y-0 md:space-x-8">
        <div className="flex flex-col p-6 py-8 rounded-lg">
          <h1 className="text-2xl md:text-4xl font-bold text-blue-900 mb-3 text-start drop-shadow-md">
            ALNPR System
          </h1>
          <p className="text-base md:text-base text-gray-700 mb-4 max-w-3xl leading-normal">
            Welcome to Automatic License Number Plate Recognition (ALNPR) where
            cutting-edge technology meets practicality. Our ALNPR system is
            designed to revolutionize vehicle identification and monitoring with
            unparalleled precision.
          </p>
          <h2 className="text-2xl font-semibold text-gray-700 my-2 text-start">
            Our Mission
          </h2>
          <p className="text-base md:text-base text-gray-700 mb-4 max-w-7xl leading-relaxed">
            At the heart of our ALNPR system is a mission to enhance safety and
            efficiency on the roads. By leveraging advanced image processing and
            machine learning techniques, we aim to provide a seamless and
            reliable solution for various applications.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center w-full items-center md:w-auto">
          <img
            src="https://cdn.dribbble.com/users/32512/screenshots/4341115/media/8f2fda1ee0dd8edf441e5daf43ae326f.gif"
            alt="ALNPR system illustration"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3 md:mb-6 text-start">
          💁‍♂️ Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Feature
            icon={<GiTargeting size={26} color="#16A34A" />}
            title="Precision and Accuracy"
            description="Our system ensures high accuracy in recognizing number plates, even in challenging conditions such as low light or bad weather."
          />
          <Feature
            icon={<FcProcess size={26} />}
            title="Real-Time Processing"
            description="With real-time processing capabilities, our ALNPR system can quickly identify and record vehicle information, making it ideal for dynamic environments."
          />
          <Feature
            icon={<LuScale3D size={26} color="#ab2800" />}
            title="Scalable Architecture"
            description="Built with scalability in mind, our system can handle a large volume of data and can be easily integrated with existing infrastructure."
          />
          <Feature
            icon={<FaUserFriends size={26} color="#727073" />}
            title="User-Friendly Interface"
            description="Our intuitive interface allows users to easily manage and monitor the system, providing comprehensive insights at a glance."
          />
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="mt-16">
        <div className="flex items-center space-x-2 mb-6">
          <FaCubesStacked color="#5ec1ff" size={26} />
          <h2 className="text-2xl font-semibold text-gray-700">
            Technology Stack
          </h2>
        </div>

        <p className="text-gray-700 mb-8 max-w-7xl text-base md:text-base">
          The ALNPR system is powered by a robust technology stack that ensures
          reliability and performance:
        </p>

        {/* Vertical Timeline Container */}
        <div className="relative border-l-2 border-blue-400 ml-4 pl-8 space-y-2">
          <TechItem
            title="Frontend"
            description="React and Tailwind CSS for a responsive and interactive user experience."
            color="bg-blue-900"
          />
          <TechItem
            title="Backend"
            description="Node.js and Express for handling server-side logic and API requests."
            color="bg-blue-900"
          />
          <TechItem
            title="Database"
            description="Sqlit3 database for recognization and detection"
            color="bg-blue-900"
          />
          <TechItem
            title="Image Processing"
            description="OpenCV and Tesseract.js for precise number plate detection and recognition."
            color="bg-blue-900"
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16 mb-2">
        <div className="flex items-center space-x-2 mb-3">
          <MdConnectWithoutContact color="black" size={26} />
          <h2 className="text-2xl font-semibold text-gray-700">Get in Touch</h2>
        </div>
        <p className="text-gray-700 text-start pb-6 text-base md:text-base">
          We'd love to hear from you! Whether you have questions, feedback, or
          just want to say hello, reach out to us at{" "}
          <Link to="/team" className="text-blue-600 underline">
            Our Team
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

// Feature Component
const Feature = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-start p-6 bg-white shadow-md rounded-lg transform hover:scale-105 transition duration-300 ease-in-out">
    <div className="flex items-center space-x-2 mb-2">
      {icon}
      <h3 className="text-base font-bold text-gray-600">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm md:text-base">{description}</p>
  </div>
);

// TechItem Component
const TechItem = ({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: string;
}) => (
  <div className="relative pb-8">
    <div className="absolute -left-10 mt-1">
      <div
        className={`w-4 h-4 rounded-full ${color} border-4 border-white`}
      ></div>
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  </div>
);

export default About;