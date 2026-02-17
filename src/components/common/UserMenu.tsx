import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogOut, ChevronDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/authentication";




const UserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { state, logout } = useAuth();

  // ฟังก์ชัน useEffect นี้จะทำงานเมื่อ component ถูก mount และจะเพิ่ม event listener เพื่อฟังการคลิกที่เกิดขึ้นบน document
  // ถ้าผู้ใช้คลิกที่นอก dropdown menu (ซึ่งตรวจสอบโดยการใช้ ref) จะทำให้ dropdown menu ปิดลงโดยการตั้งค่า isOpen เป็น false
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update image key when user profile changes
  const handleProfileClick = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const handleResetPasswordClick = () => {
    setIsOpen(false);
    navigate("/reset-password");
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    logout();
  };

  // ถ้าข้อมูลผู้ใช้ใน state ไม่มี (เช่น ยังไม่โหลดข้อมูลผู้ใช้หรือผู้ใช้ยังไม่เข้าสู่ระบบ) ให้ return null เพื่อไม่แสดงเมนูนี้
  if (!state.user) {
    return null;
  }
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        {/* Profile Picture */}
        <Avatar>
          <AvatarImage
            key={state.user.profile_pic}
            src={state.user.profile_pic}
            alt={state.user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-brown-300"
          />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>

        {/* Username */}
        <span className="text-brown-600 font-medium hidden lg:block">
          {state.user.name}
        </span>

        {/* Chevron Icon */}
        <ChevronDown
          className={`w-4 h-4 text-brown-600 transition-transform duration-200 hidden lg:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border border-brown-200 py-2 z-50">
          {/* Profile */}
          <button
            onClick={handleProfileClick}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brown-50 transition-colors text-left"
          >
            <User className="w-5 h-5 text-brown-600" />
            <span className="text-brown-600 font-medium">Profile</span>
          </button>

          {/* Reset Password */}
          <button
            onClick={handleResetPasswordClick}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brown-50 transition-colors text-left"
          >
            <Lock className="w-5 h-5 text-brown-600" />
            <span className="text-brown-600 font-medium">Reset password</span>
          </button>

          {/* Divider */}
          <div className="border-t border-brown-200 my-2"></div>

          {/* Logout */}
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
          >
            <LogOut className="w-5 h-5 text-red-600" />
            <span className="text-red-600 font-medium">Log out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
