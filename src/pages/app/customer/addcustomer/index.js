import React, { useState, useRef } from "react";
import AssignSvg from "assets/svgs/customersvg/AssignSvg";
import GernalSvg from "assets/svgs/customersvg/GernalSvg";
import DocumnetSvg from "assets/svgs/customersvg/DocumnetSvg";
import InstallmentSvg from "assets/svgs/customersvg/InsatllementSvg";
import NextKinSvg from "assets/svgs/customersvg/NextKinSvg";
import NotificationSvg from "assets/svgs/customersvg/NotificationSvg";
import JointSvg from "assets/svgs/customersvg/JointSvg";

// Forms
import GeneralForm from "components/addcustomer/general/generalfrom";
import Jointfrom from "components/addcustomer/joint/jointfrom";
import Nextkinfrom from "components/addcustomer/nextkin/nextkinfrom";
import Notificationfrom   from 'components/addcustomer/notification/notificationfrom';
import DocumnetCustomerForm   from 'components/addcustomer/documents/documnetCustomer';
import  InventoryCustomer  from 'components/addcustomer/inventory/InventoryCustomer';
import InstallmentCustomer   from 'components/addcustomer/installmentplan/installmentCustomer';
import { useNavigate } from "react-router-dom";
import OriginalBuyer from "../OriginalBuyer";
import ReferalProgram from "../ReferalProgram";


const Addcustomer = () => {
  const [activeTab, setActiveTab] = useState("General");
  const  navigate=useNavigate('');
    const formRef = useRef(null); 
        const handleNextClick = () => {
    if (formRef.current) {
      formRef.current.submitForm(); 
    }
  };
 
  const menuItems = [
    { id: 1, name: "General", icon: GernalSvg },
    { id: 2, name: "Original-Buyer", icon: GernalSvg },
    { id: 3, name: "Joint Application", icon: JointSvg },
    { id: 4, name: "Next of Kin", icon: NextKinSvg },
        { id: 5, name: "Notifications", icon: NotificationSvg },
            { id: 6, name: "Documents", icon: DocumnetSvg },
    { id: 7, name: "Assign Inventory", icon: AssignSvg },
    { id: 8, name: "Installment Plan", icon: InstallmentSvg },
  ];

  

  const renderActiveForm = () => {
    switch (activeTab) {
      case "General":
        return (
          <GeneralForm
      setActiveTab={setActiveTab} formRef={formRef}
        
          />
        );
       
        case "Original Buyer":
        return <OriginalBuyer/>;
      case "Joint Application":
        return <Jointfrom />;
      case "Next of Kin":
        return <Nextkinfrom />;
        case "Referal Program":
          return <ReferalProgram/>;
      case "Notifications":
        return <Notificationfrom />;
      case "Documents":
        return <DocumnetCustomerForm />;
      case "Assign Inventory":
        return <InventoryCustomer />;
      case "Installment Plan":
        return <InstallmentCustomer />;
      default:
        return (
          <div className="p-6 text-gray-600 italic">
            {activeTab} section coming soon...
          </div>
        );
    }
  };




  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">Add Customers</h2>
        </div>
      
   
        {activeTab === "General" && (
          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={() => navigate("/app/Customer")}
              type="button"
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleNextClick}
              type="button"
              className="btn-primary py-2 sm:px-6 px-6 w-fit"
            >
              Next / Save
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="w-full bg-light2 flex flex-col lg:flex-row gap-1 rounded-lg">
        {/* Sidebar */}
        <div className=" w-full lg:w-[25%]  h-fit lg:h-screen border static lg:sticky top-0 bg-white">
          <ul className="py-4 pl-3 lg:pl-0 flex flex-wrap gap-3 lg:flex-col lg:gap-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.name;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <div
                    onClick={() => setActiveTab(item.name)}
                    className={`flex flex-row justify-center w-fit lg:w-full lg:justify-start items-center px-6 lg:px-0 py-3 pl-2 lg:pl-5 gap-2 text-sm cursor-pointer transition-all group
                      ${
                        isActive
                          ? "text-primary bg-gray1  rounded-full lg:rounded-[0px]  lg:border-secondary lg:border-r-2"
                          : "text-dark1 hover:text-primary"
                      }
                    `}
                  >
                    <Icon
                      className={`w-[18px] 
                        ${isActive ? "fill-primary" : " fill-dark1"} 
                        group-hover:fill-primary
                      `}
                    />
                    <p>{item.name}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Main Content */}
        <div className=" w-full lg:w-[75%]  h-fit lg:h-screen">
          {renderActiveForm()}
        </div>
      </div>
    </div>
  );
};

export default Addcustomer;





