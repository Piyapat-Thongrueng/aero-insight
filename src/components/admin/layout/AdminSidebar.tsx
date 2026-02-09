import { NavLink } from "react-router-dom";
import { FileText, FolderOpen, User, Bell, Lock, LogOut } from "lucide-react";
import weblogo from "../../../assets/icons/web-logo.svg"

const AdminSidebar = () => {
  const menuItems = [
    { path: "/admin/articles", label: "Article management", icon: FileText },
    { path: "/admin/categories", label: "Category management", icon: FolderOpen },
    { path: "/admin/profile", label: "Profile", icon: User },
    { path: "/admin/notifications", label: "Notification", icon: Bell },
    { path: "/admin/reset-password", label: "Reset password", icon: Lock },
  ];
  return (
    <aside className="hidden md:w-75 md:bg-brown-200 md:border-r md:border-brown-200 md:flex md:flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-brown-200">
        <img src={weblogo} alt="web-logo" className="w-20 h-20" />
        <p className="text-orange text-headline-4">Admin panel</p>
      </div>
      {/* Menu Items */}
      <nav className="flex-1 p-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-4 rounded-lg mb-2 transition-colors text-body-1 ${
                isActive
                  ? "bg-gray-100 text-black"
                  : "text-brown-400 hover:bg-gray-50"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      {/* Footer Actions */}
      <div className="p-3 border-t border-gray-200">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-4 text-gray-600 hover:bg-gray-50 rounded-lg mb-2"
        >
          <span className="text-sm">hh. website</span>
        </a>
        <button className="flex items-center gap-3 px-4 py-4 text-gray-600 hover:bg-gray-50 rounded-lg w-full">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
