import React from 'react'
import SelectInventory   from 'components/global/SelectInventory';
import UploadInventoryForm   from 'components/uploadinventory/UploadInventoryForm';

const Uploadinventory = () => {
  return (
      <div className='flex flex-col gap-5 w-full'>
             <div className=' flex flex-col xl:flex-row  gap-2  xl:items-center xl:justify-between  w-full'>
             <div  className='flex  flex-col gap-1.5'>
             <h2 className='page-heading '>Add Inventory</h2>
             </div>
             </div>

                  <div className='bg-white rounded-xl'>

         <SelectInventory/>
           <UploadInventoryForm/>
  
       </div>
        
        </div>
  )
}

export default Uploadinventory;

