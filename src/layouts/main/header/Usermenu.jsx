import useToggle from "../../../hooks/useToggle";
import useClickOutside from "../../../utils/clickOutside";
import { useRef } from "react";
import img from "../../../assets/images/img2.jpg";
import ArrowDownSvg from "../../../assets/svgs/ArrowDownSvg";
import toast from "react-hot-toast";
import { logout } from "redux/actions/authActions";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Usermenu({ username, profileImage, role }) {
  const menuRef = useRef();
  const [showMenu, toggleShowMenu] = useToggle();
  useClickOutside(menuRef, () => toggleShowMenu(false));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);


  const handleLogout = async () => {
    try {
      await dispatch(logout(navigate, toast));
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error(err?.message || "Logout failed. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center gap-3 cursor-pointer relative"
      onClick={toggleShowMenu}
      ref={menuRef}
    >
      <div className="w-[32px] h-[32px] border  overflow-hidden rounded-full">
        <img
          src={profileImage}
          alt="user avatar"
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-[#1A1C1E] font-semibold  hidden md:block">{username}</p>
      <div className='hidden md:block'>
  <ArrowDownSvg rotated={showMenu}    />
      </div>
    

      <div
        className={`absolute right-0 top-14 w-[230px] rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.15)] bg-white z-50 transition-all duration-200 ease-in-out transform ${
          showMenu
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-4">
          <div className="flex items-center space-x-3">
            <img
              src={profileImage}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{username}</h3>
              <p className="text-xs text-green-600 font-medium capitalize">
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* Static dropdown content */}
        <div className="mt-2 border-t border-gray-200">
  <Link to="/app">
  <div className="px-4 py-2 text-sm text-dark1 hover:bg-gray-100 cursor-pointer">
    Dashboard
  </div>
</Link>

<Link to="/app/settings">
  <div className="px-4 py-2 text-sm text-dark1 hover:bg-gray-100 cursor-pointer">
    Settings
  </div>
</Link>
          <div
               onClick={handleLogout}
           className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
                    {loading ? <PulseLoader size={10} color="#2D3748" /> : "Logout"}
          </div>
        </div>
      </div>
    </div>
  );
}