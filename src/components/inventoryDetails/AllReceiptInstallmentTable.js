import { useState } from "react";

import Status from "components/global/Status";
// import EyetSVG from "assets/svgs/EyetSVG";
// import EditTSvg from "assets/svgs/EditTSvg";
// import CheckAllSVG from "assets/svgs/CheckAll";
// import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";
import { useNavigate } from "react-router-dom";
// import TrashSvg  from 'assets/svgs/TrashSvg'
import { useSelector } from "react-redux";
import moment from "moment";

const AllReceiptInstallmentTable = ({
  currentPaymentPage,
  setCurrentPaymentPage,
  limitPayment,
  setLimitPayment,

}) => {

  const navigate=useNavigate();

  const { docs, pages, docsCount } = useSelector((state) => state.paymentReceipt);



   function formatLabel(text = "") {
  return text
    .replace(/_/g, " ")       
    .split(" ")               
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");           
}





 const start = (currentPaymentPage - 1) * limitPayment + 1;
const end = start + docs.length - 1;
  return (
      <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3 pt-3">
        <p className="form-title">All Receipt</p>


      </div>

      {/* Table */}
      <div className="overflow-x-auto maintable">
        <table className="w-full text-sm md:text-[15px] bg-white">
          <thead className="text-left border-b  text-gray-600">
            <tr>
              {/* <th className="px-6 py-4 whitespace-nowrap">
                <label className="relative inline-block w-[16px] h-[16px]">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === tableData.length &&
                      tableData.length > 0
                    }
                    onChange={handleSelectAll}
                    className="peer appearance-none w-full h-full border border-gray3 rounded-[5px] checked:border-gray-800 cursor-pointer"
                  />
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                    <CheckAllSVG className="w-4 h-4 text-primary" />
                  </span>
                </label>
              </th> */}
                <th className="px-3 py-4 whitespace-nowrap">No</th>
              <th className="px-3 py-4 whitespace-nowrap">Receipt No</th>
              <th className="px-3 py-4 whitespace-nowrap">Installment</th>
              <th className="px-3 py-4 whitespace-nowrap">Receipt Amount</th>
              <th className="px-3 py-4 whitespace-nowrap">Method</th>
              <th className="px-3 py-4 whitespace-nowrap">Status</th>
              <th className="px-3 py-4 whitespace-nowrap">Paid Date</th>
              <th className="px-3 py-4 whitespace-nowrap">Created By</th>
        
            </tr>
          </thead>

          <tbody>
            {docs.map((row, index) => (
              <tr
                key={row?._id}
                className={`border-b hover:bg-gray-50 transition`}
              >
                <td className="px-3 py-4">{index+1}</td>
                <td className="px-3 py-4">{row?.receiptNo}</td>
                <td className="px-3 py-4  capitalize">  {row?.installment?.type}</td>
                <td className="px-3 py-4"> {row?.totalAmount}</td>
                <td className="px-3 py-4">
                     {formatLabel(row?.parts?.[0].method)}
                </td>
                <td className="px-3 py-4">
                 <Status  status={row?.status}/>
                </td>
                    <td className="px-3 py-4">
                                                            {row?.paidAt ? moment(row?.dueDate).format("DD-MM-YYYY") : "-"}
                      
                </td>
                    <td className="px-3 py-4">
{row?.createdBy?.username ??""}                      
                </td>
          
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer (Pagination + Limit) */}
     {/* Pagination */}
     <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
               <TealPagination 
      
           totalPages={pages}
              currentPage={currentPaymentPage}
             setCurrentPage={setCurrentPaymentPage}
      />
                                      {/* Limit Dropdown */}
      
                            <div className=' flex items-center justify-between sm:justify-start  gap-2'>
  <p className="text-sm sm:text-base text-[#A8A8A8]">
        
  Showing {docsCount === 0 ? 0 : start} to {docsCount === 0 ? 0 : end} of {docsCount} entries
</p>
   
                                   <div className="w-[140px] h-[40px] ">
                               <PageLimit totalpages={docsCount || 10} limit={limitPayment} setLimit={setLimitPayment} />
                                  </div>
                            </div>
                                  
                                    
                          
                                    
                                    </div>

</>


  );
};

export default AllReceiptInstallmentTable;
