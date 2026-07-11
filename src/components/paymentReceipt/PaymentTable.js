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
      <div className="flex flex-col sm:flex-row sm:justify-between w-full ">
        <p className="text-dark1 font-semibold px-4">All Payment Receipt</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto maintable mt-4 px-4">
        <table className="w-full bg-white">
          <thead className="text-left text-sm md:text-[15px]">
            <tr>
              <th className="   whitespace-nowrap text-white">
              <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
              </th>
              <th className="  whitespace-nowrap">No</th>
              <th className="  whitespace-nowrap">Receipt No</th>
              <th className="  whitespace-nowrap">Customer Name</th>
              <th className="  whitespace-nowrap">Inventory No.</th>
              <th className="  whitespace-nowrap">Installment</th>
              <th className="  whitespace-nowrap">Receipt Amount</th>
              <th className="  whitespace-nowrap">Method</th>
              <th className="  whitespace-nowrap">Created By</th>
              <th className="  whitespace-nowrap">Verified By</th>
              <th className="  whitespace-nowrap">Status</th>
              <th className="  whitespace-nowrap">Paid Date</th>
              <th className="  whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody>
            {docs?.map((row, index) => (
              <tr key={row?._id}>
                 <td className="  whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
                <td className="  whitespace-nowrap">{index + 1}</td>
                <td className="  whitespace-nowrap">{row?.receiptNo}</td>

                <td className="  whitespace-nowrap">
                                    {row?.sale?.buyers?.map(b => b?.name).join(', ')}

                {/* {row?.sale?.buyers[0]?.name} */}
                </td>

                <td
              className="  whitespace-nowrap capitalize cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
              onClick={() => navigate(`/app/inventory/${row?.inventory?._id}`)}
            >
              {row?.inventory?.fullNumber}
            </td>
                <td className="  whitespace-nowrap capitalize">
              {row?.installment?.type}
                </td>
                <td className="  whitespace-nowrap  text-center">
                   {row?.totalAmount}
                </td>
               <td className="  whitespace-nowrap">
  {row?.parts?.map(p => formatLabel(p.method)).join(', ')}
</td>
                 <td className="  whitespace-nowrap">
                  {row?.createdBy?.username ??""}              
                     </td>
                 <td className="  whitespace-nowrap">
                  {row?.verifiedBy?.username ??""}              
                     </td>
                <td className="  whitespace-nowrap">
                <Status  status={row?.status}/>
                </td>
                <td className="  whitespace-nowrap">
                                      {row?.paidAt ? moment(row?.paidAt).format("DD-MMM-YYYY") : "-"}

                </td>

                <td className=" ">

          
              <div className="flex flex-row gap-1.5 items-center">
 {row?.status === "approved" && (
  <button
    onClick={() => {
      setVerify(true);
      dispatch(setPaymentId(row?._id));
    }}
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-secondary cursor-pointer"
  >
    <IoShareSocial size={18} />
  </button>
)}



  <div
    onClick={() => navigate(`/app/payment/${row?._id}`)}
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-primary cursor-pointer"
  >
    <EyetSVG />
  </div>


{row?.status === "approved" && (
  <div
      onClick={() => navigate(`/app/payment/${row?._id}/reserved`)}

    className="w-fit px-2 py-1 rounded-md text-xs whitespace-nowrap bg-primary text-white cursor-pointer"
  >
    Payment Reserved
  </div>
)}


 {row?.status === "pending" && (

  <div
    onClick={() => navigate(`/app/payment/${row?._id}/verify`)}
    className="w-fit px-2 py-1 rounded-md  text-xs  whitespace-nowrap  bg-primary text-white cursor-pointer"
  >
     Payment Verify
  </div>
 )
 }
</div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
     <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full   flex-wrap-none">
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
