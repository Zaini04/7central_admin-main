
import { useState } from "react";
import JointForm from "components/addcustomer/joint/jointfrom";
import Nextkinfrom from "components/editcustomer/nextkin/nextkinfrom";
import AddCustomerLayout from "components/global/customereditlayout/AddCustomerLayout";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import SkipButton from "components/global/form/SkipButton";
import NextButton from "components/global/form/NextButton";


const NextOfKin = () => {
        const { id } = useParams();

        const [loading, setLoading] = useState(false);

      const formRef = useRef(); 
    
const navigate=useNavigate();


    const   dynamicName=(
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">New Customer</h2>
        </div>
    );

      const submitButton = (
      <div className="flex items-center gap-2">
      <button 
       onClick={()=>
        navigate(`/app/Customer-detail/${id}/notifications`)}
      type="button" className="   w-fit">
        <SkipButton/>
      </button>




        <button
        disabled={loading}
        type="button"
        className={` w-fit ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        onClick={() => !loading && formRef.current?.submitForm()}
      >
      <NextButton label="Next/Update" createLoading={loading}/>
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
    <Nextkinfrom ref={formRef} 

      loading={loading} 
      setLoading={setLoading}
    />
    </AddCustomerLayout>
  )
}

export default NextOfKin;