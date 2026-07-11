
import { useState } from 'react';

import Status  from 'components/global/Status'
import EyetSVG from 'assets/svgs/EyetSVG';
import EditTSvg from 'assets/svgs/EditTSvg';
import CheckAllSVG   from 'assets/svgs/CheckAll';
import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import img from "assets/images/img2.jpg";
import TealPagination  from 'components/global/TealPagination';
import PageLimit   from 'components/global/PageLimit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TrashSvg   from 'assets/svgs/TrashSvg';
import { baseURL } from 'config/api';
import {customer_delete}  from 'redux/actions/customerActions';
  import { useQueryClient } from 'react-query';
import confirmBox from "utils/confirmBox";
import moment from 'moment';
import toast from 'react-hot-toast';
import DatePicker from 'components/addcustomer/customerpurchaseplan/inventoryinput/DateInput';
const CustomerTable = ({ 
  currentPage, 
  setCurrentPage,
  limit,
  setLimit
}) => {
    const { docs , pages ,docsCount, deleteLoading } = useSelector(state => state.customer);
    const {user } = useSelector((state) => state.auth);

  const dispatch=useDispatch();
const navigate=useNavigate();
    // const [selectedRows,setSelectedRows]=useState('');
  const queryClient = useQueryClient();



    const start = (currentPage - 1) * limit + 1;
const end = start + docs.length - 1;
 

  //   const handleRowSelect = (id) => {
  //   setSelectedRows((prev) =>
  //     prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
  //   );
  // };

  // const handleSelectAll = (e) => {
  //   if (e.target.checked) {
  //     setSelectedRows(docs.map((item) => item.id));
  //   } else {
  //     setSelectedRows([]);
  //   }
  // };





    const handleDelete = async (ID) => {

  if (!user?.isSuperAdmin) {
    // User is not super admin
    toast.error("You are not authorized to delete this Customer.");
    return;
  }


      
  const title = 'Confirm Deletion';
  const message = 'Are you sure you want to delete this Customer?';

  const onYesClick = async () => {
    await dispatch(customer_delete(ID));
    queryClient.invalidateQueries(["fetch-all-customer"]);
  };

  confirmBox({ title, message, onYesClick });
};

 









  return (
    <div className="w-full table-container rounded-xl  bg-white flex flex-col gap-2 pb-4">

<div className=' flex flex-col  sm:flex-row sm:justify-between  w-[95%] mx-auto '>
  <div className=' w-full sm:w-[267px]'>
  <p className="text-dark1 font-semibold">All Customers</p> 

  </div>

</div>




     


      <div className="  overflow-x-auto maintable mt-4 px-4">
      <table className="w-[100%] rounded-xl  overflow-hidden  mx-auto bg-white ">
        <thead className="text-left text-white rounded-t-xl  bg-[#1F2020] text-xs md:text-[15px]">
      <tr>
        <th className="   whitespace-nowrap text-white">
                    <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
                  </th>
   
        <th className="   whitespace-nowrap text-white">
          <div className="flex flex-row items-center text-white gap-1">No</div>
        </th>
        <th className="  whitespace-nowrap">
          <div className="flex flex-row items-center text-white gap-1">ID Code</div>
        </th>
        <th className="   whitespace-nowrap text-white">
           Customer Name
      
        </th>
        <th className="   whitespace-nowrap text-white">
                 Phone Number
        
    
        </th>
        <th className="   whitespace-nowrap text-white">
    Created BY
        
        </th>
        <th className="   whitespace-nowrap text-white">
        Location
          
        </th>
        <th className="   whitespace-nowrap text-white">Action</th>
      </tr>
    </thead>

    <tbody >
        {docs.map((row, index) => (
              <tr key={row._id}>

                 <td className="  whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] text-xs">{row.autoIncrementId}</td>
                <td className="  whitespace-nowrap font-medium text-[#1A1C1E] text-xs">{row.longAutoIncrementId}</td>
                <td className="  whitespace-nowrap font-medium text-[#1A1C1E] text-xs">
          <div className="flex items-center gap-2">
  <div className="w-[32px] h-[32px] border overflow-hidden rounded-full">
    <img
      src={row?.image ? `${baseURL}/${row.image}` : img} 
      alt="user avatar"
      className="w-full h-full object-cover"
    />
  </div>
  <span>{row?.name ?? ""}</span>
</div>

             
                </td>
                <td className="  whitespace-nowrap font-medium text-[#1A1C1E] text-xs">{row?.phoneNumber??""}</td>
                <td className="  whitespace-nowrap font-medium text-[#1A1C1E] text-xs">
                   {row?.createdBy?.username ??""}
                </td>
                <td className="  whitespace-nowrap font-medium text-[#1A1C1E] text-xs">
                      {
                  row?.countryName  && (
                <div className='  w-fit px-3  rounded-md py-1  bg-[#EDF1F3]'>
                  {row?.countryName??""}
                </div>)}
              
                </td>
               
    <div className="flex flex-row gap-1.5  justify-center  py-4  items-center ">


  {row?.status === "deleted" ? (
    <
    
      
    ></> // empty if deleted
  ) : (
    <div className="flex flex-row gap-1.5 justify-center items-center ">
      <div
        onClick={() => navigate(`/app/Customer-detail/${row._id}`)}
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-primary cursor-pointer"
      >
        <EyetSVG />
      </div>

        {user?.isSuperAdmin && (
                      <div
                        onClick={() => handleDelete(row?._id)}
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-darkred cursor-pointer"
                      >
                        <TrashSvg />
                      </div>
                    )}
    </div>
  )}


   
    </div>


              </tr>
            ))}

     
    </tbody>
  </table>
</div>


         <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full   flex-wrap-none">
         <TealPagination 

     totalPages={pages}
        currentPage={currentPage}
       setCurrentPage={setCurrentPage}
/>
                                {/* Limit Dropdown */}

                      <div className=' flex items-center justify-between sm:justify-start  gap-2'>
                  <p className="text-xs text-[#A8A8A8]">
  Showing {docsCount === 0 ? 0 : start} to {docsCount === 0 ? 0 : end} of {docsCount} entries
</p>
                             <div className="w-[140px] h-[40px] ">
                         <PageLimit totalpages={docsCount || 10} limit={limit} setLimit={setLimit} />
                            </div>
                      </div>
                            
                              
                    
                              
                              </div>


   





      
    </div>
  );
};

export default CustomerTable;


      