import { GiTrackedRobot } from "react-icons/gi";
import { Link } from "react-router-dom";

const links = [
  { title: "Upload", path: "/upload" },
  { title: "About", path: "/about" },
  { title: "Team", path: "/team" },
];

const NavBar = () => {
  return (
    <div className="border-b-2 font-poppins">
      <header className="flex h-14 w-full items-center px-4 ">
        <Link to="/" className="flex items-center">
          <GiTrackedRobot size={40} />
        </Link>
        <nav className="ml-auto flex items-center gap-12 uppercase px-10">
          {links.map((link, index) => (
            <Link
              key={`navs_${index}`}
              to={link.path}
              className="text-base text-blue-900 font-poppins font-semibold hover:text-green-800  hover:scale-125 transition-all duration-500 transform"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
