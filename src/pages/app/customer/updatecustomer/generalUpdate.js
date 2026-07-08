import { useNavigate,useParams } from "react-router-dom";
import { useRef } from "react";
import GeneralForm from "components/editcustomer/general/generalfrom";
import AddCustomerLayout from "components/global/customereditlayout/AddCustomerLayout";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import NextButton from "components/global/form/NextButton";
import SkipButton from "components/global/form/SkipButton";


const GeneralUpdate = () => {
        const { id } = useParams();

              const { updateCustomerLoading } = useSelector(state => state.customer);


  const navigate = useNavigate();
  const formRef = useRef(); 

  const dynamicName = (
    <div className="flex flex-col gap-1.5">
      <h2 className="text-gunmetal  font-semibold  text-xl md:text-[24px]">Update Customers</h2>
    </div>
  );

  const submitButton = (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => navigate(`/app/Customer-detail/${id}/next-of-kin`)}
        type="button"
        className=" w-fit"
      >
        <SkipButton/>
      </button>






  <button
        disabled={updateCustomerLoading}
        type="button"
        className={` w-fit ${updateCustomerLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        onClick={() => !updateCustomerLoading && formRef.current?.submitForm()}
      >
       <NextButton label="Next/Update" createLoading={updateCustomerLoading}/>
      </button>



      {/* <button
        type="button"
        className="btn-primary py-2 px-6 w-fit"
        onClick={() => formRef.current?.submitForm()}
      >
     
      </button> */}
    </div>
  );

  return (
    <AddCustomerLayout dynamicName={dynamicName} dynmicbutton={submitButton}>
      <GeneralForm ref={formRef} />
    </AddCustomerLayout>
  );
};

export default GeneralUpdate;
