import { useState } from "react";
// import Status from "components/global/Status";
// import EyetSVG from "assets/svgs/EyetSVG";
// import EditTSvg from "assets/svgs/EditTSvg";
// import CheckAllSVG from "assets/svgs/CheckAll";
// import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
// import img from "assets/images/img2.jpg";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";
// import TrashSvg from "assets/svgs/TrashSvg";
import moment from "moment";
import {mark_Provisionalreceipt}  from  'redux/actions/provisionalReceiptActions'
import { useDispatch,useSelector } from "react-redux";
import { useQueryClient } from 'react-query';
import { PulseLoader } from "react-spinners";
import {setProvisionalId,setProvisionalData}   from  'redux/slices/provisionalReceiptSlice'; 
import EyetSVG from 'assets/svgs/EyetSVG';
import Status from "components/global/Status";



const AllPRInstallmentTable = ({ currentPage, setCurrentPage, limit, setLimit,setAddBounce,setProvisionalDetail }) => {


   const { docs , pages ,docsCount,patchLoading } = useSelector((state) => state.provisionalReceipt);
const dispatch=useDispatch();
 
  const queryClient = useQueryClient(); 
  const [loadingId, setLoadingId] = useState(null);

  const start = (currentPage - 1) * limit + 1;
const end = start + docs.length - 1;




const handleClear = async (id) => {
  setLoadingId(id); 
  await dispatch(mark_Provisionalreceipt(id));
  await queryClient.invalidateQueries(["fetch-all-ProvisionalReceipt"]);
  setLoadingId(null); 
};

function formatLabel(text = "") {
  return text
    .replace(/_/g, " ")       
    .split(" ")               
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");           
}


  return (
    <div className="w-full table-container bg-white flex flex-col gap-2 pb-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3">
        <p className="text-dark1 font-semibold">All Provisional Receipt</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto maintable">
        <table className="w-full bg-white">
          <thead className="text-left text-sm md:text-[15px]">
            <tr>
             
              <th className="px-3 py-4 whitespace-nowrap">No</th>
              <th className="px-3 py-4 whitespace-nowrap">Inventory ID</th>
              <th className="px-3 py-4 whitespace-nowrap">
                Bank Name 
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                  Cheque No
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                  Amount
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                Cheque  Date
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                Created  By
              </th>
                <th className="px-3 py-4 whitespace-nowrap">
               Status
              </th>
          
              <th className="px-3 py-4 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((row, index) => (
              <tr key={row?._id}>
             

                <td className="px-3 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-3 py-4 whitespace-nowrap">{row?.inventory?.fullNumber}</td>
      
                <td className="px-3 py-4 whitespace-nowrap">{row?.bankName}</td>
                <td className="px-3 py-4 whitespace-nowrap">{row?.chequeNo}</td>
                <td className="px-3 py-4 whitespace-nowrap">{row?.amount}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                {row?.chequeDate ? moment(row?.dueDate).format("DD-MM-YYYY") : "-"}
              
            </td>
                <td className="px-3 py-4 whitespace-nowrap">
            {row?.createdBy?.username ??""}              
            </td>
               <td className="px-3 py-4 whitespace-nowrap">
                   <Status status={row?.status} />
                     {/* {formatLabel(row?.status)} */}
              
            </td>

                <td className="px-2.5 py-2.5">
                 <div className="flex flex-row gap-1.5 items-center">
                            <div
                onClick={() => {
                  setProvisionalDetail(true);
                  dispatch(setProvisionalData(row));
                }}
                className="w-fit px-2.5 py-2.5 rounded-lg bg-primary text-white"
              >
                <EyetSVG />
              </div>


 
 {row?.status === "pending_clearance" && (
  (
    <div className="flex flex-row gap-1.5 items-center">
     <button
  onClick={() => {
    setAddBounce(true);
    dispatch(setProvisionalId(row?._id));
  }}
  className="w-fit px-3 py-2 rounded-lg bg-orange-500 text-white text-sm"
>
  Dishonore
</button>
 <button 
    onClick={() => handleClear(row?._id)}
    className="w-fit px-3 py-2 rounded-lg bg-blue-500 text-white text-sm"
  >
    {loadingId === row?._id ? (
      <PulseLoader size={8} color="white" />
    ) : (
      "Clear"
    )}
  </button>
      </div>
 
))}


 

  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
               <TealPagination 
      
           totalPages={pages}
              currentPage={currentPage}
             setCurrentPage={setCurrentPage}
      />
                                      {/* Limit Dropdown */}
      
                            <div className=' flex items-center justify-between sm:justify-start  gap-2'>
  <p className="text-sm sm:text-base text-[#A8A8A8]">
        
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

export default AllPRInstallmentTable;
