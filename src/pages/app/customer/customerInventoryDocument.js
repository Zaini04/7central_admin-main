import DocumnetCustomerForm from "components/addcustomer/inventorydocumnet/documnetInvetory";
import AddCustomerLayout from "components/global/customerlayout/AddCustomerLayout";
import NextButton from "components/global/form/NextButton";
import SkipButton from "components/global/form/SkipButton";
import { useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const CustomerInventoryDocument = () => {
    const { id } = useParams();
  const formRef = useRef(); 
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const inventoryId = searchParams.get("inventory");

  const dynamicName = (
    <div className="flex flex-col gap-1.5">
      <h2 className="page-heading">New Customer</h2>
    </div>
  );

  const submitButton = (
    <div className="flex items-center gap-2">

      <button
        onClick={() =>
          navigate(`/app/Customer/${id}/installment-plan?inventory=${inventoryId}`)
        }
        type="button"
        className=" w-fit"
      >
    <SkipButton/>
      </button>

      <button
        type="button"
        className=" w-fit"
               onClick={() =>
          navigate(`/app/Customer/${id}/installment-plan?inventory=${inventoryId}`)
        }
      >
        <NextButton label="Next"/>
      </button>
    </div>
  );

  return (
    <AddCustomerLayout dynamicName={dynamicName} dynmicbutton={submitButton}>
      <DocumnetCustomerForm ref={formRef} /> 
    </AddCustomerLayout>
  );
};

export default CustomerInventoryDocument;
