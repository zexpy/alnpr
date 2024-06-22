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
        <nav className="ml-auto flex items-center gap-4 uppercase">
          {links.map((link, index) => (
            <Link
              key={`navs_${index}`}
              to={link.path}
              className="text-base font-normal hover:text-green-800 hover:underline-offset-4 transition duration-500 transform origin-left"
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
