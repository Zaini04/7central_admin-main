import BackButton from 'components/global/form/BackButton';
import InventoryCard    from 'components/inventory-purchaseplan/InventoryCard'
import InventoryPurchaseForm    from 'components/inventory-purchaseplan/InventoryPurchaseForm';
import UpdateInventoryPurchaseForm from 'components/inventory-purchaseplan/UpdateInventoryPurchaseForm';
import { useNavigate, useParams } from 'react-router-dom';

const InventoryUpdatePurchaseplan = () => {
    const {id} = useParams()
    const navigate = useNavigate()
  return (
       <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row  gap-2  sm:items-center sm:justify-between  w-full">
                <div className="flex flex-col gap-1.5">
                    <h2 className="page-heading">Update Purchase Plan</h2>
                </div>
                  <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/app/inventory/${id}`)}
            className="w-fit"
          >
            <BackButton/>
          </button>
        </div>
            </div>

           
           <div className="w-full bg-white flex flex-col gap-2 pb-4 rounded-xl shadow-sm">
            {/* <InventoryCard/> */}
            <UpdateInventoryPurchaseForm/>


             </div>



        </div>
  )
}

export default InventoryUpdatePurchaseplan;