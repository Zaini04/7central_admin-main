import { useState } from "react";

import Status from "components/global/Status";
import EyetSVG from "assets/svgs/EyetSVG";
import CheckAllSVG from "assets/svgs/CheckAll";
import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";
import { useNavigate } from "react-router-dom";
import TrashSvg from "assets/svgs/TrashSvg";
import ReturnSvg   from 'assets/svgs/RetrunSvg';
import EditTSvg from 'assets/svgs/EditTSvg';
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import confirmBox from "utils/confirmBox";
import {deleteCustomer} from  'redux/actions/customerActions'
import { useQueryClient } from 'react-query';
import {setInventoryDocument} from 'redux/slices/inventorySlice';

import toast from 'react-hot-toast';
import NextButton from "components/global/form/NextButton";


const InventoryUplaodDocumnet = ({
  totalPages,
  totalDocs,
  currentInventoryPage,
  setCurrenInventoryPage,
  limitInventory,
  setLimitInventory,
  setVeiwDetail,
    setViewPopup,
}) => {
 const navigate=useNavigate();

     const queryClient = useQueryClient();               

 const dispatch=useDispatch();
 


    const {docInventoryDocument,docDetails } = useSelector((state) => state.inventory);

  const {user } = useSelector((state) => state.auth);


const start = (currentInventoryPage - 1) * limitInventory + 1;
const end = start + docInventoryDocument.length - 1;


//  console.log(' this is a start',start)


  function formatLabel(text = "") {
  return text
    .replace(/_/g, " ")       
    .split(" ")               
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");           
}


  const handleDeleteDocument= async (ID) => {

  if (!user?.isSuperAdmin) {
    toast.error("You are not authorized to delete this Documnet.");
    return;
  }

  const title = 'Confirm Deletion';
  const message = 'Are you sure you want to delete this Documnet?';

  const onYesClick = async () => {
    await dispatch(deleteCustomer(ID));
        queryClient.invalidateQueries(["customerDocumnet"]);
  };

  confirmBox({ title, message, onYesClick });
};


  return (
 <div className="bg-white rounded-xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col  sm:flex-row sm:justify-between w-full px-3 pt-3">
        <p className="form-title">All Inventory Documents</p>
         <button
              
              onClick={() => navigate(`/app/inventory/${docDetails._id}/newDocument`)}
              className=" "
           >
            <NextButton label="Add New Document"/>
            </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto    maintable">
        <table className="w-full text-sm md:text-[15px] bg-white">
          <thead className="text-left border-b  text-gray-600">
            <tr>
          
              <th className="px-3 py-4">
              No</th>
                    <th className="px-3 py-4">
              <div className='flex flex-row items-center gap-2'>
                    Document Name
              </div>
             </th>
              <th className="px-3 py-4">
                <div className='flex flex-row items-center gap-2'>
                      Document Type
              
                      </div>
              </th>
              <th className="px-3 py-4">
              <div className='flex flex-row items-center gap-2'>
                    Uploaded Date
              </div>
             </th>
              <th className="px-3 py-4">
                     <div className='flex flex-row items-center gap-2'>
                         Status
                  </div>
             </th>
              <th className="px-3 py-4">Action</th>
            </tr>
          </thead>

          <tbody>

  {docInventoryDocument.map((row, index) => (
              <tr key={row?._id}
              
               className={`border-b hover:bg-gray-50 transition ${
        docInventoryDocument.includes(row?._id) ? "bg-[#F0FAFF]" : ""
      }`}
              >

                <td className="px-3 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {row?.name}
                </td>

                 <td className="px-3 py-4 whitespace-nowrap">
                  {formatLabel(row?.type)}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                {row?.createdAt ? moment(row?.dueDate).format("DD-MM-YYYY") : "-"}
                </td>

                <td className="px-3 py-4 whitespace-nowrap">
                  <Status status={row?.status} />
                </td>
                <td className="px-3 py-4">
                  <div className="flex flex-row gap-1.5 items-center">
                  {row?.status ==='deleted' ?  (
                       <>

                       </>

                  ) :(
                   <div 
                   onClick={() => {
                  setViewPopup(true);
                  dispatch(setInventoryDocument(row));
                }}
                   className="w-fit px-2.5 py-2.5 rounded-lg bg-primary">
                      <EyetSVG />
                    </div>
 
                  ) }
                                     {row?.status ==='deleted' ?  (
                                       <>

                                       </>


                                     ):(
                         
                         <>
                                   {user?.isSuperAdmin && (
                                              <div
                                                onClick={() => handleDeleteDocument(row?._id)}
                                                className="w-fit px-2.5 py-2.5 rounded-lg bg-darkred cursor-pointer"
                                              >
                                                <TrashSvg />
                                              </div>
                                            )}
                         </>
                                                   
                                     )}
                 
                 
                  </div>
                </td>
              </tr>
            ))}
          
         
          </tbody>



          
        </table>

             <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
         <TealPagination 

     totalPages={totalPages}
        currentPage={currentInventoryPage}
       setCurrentPage={setCurrenInventoryPage}
/>
                                {/* Limit Dropdown */}

                      <div className=' flex items-center justify-between sm:justify-start  gap-2'>
            
<p className="text-sm text-[#A8A8A8]">
  Showing {totalDocs === 0 ? 0 : start} to {totalDocs === 0 ? 0 : end} of {totalDocs} entries
</p>
                             <div className="w-[140px] h-[40px] ">
                         <PageLimit totalpages={totalDocs || 10} limit={limitInventory} setLimit={setLimitInventory} />
                            </div>
                      </div>
                            
                              
                    
                              
                              </div>
      </div>

    

</div>
  )
}

export default InventoryUplaodDocumnet;