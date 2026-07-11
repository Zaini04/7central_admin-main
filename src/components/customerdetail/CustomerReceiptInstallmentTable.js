import { useState } from "react";

import Status from "components/global/Status";
import EyetSVG from "assets/svgs/EyetSVG";
import EditTSvg from "assets/svgs/EditTSvg";
import CheckAllSVG from "assets/svgs/CheckAll";
import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";
import { useNavigate } from "react-router-dom";
import TrashSvg  from 'assets/svgs/TrashSvg'
import ReturnSvg   from 'assets/svgs/RetrunSvg';
import { useSelector } from "react-redux";
import moment from "moment";
import {setCustomerReceiptsDetail} from 'redux/slices/customerSlice';
import { useDispatch } from "react-redux";


const CustomerReceiptInstallmentTable = ({
  currentReceiptsPage,
  setCurrentReceiptsPage,
  totalReceiptDocs,
  totalReceiptPages,
  limitReceipts,
  setLimitReceipts,
  setReciptDetail,
}) => {


  const navigate=useNavigate();
const { customerReceipts} = useSelector(state => state.customer);
const dispatch=useDispatch();
  const start = (currentReceiptsPage - 1) * limitReceipts + 1;
const end = start + customerReceipts.length - 1;

  return (
 <div className="bg-white rounded-xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3 pt-3">
        <p className="form-title">All Receipt</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4    maintable ">
      <table className="w-[95%] rounded-xl  overflow-hidden border-gray-200 mx-auto bg-white ">
        <thead className="text-left text-white rounded-t-xl  bg-[#1F2020] text-xs md:text-[15px]">
      <tr>
        <th className="px-3  py-4 whitespace-nowrap text-white">
                    <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
                  </th>

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
              <th className="px-3 py-4 text-white">
              No</th>

                 <th className="px-3 py-4 text-white">
                 <div className='flex flex-row items-center gap-2'>
                    Receipt No
              </div>
            
             </th>
                
                <th className="px-3 py-4 text-white">

                  
              <div className='flex flex-row items-center gap-2 text-white'>
                    Receipt Amount
              </div>
             </th>

             
         
              <th className="px-3 py-4 text-white">
                     <div className='flex flex-row items-center gap-2 text-white'>
                          Paid By
                  </div>
             </th>
                <th className="px-3 py-4 text-white">
                     <div className='flex flex-row items-center gap-2 text-white'>
                        Receipt Status
                  </div>
             </th>
             
              <th className="px-3 py-4 text-white">
                 <div className='flex flex-row items-center gap-2 text-white'>
                     Paid Date
  
              </div>
              </th>
    

              <th className="px-3 py-4 text-white">Action</th>
            </tr>
          </thead>

          <tbody>
            {customerReceipts.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b hover:bg-gray-50 transition ${
                  customerReceipts.includes(row?._id) ? "bg-[#F0FAFF]" : ""
                }`}
              >
                 <td className="px-3 py-4 whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
          
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">{index+1}</td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">{row?.receiptNo}</td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">{row?.totalAmount}</td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">{row?.sale?.buyers?.[0]?.name}</td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
               <Status   status={row.status}/>
                </td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                                {row?.paidAt ? moment(row?.paidAt).format("DD-MM-YYYY") : "-"}
                
                  </td>
                   
                <td className="px-3 py-4  whitespace-nowrap font-medium text-dark1 text-xs">
                  <div className="flex flex-row gap-1.5 items-center">
                                <div 
                                      onClick={() => {
                                                  setReciptDetail(true);
                                                  dispatch(setCustomerReceiptsDetail(row));
                                                }} 

                  className="px-2.5 py-2.5 rounded-lg bg-primary cursor-pointer"
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

     <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
         <TealPagination 

     totalPages={totalReceiptPages}
        currentPage={currentReceiptsPage}
       setCurrentPage={setCurrentReceiptsPage}
/>
                                

                      <div className=' flex items-center justify-between sm:justify-start  gap-2'>
            
              
  <p className="text-sm text-[#A8A8A8]">
    Showing {totalReceiptDocs === 0 ? 0 : start} to {totalReceiptDocs === 0 ? 0 : end} of {totalReceiptDocs} entries
  </p>
                             <div className="w-[140px] h-[40px] ">
                         <PageLimit totalpages={totalReceiptDocs || 10} limit={limitReceipts} setLimit={setLimitReceipts} />
                            </div>
                      </div>
                            
                              
                    
                              
                              </div>

</div>


  );
};

export default CustomerReceiptInstallmentTable;
