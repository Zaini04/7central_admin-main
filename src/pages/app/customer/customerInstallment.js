import DocumnetCustomerForm from "components/addcustomer/customerpurchaseplan/InventoryPurchaseForm";
import AddCustomerLayout from "components/global/customerlayout/AddCustomerLayout";
import { useRef } from "react";
import { useNavigate,useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import NextButton from "components/global/form/NextButton";
import BackBtn from "components/global/form/BackButton";
import BackButton from "components/global/form/BackButton";




const CustomerInstallment = () => {
    const { id } = useParams();
  const formRef = useRef(); 
  const navigate = useNavigate();
  const location = useLocation();

const searchParams = new URLSearchParams(location.search);
  const inventoryId = searchParams.get("inventory");
    const { createPurchaseLoading } = useSelector(state => state.inventory);
  


  const dynamicName = (
    <div className="flex flex-col gap-1.5">
      <h2 className="page-heading">New Customer</h2>
    </div>
  );

  const submitButton = (
    <div className="flex items-center gap-2">


     <button
        onClick={() =>
          navigate(`/app/Customer/${id}/inventory-documents?inventory=${inventoryId}`)
        }
        type="button"
        className=" w-fit"
      >
         <BackButton/>
      </button>



  <button
        disabled={createPurchaseLoading}
        type="button"
        className={` w-fit ${createPurchaseLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        onClick={() => !createPurchaseLoading && formRef.current?.submitForm()}
      >
        <NextButton label="Save" createLoading={createPurchaseLoading}/>
      </button>

      {/* <button
        type="button"
        className="btn-primary py-2 px-6 w-fit"
       onClick={() => formRef.current?.submitForm()}
      >
        Save
      </button> */}
    </div>
  );

  return (
    <AddCustomerLayout dynamicName={dynamicName} dynmicbutton={submitButton}>
      <DocumnetCustomerForm ref={formRef} /> 
    </AddCustomerLayout>
  );
};

export default CustomerInstallment;
