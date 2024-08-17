const Team = () => {
  const teamMembers = [
    {
      name: "Ajit Baniya",
      degree: "Bachelor in Software Engineering",
      rollNo: "SE2019202",
      photo:
        "https://media.npr.org/assets/img/2011/08/17/fguy2006_stewie1_f_custom-f9251870653c8aab9ab0a47f028b281c97b6f1cb.jpg?s=1100&c=50&f=jpeg",
      email: "ajitbaniya@gmail.com",
    },
    {
      name: "Bibek Bhattarai",
      degree: "Bachelor in Software Engineering",
      rollNo: "SE2019044",
      photo:
        "https://easydrawingart.com/wp-content/uploads/2019/08/How-to-draw-a-cartoon-character-1.jpg",
      email: "imbibek05@gmail.com",
    },
    {
      name: "Dipesh Gautam",
      degree: "Bachelor in Software Engineering",
      rollNo: "SE2019223",
      photo:
        "https://wallpapers.com/images/hd/cartoon-pictures-ty2cqbq2er9iov7h.jpg",
      email: "dipeshgautam@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen  bg-slate-50">
      <div className="p-2 flex items-center flex-col">
        <h2 className="text-4xl text-blue-900 font-semibold font-poppins tracking-tight sm:text-4xl underline underline-offset-8 my-8">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl py-40">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300 ease-in-out flex flex-col items-center "
            >
              <img
                src={member.photo}
                alt={`${member.name}`}
                className="w-42 h-52 rounded-md mb-4 "
              />
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-gray-700 mb-1 font-semibold">
                {member.degree}
              </p>
              <div className="flex flex-col items-start  w-full space-y-1 text-sm text-gray-500 mt-1">
                <p className=" text-start ">Roll No: {member.rollNo}</p>
                <p className=" text-start">Email: {member.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
