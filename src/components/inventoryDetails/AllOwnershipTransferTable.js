import { useState } from "react";
import CheckAllSVG from "assets/svgs/CheckAll";
import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import img from "assets/images/img2.jpg";
import Status from "components/global/Status";
import { useSelector } from "react-redux";
import moment from "moment";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";

const AllOwnershipTransferTable = ({
  currentTransferPage,
  setCurrentTransferPage,
  limitTransfer,
  setLimitTransfer
}) => {
  const { docs, pages, docsCount } = useSelector((state) => state.transfer);

 const start = (currentTransferPage - 1) * limitTransfer + 1;
const end = start + docs.length - 1;
  return (
    <div className=" bg-white rounded-xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3 pt-3">
        <p className="form-title">All Ownership Transfer</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto maintable">
        <table className="w-full text-sm md:text-[15px] bg-white">
          <thead className="text-left border-b text-gray-600">
            <tr>
          
              <th className="px-3 py-4">No</th>
              <th className="px-3 py-4">
                 Previous Owner 
               
              </th>
              <th className="px-3 py-4">
                  New Owner 
              </th>
              <th className="px-3 py-4">
                  Amount Paid
              </th>
              <th className="px-3 py-4">
                  Amount Remaining 
              </th>
              <th className="px-3 py-4">
                  Transfer Date 
              </th>
              <th className="px-3 py-4">
                  Created By 
              </th>
              <th className="px-3 py-4">
                  Status 
              </th>
            </tr>
          </thead>

          <tbody>
            {docs.map((row,index) => (
              <tr
                key={row?._id}
                className={`border-b hover:bg-gray-50 transition `}
              >
              
                <td className="px-3 py-4 whitespace-nowrap">
                    {index+1}
                </td>

                <td className="px-3 py-4 flex items-center gap-2">
                 {row?.previousBuyers?.map(b => b?.name).join(', ')
}
                </td>

                

                  <td className="px-3 py-4">
                    
                  {row?.newBuyers?.map(b => b?.name).join(', ')}

              
                  </td>
                <td className="px-3 py-4"></td>
                <td className="px-3 py-4">
                  {row?.remarks}
                </td>
                <td className="px-3 py-4">
                  {row?.transferDate  ? moment(row?.transferDate).format("DD-MM-YYYY") : "-"}
                </td>
                <td className="px-3 py-4">
                {row?.createdBy?.username ??""}                </td>
                <td className="px-3 py-4">
                    <Status  status={row?.newSale?.status}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
               <TealPagination 
      
           totalPages={pages}
              currentPage={currentTransferPage}
             setCurrentPage={setCurrentTransferPage}
      />
                               
      
                            <div className=' flex items-center justify-between sm:justify-start  gap-2'>
  <p className="text-sm sm:text-base text-[#A8A8A8]">
        
  Showing {docsCount === 0 ? 0 : start} to {docsCount === 0 ? 0 : end} of {docsCount} entries
</p>
   
                                   <div className="w-[140px] h-[40px] ">
                               <PageLimit totalpages={docsCount || 10} limit={limitTransfer} setLimit={setLimitTransfer} />
                                  </div>
                            </div>
                                  
                                    
                          
                                    
                                    </div>
    </div>
  );
};

export default AllOwnershipTransferTable;
