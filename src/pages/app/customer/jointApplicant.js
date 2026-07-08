import JointForm from "components/addcustomer/joint/jointfrom";
import AddCustomerLayout from "components/global/customerlayout/AddCustomerLayout";
import { useNavigate } from "react-router-dom";


const JointApplicant = () => {

    
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
       onClick={()=>navigate(`/app/Customer/${customerId}/joint`)}
      type="button" className="btn-secondary   w-fit">
        Skip
      </button>
      <button type="submit" form="jointApplicant" className="btn-primary py-2 px-6  w-fit">
       Next/Save
      </button>
    </div>
  );
  return (
    <AddCustomerLayout   dynamicName={dynamicName}  dynmicbutton={submitButton}>
    <JointForm/>
    </AddCustomerLayout>
  )
}

export default JointApplicant;