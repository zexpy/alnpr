import { FaEnvelope, FaGraduationCap } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";

// Import local images
import ajit from "../assets/ajit.png";
import bibek from "../assets/bibek.png";
import dipesh from "../assets/dipesh.png";

// Team component
const Team = () => {
  const teamMembers = [
    {
      name: "Ajit Baniya",
      degree: "Bachelor in Software Engineering",
      rollNo: "2019SE04",
      photo: ajit,
      email: "baniyaajit1@gmail.com",
    },
    {
      name: "Bibek Bhattarai",
      degree: "Bachelor in Software Engineering",
      rollNo: "2019SE695",
      photo: bibek,
      email: "imbibek05@gmail.com",
    },
    {
      name: "Dipesh Gautam",
      degree: "Bachelor in Software Engineering",
      rollNo: "2019SE13",
      photo: dipesh,
      email: "nirmalgautam12012@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div>
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="rounded-2xl shadow-lg w-80 overflow-hidden">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-[300px] object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-xl text-center font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-2 flex items-center text-base">
                  <FaGraduationCap className="text-blue-700 mr-1" />
                  {member.degree}
                </p>
                <p className="text-gray-600 mb-2 flex items-center text-sm">
                  <IoMdPerson className="text-gray-600 mr-1" />
                  Roll No: {member.rollNo}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center text-blue-700 underline"
                >
                  <FaEnvelope className="text-blue-700 mr-1" size={13} />
                  {member.email}
                </a>
              </div>
              {/* Removed the overlay div */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;