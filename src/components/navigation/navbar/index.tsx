import Image from "next/image";
import { BsFillMoonStarsFill } from "react-icons/bs";
import logoImage from "@/images/logo.png";

interface IProps {
  toggleTheme: () => void;
}

const Navbar = ({ toggleTheme }: IProps) => {
  return (
    <nav className="py-5  flex justify-between dark:text-white">
      <div className="w-10 h-10 relative overflow-hidden ">
        <Image src={logoImage} alt="logo" />
      </div>
      <ul className="flex items-center">
        <li>
          <BsFillMoonStarsFill
            onClick={toggleTheme}
            className=" cursor-pointer text-2xl"
          />
        </li>
        <li>
          <a
            className="bg-gradient-to-r from-cyan-500 text- to-teal-500 text-white px-4 py-2 border-none rounded-md ml-8"
            href="https://docs.google.com/document/d/1OTWeloHca8okZahpImsONczlPF6I11eT/export?format=pdf"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
