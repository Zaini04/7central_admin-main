import JointForm from "components/addcustomer/joint/jointfrom";
import Nextkinfrom from "components/addcustomer/nextkin/nextkinfrom";
import Notificationfrom from "components/addcustomer/notification/notificationfrom";
import AddCustomerLayout from "components/global/customerlayout/AddCustomerLayout";
import { useRef } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import NextButton from "components/global/form/NextButton";
import SkipButton from "components/global/form/SkipButton";



const CusomerNotification = () => {
    const { id } = useParams();
      const formRef = useRef(); 
           const { createCustomerNotificationLoading } = useSelector(state => state.customer);
    
const navigate=useNavigate();
    const customerId = 1; 


    const   dynamicName=(
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">New Customer</h2>
        </div>
    );

      const submitButton = (
      <div className="flex items-center gap-2">
      <button 
       onClick={()=>navigate(`/app/Customer/${id}/documents`)}
      type="button" className="   w-fit">
        <SkipButton/>
      </button>

        <button
        disabled={createCustomerNotificationLoading}
        type="button"
        className={` ${createCustomerNotificationLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        onClick={() => !createCustomerNotificationLoading && formRef.current?.submitForm()}
      >
                  <NextButton label="Next / Save" createLoading={createCustomerNotificationLoading} />

      </button>
      {/* <button
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
    <Notificationfrom ref={formRef} />
    </AddCustomerLayout>
  )
}

export default CusomerNotification;