import { Bell } from "lucide-react";
import { useState } from "react";

const NotificationBell = () => {
  const [hasNotification] = useState(true); // ✅ ตัวอย่าง - ควรมาจาก API
  return (
    <button
      className="relative p-2 hover:bg-brown-50 rounded-full transition-colors"
      aria-label="Notifications"
    >
      <Bell className="w-6 h-6 text-brown-600" />

      {/* Red dot notification indicator */}
      {hasNotification && (
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
      )}
    </button>
  );
};

export default NotificationBell;
