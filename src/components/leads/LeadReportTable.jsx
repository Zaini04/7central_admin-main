import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";
import { useNavigate } from "react-router-dom";

const LeadReportTable = ({ data, currentPage, setCurrentPage, limit, setLimit, totalCount }) => {
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(start + data.length - 1, totalCount);

  const navigate= useNavigate()






  return (
<div className="w-full table-container rounded-xl  bg-white flex flex-col gap-2 pb-4">

<div className=' flex flex-col  sm:flex-row sm:justify-between  w-[95%] mx-auto '>
  <div className=' w-full sm:w-[267px]'>
  <p className="text-dark1 font-semibold">All Lead Reports</p> 

  </div>

</div>      {/* Table Window Scrollable */}
      <div className="  overflow-x-auto maintable px-4 mt-4">       
         <table className="w-[95%]">
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
              <th className=" whitespace-nowrap">Create Date</th>
              <th className=" whitespace-nowrap">Current Stage</th>
              <th className=" whitespace-nowrap">Last Activity</th>
              <th className=" whitespace-nowrap">Next Action</th>
              <th className=" whitespace-nowrap">Results</th>
              <th className=" text-center whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((row) => (
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
                <td className="">
                  {row.date}
                </td>
                <td className="">{row.currentStage}</td>
                <td className="">{row.lastActivity}</td>
                <td className="">{row.nextAction}</td>
                <td className="">{row.result}</td>
               
                
                <td className="">
                  <div className="flex flex-row gap-2 justify-center items-center">
                  
                  
                    <button  onClick={()=>navigate(`/app/leads/timeline/${row._id}`)}
    className="w-fit px-2 py-1 rounded-md text-xs whitespace-nowrap bg-blue-700 text-white cursor-pointer"
>                     View
                    </button>
                   
                  </div>
                </td>
              </tr>
            ))}
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

export default LeadReportTable;