import EditSvg from "assets/svg/home/home/EditSvg";
import { PulseLoader } from "react-spinners";

const EditButton = ({ label = "Add" ,createLoading, isIcon = true}) => {

  return (
    <div
      className={`  ${isIcon ? "pl-1.5 pr-4":" px-4"}  h-[32px] flex items-center justify-start gap-2 bg-[#1F2020] text-white rounded-full hover:bg-[#1F2020]/90 transition-all duration-200 ${createLoading ? "opacity-70": "" }`}
    > {
        createLoading ? <PulseLoader size={12} color="white"/> 
        :

        <>
     {isIcon && 
            <div className="w-[22px] h-[22px] rounded-full bg-white flex justify-center items-center">

    
        <EditSvg/>
     {/* <i className="uil uil-plus text-lg"></i> */}
     </div>
     }
      <span className="font-medium text-xs">{label}</span>
      </>
    }
    </div>
  );
};

export default EditButton;