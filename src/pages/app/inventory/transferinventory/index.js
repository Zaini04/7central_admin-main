
import Titlebtn  from 'components/global/Titlebtn';
import TransferInventoryForm   from 'components/transferInventory/TransferInventoryForm';

const Transferinventory = () => {
  return (
  <div className='flex flex-col gap-5 w-full'>
             <div className=' flex flex-col xs:flex-row  gap-2  xs:items-center xs:justify-between  w-full'>
             <div  className='flex  flex-col gap-1.5'>
             <h2 className='page-heading '>Ownership Transfer </h2>
             </div>
             <Titlebtn  label='Add Customer'  url='/app/Customer/general'/>
             </div>  
             <TransferInventoryForm/>
  
        
        </div>
  )
}

export default Transferinventory;