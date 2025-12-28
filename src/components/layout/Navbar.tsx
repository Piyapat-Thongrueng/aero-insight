import weblogo from "../../assets/icons/web-logo.svg";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex px-8 pt-4 pb-3 justify-between items-center border-b lg:px-20 lg:py-4">
      <div>
        <img src={weblogo} alt="web-logo" className="w-6 h-6 lg:w-11 lg:h-11" />
      </div>
      <div className="hidden md:flex gap-1.5">
        <div className="border border-brown-400 bg-white text-brown-600 px-10 py-3 rounded-full">
          <button>Login</button>
        </div>
        <div className="border border-brown-600 bg-brown-600 text-white px-10 py-3 rounded-full">
          <button>Sign up</button>
        </div>
      </div>
      <div className="md:hidden">
        <Menu size={19} />
      </div>
    </nav>
  );
};

export default Navbar;
