import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Status from "components/global/Status";
import EyetSVG from "assets/svgs/EyetSVG";
import EditTSvg from "assets/svgs/EditTSvg";
// import CheckAllSVG from "assets/svgs/CheckAll";
// import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
// import TrashSvg from "assets/svgs/TrashSvg";
import moment from "moment";
// import img from "assets/images/img2.jpg";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";
import {setPaymentId} from 'redux/slices/paymentReceiptSlice'
import { useNavigate } from "react-router-dom";
import { IoShareSocial } from "react-icons/io5";



const PaymentTable = ({ currentPage, setCurrentPage, limit, setLimit,setVerify }) => {

  const { docs, pages, docsCount } = useSelector((state) => state.paymentReceipt);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  


function formatLabel(text = "") {
  return text
    .replace(/_/g, " ")       
    .split(" ")               
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");           
}


 const start = (currentPage - 1) * limit + 1;
const end = start + docs.length - 1;

  return (
    <div className="w-full table-container bg-white flex flex-col gap-2 pb-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3">
        <p className="text-dark1 font-semibold">All Payment Receipt</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto maintable">
        <table className="w-full bg-white">
          <thead className="text-left text-sm md:text-[15px]">
            <tr>
              <th className="px-3 py-4 whitespace-nowrap">No</th>
              <th className="px-3 py-4 whitespace-nowrap">Receipt No</th>
              <th className="px-3 py-4 whitespace-nowrap">Customer Name</th>
              <th className="px-3 py-4 whitespace-nowrap">Inventory No.</th>
              <th className="px-3 py-4 whitespace-nowrap">Installment</th>
              <th className="px-3 py-4 whitespace-nowrap">Receipt Amount</th>
              <th className="px-3 py-4 whitespace-nowrap">Method</th>
              <th className="px-3 py-4 whitespace-nowrap">Created By</th>
              <th className="px-3 py-4 whitespace-nowrap">Verified By</th>
              <th className="px-3 py-4 whitespace-nowrap">Status</th>
              <th className="px-3 py-4 whitespace-nowrap">Paid Date</th>
              <th className="px-3 py-4 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody>
            {docs?.map((row, index) => (
              <tr key={row?._id}>
                <td className="px-3 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-3 py-4 whitespace-nowrap">{row?.receiptNo}</td>

                <td className="px-3 py-4 whitespace-nowrap">
                                    {row?.sale?.buyers?.map(b => b?.name).join(', ')}

                {/* {row?.sale?.buyers[0]?.name} */}
                </td>

                <td
              className="px-3 py-4 whitespace-nowrap capitalize cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
              onClick={() => navigate(`/app/inventory/${row?.inventory?._id}`)}
            >
              {row?.inventory?.fullNumber}
            </td>
                <td className="px-3 py-4 whitespace-nowrap capitalize">
              {row?.installment?.type}
                </td>
                <td className="px-3 py-4 whitespace-nowrap  text-center">
                   {row?.totalAmount}
                </td>
               <td className="px-3 py-4 whitespace-nowrap">
  {row?.parts?.map(p => formatLabel(p.method)).join(', ')}
</td>
                 <td className="px-3 py-4 whitespace-nowrap">
                  {row?.createdBy?.username ??""}              
                     </td>
                 <td className="px-3 py-4 whitespace-nowrap">
                  {row?.verifiedBy?.username ??""}              
                     </td>
                <td className="px-3 py-4 whitespace-nowrap">
                <Status  status={row?.status}/>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                                      {row?.paidAt ? moment(row?.paidAt).format("DD-MMM-YYYY") : "-"}

                </td>

                <td className="px-3 py-4">

          
              <div className="flex flex-row gap-1.5 items-center">
 {row?.status === "approved" && (
  <button
    onClick={() => {
      setVerify(true);
      dispatch(setPaymentId(row?._id));
    }}
    className="flex items-center gap-2 w-fit px-2.5 py-2.5 rounded-lg bg-secondary text-white font-medium"
  >
    <IoShareSocial size={18} />
  </button>
)}





{row?.status === "approved" && (
  <div
      onClick={() => navigate(`/app/payment/${row?._id}/reserved`)}

    className="w-fit px-2.5 py-2.5 rounded-lg text-xs whitespace-nowrap bg-primary text-white cursor-pointer"
  >
    Payment Reserved
  </div>
)}


 {row?.status === "pending" && (

  <div
    onClick={() => navigate(`/app/payment/${row?._id}/verify`)}
    className="w-fit px-2.5 py-2.5 rounded-lg  text-xs  whitespace-nowrap  bg-primary text-white cursor-pointer"
  >
     Payment Verify
  </div>
 )
 }
  <div
    onClick={() => navigate(`/app/payment/${row?._id}`)}
    className="w-fit px-2.5 py-2.5 rounded-lg   bg-primary text-white cursor-pointer"
  >
    <EyetSVG />
  </div>
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

export default PaymentTable;
