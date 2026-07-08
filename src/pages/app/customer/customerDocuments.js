import DocumnetCustomerForm from "components/addcustomer/documents/documnetCustomer";
import AddCustomerLayout from "components/global/customerlayout/AddCustomerLayout";
import NextButton from "components/global/form/NextButton";
import SkipButton from "components/global/form/SkipButton";
import { useRef } from "react";
import { useNavigate,useParams } from "react-router-dom";

const CustomerDocuments = () => {
    const { id } = useParams();
  const formRef = useRef(); 
  const navigate = useNavigate();

  const dynamicName = (
    <div className="flex flex-col gap-1.5">
      <h2 className="page-heading">New Customer</h2>
    </div>
  );

  const submitButton = (
    <div className="flex items-center gap-2">
    
      <button 
        onClick={() => navigate(`/app/Customer/${id}/assign-inventory`)}
        type="button" 
        className=" w-fit"
      >
        <SkipButton/>
      </button>

      <button
        type="button"
        className=" w-fit"
        onClick={() => navigate(`/app/Customer/${id}/assign-inventory`)}

      >
                  <NextButton label="Next "  />

      </button>
    </div>
  );

  return (
    <AddCustomerLayout dynamicName={dynamicName} dynmicbutton={submitButton}>
      <DocumnetCustomerForm ref={formRef} /> 
    </AddCustomerLayout>
  );
};

export default CustomerDocuments;
