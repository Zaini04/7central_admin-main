import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";
import TrashSvg from "assets/svgs/TrashSvg";
import EditSvg from "assets/svg/home/home/EditSvg";
import EditTSvg from "assets/svgs/EditTSvg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LeadsTable = ({ data, currentPage, setCurrentPage, limit, setLimit, totalCount,setCallModal,setCallData,setScheduleModal,setScheduleData }) => {
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(start + data.length - 1, totalCount);

  const navigate= useNavigate()

  const handleCall = (row)=>{
    setCallModal(true)
    setCallData(row)
    
  }
  const handleSchedule = (row)=>{
    setScheduleModal(true)
    setScheduleData(row)
    
  }




  return (
    <div className="w-full flex flex-col gap-4">
      {/* Table Window Scrollable */}
      <div className="overflow-x-auto w-full  rounded-lg">
        <table className="">
          <thead className="">
            <tr>
              <th className="   whitespace-nowrap text-white">
              <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
              </th>
              <th className=" whitespace-nowrap">No</th>
              <th className=" whitespace-nowrap">Lead Name</th>
              <th className=" whitespace-nowrap">Phone Number</th>
              <th className=" whitespace-nowrap">Lead Source</th>
              <th className=" whitespace-nowrap">Campaign</th>
              <th className=" whitespace-nowrap">Dealer Type</th>
              <th className=" whitespace-nowrap">Dealer Name</th>
              <th className=" whitespace-nowrap">Assigned</th>
              <th className=" whitespace-nowrap">Create Date</th>
              <th className=" text-center whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">

{
  data.length <= 0 ? (
    <tr>
                <td colSpan="11" className="py-8 text-center">
                  <span className="text-gray-500 text-xs font-medium block">
                    No Records Found
                  </span>
                </td>
              </tr>
  )
  :
data.map((row) => (
              <tr key={row._id} 
                // onClick={() => navigate(`/app/leads/timeline/${row._id}`)}
                               className="hover:bg-gray-50 transition-colors">
                 <td className="  whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
                <td className="">{row.no}</td>
                <td className="">
                  <div className="flex items-center gap-2">
                    {/* Placeholder for standard fallback user profile icon */}
                    <div className="w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center text-xs text-amber-800 font-bold overflow-hidden">
                      {row.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{row.name}</span>
                  </div>
                </td>
                <td className="">{row.phone}</td>
                <td className="">{row.source}</td>
                <td className="">{row.campaign}</td>
                <td className="">{row.dealerType}</td>
                <td className="">{row.dealerName}</td>
                <td className="">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-[10px] text-blue-700 font-bold">
                      {row.assigned.charAt(0)}
                    </div>
                    <span className="">{row.assigned}</span>
                  </div>
                </td>
                <td className="">
                  {row.date}
                </td>
                <td className="">
                  <div className="flex flex-row gap-2 justify-center items-center">
                    {/* Edit Icon Button */}
                    <button 
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-md text-white bg-blue-600 cursor-pointer"
                    >
                        <EditTSvg/>
                    </button>
                    {row.status === "Successful" ? (
  <button
    onClick={() => navigate(`/app/Customer/general`)}
    className="w-fit px-2 py-1 rounded-md text-xs whitespace-nowrap bg-purple-700 text-white cursor-pointer"
  >
    Add Customer
  </button>
) : (
  <button
    onClick={() => handleCall(row)}
    className="w-fit px-2 py-1 rounded-md text-xs whitespace-nowrap bg-green-700 text-white cursor-pointer"
  >
    Mark Response
  </button>
)}
                   
                    {/* <button  onClick={()=>handleSchedule(row)}
    className="w-fit px-2 py-1 rounded-md text-xs whitespace-nowrap bg-orange-700 text-white cursor-pointer"
>                     Schedule
                    </button> */}
                    <button  onClick={()=>navigate(`/app/leads/timeline/${row._id}`)}
    className="w-fit px-2 py-1 rounded-md text-xs whitespace-nowrap bg-blue-700 text-white cursor-pointer"
>                     View
                    </button>
                    <button 
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-darkred cursor-pointer"
>                     <TrashSvg/>
                    </button>
                  </div>
                </td>
              </tr>
            ))
}

            
          </tbody>
        </table>
      </div>

      {/* Bottom Entries Count and Pagination Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
        
         <TealPagination
          totalPages={Math.ceil(totalCount / limit)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
       
                            <div className=' flex items-center justify-between sm:justify-start  gap-2'>
  <p className="text-sm sm:text-base text-[#A8A8A8]">
            Showing {start} to {end} of {totalCount} entries
          </p>
                                   <div className="w-[140px] h-[40px] ">
            <PageLimit totalpages={totalCount} limit={limit} setLimit={setLimit} />
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default LeadsTable;