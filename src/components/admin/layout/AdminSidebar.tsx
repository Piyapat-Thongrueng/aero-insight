import { NavLink } from "react-router-dom";
import {
  FileText,
  FolderOpen,
  User,
  Bell,
  Lock,
  LogOut,
  X,
} from "lucide-react";
import weblogo from "../../../assets/icons/web-logo.svg";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({ isOpen = false, onClose }: AdminSidebarProps) => {
  const menuItems = [
    { path: "/admin/articles", label: "Article management", icon: FileText },
    {
      path: "/admin/categories",
      label: "Category management",
      icon: FolderOpen,
    },
    { path: "/admin/profile", label: "Profile", icon: User },
    { path: "/admin/notifications", label: "Notification", icon: Bell },
    { path: "/admin/reset-password", label: "Reset password", icon: Lock },
  ];

  return (
    <>
      {/* Mobile Overlay - ปิดเมื่อคลิกข้างนอก */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-full md:w-64 lg:w-72
          bg-brown-200 border-r border-brown-200
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 md:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-brown-200">
          <img
            src={weblogo}
            alt="web-logo"
            className="w-16 h-16 md:w-20 md:h-20"
          />
          <p className="text-orange text-lg md:text-xl font-semibold mt-2">
            Admin panel
          </p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose} // Close sidebar on mobile after clicking
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 md:py-4 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? "bg-gray-100 text-black"
                    : "text-brown-400 hover:bg-gray-50"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm md:text-base">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-gray-200">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mb-2"
          >
            <span className="text-sm md:text-base">hh. website</span>
          </a>
          <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg w-full">
            <LogOut className="w-5 h-5" />
            <span className="text-sm md:text-base">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
