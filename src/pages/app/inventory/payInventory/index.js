import ExportButton from 'components/global/exportbutton/ExportButton';
import BackButton from 'components/global/form/BackButton';
import PayInventoryForm from 'components/payinventory/PayInventoryForm';
import { useNavigate } from "react-router-dom";




const PayInventory = () => {
      const navigate = useNavigate();
  return (
      <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row  gap-2  sm:items-center sm:justify-between  px-1 w-full">
                <div className="flex flex-col gap-1.5">
                    <h2 className="page-heading">Pay Inventory</h2>
                </div>

              
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/app/inventory")}
            className="w-fit"
          >
            <BackButton/>
          </button>
        </div>



                        

          
            </div>
                               <div className="w-full bg-white flex flex-col gap-2  pt-3 pb-4 rounded-xl shadow-sm">

                              
            <PayInventoryForm/>
             </div>


                 
                          
    



        </div>
  )
}

export default PayInventory;