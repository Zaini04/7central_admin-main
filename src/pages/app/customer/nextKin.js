import JointForm from "components/addcustomer/joint/jointfrom";
import Nextkinfrom from "components/addcustomer/nextkin/nextkinfrom";
import AddCustomerLayout from "components/global/customerlayout/AddCustomerLayout";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import NextButton from "components/global/form/NextButton";


const NextOfKin = () => {
        const { id } = useParams();
          const { createCustomerNextOfKinLoading } = useSelector(state => state.customer);
        

      const formRef = useRef(); 
    
const navigate=useNavigate();


    const   dynamicName=(
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">New Customer</h2>
        </div>
    );

      const submitButton = (
      <div className="flex items-center gap-2">
      {/* <button 
       onClick={()=>
        navigate(`/app/Customer/${id}/notifications`)}
      type="button" className="btn-secondary   w-fit">
        Skip
      </button> */}





  <button
        disabled={createCustomerNextOfKinLoading}
        type="button"
        className={` w-fit ${createCustomerNextOfKinLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        onClick={() => !createCustomerNextOfKinLoading && formRef.current?.submitForm()}
      >
                 <NextButton label="Next / Save" createLoading={createCustomerNextOfKinLoading} />

      </button>
{/* 
      <button
        type="button"
        className="btn-primary py-2 px-6 w-fit"
        onClick={() => formRef.current?.submitForm()}
      >
        Next / Save
      </button> */}
    </div>
  );
  return (
    <AddCustomerLayout   dynamicName={dynamicName}  dynmicbutton={submitButton}>
    <Nextkinfrom ref={formRef} />
    </AddCustomerLayout>
  )
}

export default NextOfKin;