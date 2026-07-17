import { useNavigate, useParams, } from "react-router-dom";
import { useRef, useState } from "react";
import GeneralForm from "components/addcustomer/general/generalfrom";
import AddCustomerLayout from "components/global/customerlayout/AddCustomerLayout";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import NextButton from "components/global/form/NextButton";
import CancelButton from "components/global/form/CancelButton";
import ReferalProgramForm from "components/addcustomer/referalProgram/ReferealProgramForm";
import SkipButton from "components/global/form/SkipButton";

const ReferalProgram = () => {

  const { createLoading } = useSelector(state => state.customer);
    const { id } = useParams();


  const navigate = useNavigate();
  const formRef = useRef(); 

  const dynamicName = (
    <div className="flex flex-col gap-1.5">
      <h2 className="text-gunmetal  font-semibold  text-xl md:text-[24px]">Add Customers</h2>
    </div>
  );

  const submitButton = (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => navigate(`/app/Customer/${id}/notifications`)}
        type="button"
        className=""
      >
        <SkipButton/>
      </button>

        <button
        disabled={createLoading}
        type="button"
        className={` w-fit ${createLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        onClick={() => !createLoading && formRef.current?.submitForm()}
      >
        
          <NextButton label="Next / Save" createLoading={createLoading} />
        
      </button>
      
    </div>
  );

  return (
    <AddCustomerLayout  dynamicName={dynamicName} dynmicbutton={submitButton}>
      <ReferalProgramForm ref={formRef}   />
    </AddCustomerLayout>
  );
};

export default ReferalProgram;
