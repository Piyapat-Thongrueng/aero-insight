import weblogo from "../../assets/icons/web-logo.svg";
import LoginButton from "../common/LoginButton";
import { DropDown } from "../common/DropDown";
import SignupButton from "../common/SignupButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";
import NotificationBell from "../common/NotificationBell";
import Usermenu from "../common/UserMenu";
import { Loader2 } from "lucide-react";

const Navbar = () => {
  // เรียกใช้งาน useAuth เพื่อเข้าถึงสถานะการตรวจสอบสิทธิ์และฟังก์ชันที่เกี่ยวข้องกับการตรวจสอบสิทธิ์ผู้ใช้
  // เช่น isAuthenticated ซึ่งจะบอกว่าผู้ใช้ได้เข้าสู่ระบบแล้วหรือยัง และฟังก์ชันอื่น ๆ ที่อาจมีใน context นี้
  const { isAuthenticated, state } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <nav className="flex px-8 pt-4 pb-3 justify-between items-center border-b lg:px-20 lg:py-4">
      {/* Logo */}
      <div className="cursor-pointer" onClick={handleLogoClick}>
        <img src={weblogo} alt="web-logo" className="w-6 h-6 lg:w-11 lg:h-11" />
      </div>

      {/* Desktop: Authenticated vs Non-authenticated */}
      <div className="hidden md:flex items-center gap-4">
        {/* ✅ เพิ่ม Loading State */}
        {state.getUserLoading ? (
          <div className="flex items-center gap-4">
            {/* Notification Bell Skeleton */}
            <div className="w-10 h-10 bg-brown-200 rounded-full animate-pulse"></div>

            {/* Profile Skeleton */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brown-200 rounded-full animate-pulse"></div>
              <div className="w-24 h-4 bg-brown-200 rounded animate-pulse hidden lg:block"></div>
            </div>
          </div>
        ) : isAuthenticated ? (
          // Authenticated state
          <>
            <NotificationBell />
            <Usermenu />
          </>
        ) : (
          // Non-authenticated state
          <div className="flex gap-1.5">
            <LoginButton onClick={handleLoginClick} />
            <SignupButton onClick={handleSignupClick} />
          </div>
        )}
      </div>

      {/* Mobile: Dropdown Menu */}
      <div className="md:hidden flex items-center gap-3">
        {state.getUserLoading ? (
          // Loading state (mobile)
          <div className="flex items-center gap-2 text-brown-600">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : isAuthenticated ? (
          // Authenticated state (mobile)
          <>
            <NotificationBell />
            <Usermenu />
          </>
        ) : (
          // Non-authenticated state (mobile)
          <DropDown onLogin={handleLoginClick} onSignup={handleSignupClick} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
