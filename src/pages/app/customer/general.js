import { useNavigate, } from "react-router-dom";
import { useRef } from "react";
import GeneralForm from "components/addcustomer/general/generalfrom";
import AddCustomerLayout from "components/global/customerlayout/AddCustomerLayout";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import NextButton from "components/global/form/NextButton";
import CancelButton from "components/global/form/CancelButton";

const GeneralCustomer = () => {

  const { createLoading } = useSelector(state => state.customer);


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
        onClick={() => navigate("/app/Customer")}
        type="button"
        className=""
      >
        <CancelButton/>
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
    <AddCustomerLayout dynamicName={dynamicName} dynmicbutton={submitButton}>
      <GeneralForm ref={formRef} />
    </AddCustomerLayout>
  );
};

export default GeneralCustomer;
