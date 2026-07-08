import InventoryCard    from 'components/inventory-purchaseplan/InventoryCard'
import InventoryPurchaseForm    from 'components/inventory-purchaseplan/InventoryPurchaseForm';
import UpdateInventoryPurchaseForm from 'components/inventory-purchaseplan/UpdateInventoryPurchaseForm';

const InventoryUpdatePurchaseplan = () => {
  return (
       <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row  gap-2  sm:items-center sm:justify-between  w-full">
                <div className="flex flex-col gap-1.5">
                    <h2 className="page-heading">Update Purchase Plan</h2>
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