import weblogo from "../../assets/icons/web-logo.svg";
import LoginButton from "../common/LoginButton";
import { DropDown } from "../common/DropDown";
import SignupButton from "../common/SignupButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="flex px-8 pt-4 pb-3 justify-between items-center border-b lg:px-20 lg:py-4">
      <div className="cursor-pointer" onClick={handleLogoClick}>
        <img src={weblogo} alt="web-logo" className="w-6 h-6 lg:w-11 lg:h-11" />
      </div>
      <div className="hidden md:flex gap-1.5">
        <LoginButton />
        <SignupButton />
      </div>
      <button className="md:hidden flex items-center">
        <DropDown />
      </button>
    </nav>
  );
};

export default Navbar;
