import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useRef } from "react";
import GeneralForm from "components/editcustomer/notification/notificationfrom";
import AddCustomerLayout from "components/global/customereditlayout/AddCustomerLayout";
import { PulseLoader } from "react-spinners";
import SkipButton from "components/global/form/SkipButton";
import NextButton from "components/global/form/NextButton";

const NotificationUpdate = () => {
        const { id } = useParams();
        const [loading, setLoading] = useState(false);

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
        onClick={() => navigate(`/app/Customer-detail/${id}/document`)}
        type="button"
        className=" w-fit"
      >
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
        Next / Update
      </button> */}
    </div>
  );

  return (
    <AddCustomerLayout dynamicName={dynamicName} dynmicbutton={submitButton}>
      <GeneralForm ref={formRef} 
    loading={loading} 
      setLoading={setLoading}

      />
    </AddCustomerLayout>
  );
};

export default NotificationUpdate;
