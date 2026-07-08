import AssignInventoryForm   from 'components/assignInventory/AssignInventoryForm';
import { useQuery } from 'react-query';
import Axios from 'config/api';
import { useDispatch,useSelector } from 'react-redux';
import { setStats } from 'redux/slices/projectSlice';



const AssignInventory = () => {

     



    return (
        <div className='flex flex-col gap-5 w-full'>
             <div className=' flex flex-col xl:flex-row  gap-2  xl:items-center xl:justify-between  w-full'>
             <div  className='flex  flex-col gap-1.5'>
             <h2 className='page-heading '>Assign Inventory</h2>
             </div>
             </div>
             <AssignInventoryForm/>
 
        
        </div>
    )
}

export default AssignInventory;