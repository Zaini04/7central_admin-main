import {menuItems} from 'constants/addcustomer.constants';

import { useLocation,matchPath  } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { FaCheck } from "react-icons/fa";

 

const SiderbarCustomer = () => {

      const { steps } = useSelector(state => state.customer);


  
    const location = useLocation();
  const checkIsActive = (path, exact) => {
    return matchPath({ path, end: exact }, location.pathname) !== null;
  };


  return (
      <div className=" w-full  ">
          <ul className="py-4 pl-3 lg:pl-0 flex flex-wrap gap-3  lg:gap-2">
            {menuItems.map((item) => {
                               const isActive = checkIsActive(item.path, item.exact);
          const stepValue = steps?.[item.stepKey];  
              return (
                <li key={item.id}>
                  <div
            
                    className={`flex flex-row  rounded-xl justify-center w-full lg:justify-start items-center  py-2  px-2 gap-2 text-xs cursor-pointer transition-all group
                      ${
                        isActive
                          ? "text-white bg-[#1F2020]  "
                          : " bg-white text-[#1F202066] hover:text-primary"
                      }
                    `}
                  >
                  <item.icon 
                                    className={`w-[14px] 
                                      
                                    `} 
                                    />
                    <p>{item.name}</p>

                       {stepValue ? (
                  <span className="text-green-600 text-lg ml-auto pr-5">
                    <FaCheck/>
                  </span>
                ) : (
                  <span className=""></span>
                )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
  )
}

export default SiderbarCustomer;



