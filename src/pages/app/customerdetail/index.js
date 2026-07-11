import { useState } from 'react';
import CustomerInstallmentTable  from 'components/customerdetail/customerInstallmentTable';
import CustomerReceiptInstallmentTable   from 'components/customerdetail/CustomerReceiptInstallmentTable'
import CustomerUplaodDocumnet   from 'components/customerdetail/CustomerUplaodDocumnet';
import CustomerAssignInvestor   from 'components/customerdetail/CustomerAssignInvestor';
import CustomerInsatllmentFilter   from 'components/customerdetail/CustomerInsatllmentFilter'
import CustomerDetailForm  from 'components/customerdetail/CustomerDetailForm';
import Nextkinfrom from 'components/editcustomer/nextkin/nextkinfrom';
import Notificationfrom from 'components/editcustomer/notification/notificationfrom';
import DocumnetCustomerForm from 'components/editcustomer/documnet/documnetCustomer';

const CustomerDetail = () => {
       const [readOnly,setReadOnly]=useState(true);
  return (
        <div className='flex flex-col gap-5 w-full'>
             <div className=' flex flex-col sm:flex-row  gap-2  sm:items-center sm:justify-between  w-full'>
             <div  className='flex  flex-col gap-1.5'>
             <h2 className='page-heading '>Customer Name</h2>
             </div>
       
           <div className="flex flex-wrap items-center gap-2">

               <button
                 
                     className="  text-red-500 border bg-light2 rounded-[10px] text-light2   px-6 h-[50px]">
                        Edit
                    </button>
                    <button
                  onClick={() => setReadOnly(false)}
                     className=" bg-primary border rounded-[10px] text-light2   px-6 h-[50px]">
                        Edit
                    </button>

                </div>
            
             </div>

              <div className="w-full flex flex-col gap-5 pb-4 rounded-xl ">
              <CustomerDetailForm  readOnly={readOnly}/>
              {/* <Nextkinfrom readOnly={readOnly}/>
              <Notificationfrom readOnly={readOnly}/>
              <DocumnetCustomerForm readOnly={readOnly} /> */}
               <CustomerInsatllmentFilter/>
                 <CustomerInstallmentTable/>
                 <CustomerReceiptInstallmentTable/>
                 <CustomerUplaodDocumnet/>
                 <CustomerAssignInvestor/>
                
              </div>

         
       
        </div>
  )
}

export default CustomerDetail;