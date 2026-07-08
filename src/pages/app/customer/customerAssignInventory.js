import DocumnetCustomerForm from "components/addcustomer/assingInventory/AssignInventoryForm";
import AddCustomerLayout from "components/global/customerlayout/AddCustomerLayout";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import SkipButton from "components/global/form/SkipButton";
import NextButton from "components/global/form/NextButton";


const CustomerAssignInventory = () => {
  const { id } = useParams();
  const formRef = useRef();
  const navigate = useNavigate();

      const { createCustomerAssignLoading } = useSelector(state => state.customer);
  const dynamicName = (
    <div className="flex flex-col gap-1.5">
      <h2 className="page-heading">New Customer</h2>
    </div>
  );

  const submitButton = (
    <div className="flex items-center gap-2">
    <button
  type="button"
  className=" w-fit"
  onClick={() => {
    navigate(`/app/Customer`);
    toast.success('Assign inventory skipped successfully');
  }}
>
  <SkipButton/>
</button>




   <button
        disabled={createCustomerAssignLoading}
        type="button"
        className={`w-fit ${createCustomerAssignLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        onClick={() => !createCustomerAssignLoading && formRef.current?.submitForm()}
      >
                 <NextButton label="Next / Save" createLoading={createCustomerAssignLoading} />

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

export default CustomerAssignInventory;
