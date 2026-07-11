import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Titlebtn = ({ label = "Add", url = "/" , isIcon = true}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(url)}
      className={` w-fit ${isIcon ? "pl-1.5 pr-4": "px-4"}  h-[32px] flex items-center justify-start gap-2 bg-[#1F2020] text-white rounded-full hover:bg-[#1F2020]/90 transition-all duration-200`}
    >
     {isIcon && 
            <div className="w-[22px] h-[22px] rounded-full bg-white flex justify-center items-center">

     {/* <FaPlus className=" text-black" size={20}  /> */}
     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8H12" stroke="#1F2020" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 12V4" stroke="#1F2020" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

     {/* <i className="uil uil-plus text-lg"></i> */}
     </div>
     }
      <span className="font-medium text-xs">{label}</span>
    </button>
  );
};

export default Titlebtn;