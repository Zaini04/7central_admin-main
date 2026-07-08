import { useNavigate,useParams } from "react-router-dom";
import { useRef } from "react";
import GeneralForm from "components/editcustomer/documnet/documnetCustomer";
import AddCustomerLayout from "components/global/customereditlayout/AddCustomerLayout";
import BackButton from "components/global/form/BackButton";

const DocumentUpdate = () => {
        const { id } = useParams();

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
        onClick={() => navigate(`/app/Customer`)}
        type="button"
        className=" w-fit"
      >
    <BackButton/>
      </button>

  
    </div>
  );

  return (
    <AddCustomerLayout dynamicName={dynamicName} dynmicbutton={submitButton}>
      <GeneralForm ref={formRef} />
    </AddCustomerLayout>
  );
};

export default DocumentUpdate;
