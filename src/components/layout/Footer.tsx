import github from "../../assets/icons/Github_black.svg";
import google from "../../assets/icons/Google_black.svg";
import linkedin from "../../assets/icons/LinkedIN_black.svg";

export const Footer = () => {
  return (
    <div className="bg-brown-200 w-full p-10 lg:px-20 lg:py-15">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
        {/* Left side*/}
        <div className="flex justify-center lg:justify-start items-center gap-3">
          <p className="text-brown-500 text-body-1">Get in touch</p>
          <img src={linkedin} alt="linkedin" className="w-6 h-6" />
          <img src={github} alt="github" className="w-6 h-6" />
          <img src={google} alt="google" className="w-6 h-6" />
        </div>

        {/* Right side */}
        <div className="flex justify-center lg:justify-end">
          <p className="hover:underline font-medium text-base text-brown-600">
            Home page
          </p>
        </div>
      </div>
    </div>
  );
};
