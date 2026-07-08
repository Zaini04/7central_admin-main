import { IoIosArrowDropdown } from "react-icons/io5";
import useToggle from '../../../hooks/useToggle';
import useClickOutside from '../../../utils/clickOutside';
import { useRef } from 'react';
import { Link } from "react-router-dom";
// import './Notifcation.css';
import NotificationSvg from '../../../assets/svgs/NotificationSVG';
import { BsFillChatSquareTextFill } from "react-icons/bs";

export default function Notifcation() {
  const menuRef = useRef();
  const [ShowMenu, toggleShowMenu] = useToggle();
  useClickOutside(menuRef, () => toggleShowMenu(false));

  // Static notifications
  const staticNotifications = [
    { id: 1, title: "New message from John", time: "2 minutes ago", isRead: false },
    { id: 2, title: "Payment received", time: "1 hour ago", isRead: true },
    { id: 3, title: "Your profile was viewed", time: "Yesterday", isRead: false },
  ];

  return (
    <div
      className="flex items-center gap-3 cursor-pointer relative"
      onClick={toggleShowMenu}
      ref={menuRef}
    >
             <div className="w-[33px] h-[33px] rounded-full bg-[#C7EAE7] flex justify-center items-center">

      <NotificationSvg />
</div>
      <div
        className={`absolute right-[-50px] top-14 w-[250px] h-fit rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.15)] bg-white z-50 transition-all duration-200 ease-in-out transform ${
          ShowMenu
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 h-[50px] border-b border-gray-200 bg-primary text-white rounded-t-lg">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <span className="text-sm opacity-80">
            {staticNotifications.filter(n => !n.isRead).length} Unread
          </span>
        </div>

        {/* Notification List */}
        <div className="h-fit sidebar-scroll overflow-y-auto">
          {staticNotifications.map(notification => (
            <div
              key={notification.id}
              className={`flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0 transition-colors duration-200 ${
                !notification.isRead
                  ? "bg-[#EAF2FF] hover:bg-[#D9E8FF]"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex-1 px-2">
                <p className="text-sm text-gray-800 font-medium">
                  {notification.title}
                </p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center text-center border-t border-gray-200 py-3">
          <Link
            to="#"
            className="text-blue-600 font-semibold hover:underline flex justify-center items-center gap-1"
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}
