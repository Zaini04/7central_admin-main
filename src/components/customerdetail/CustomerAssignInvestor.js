import { useState } from "react";
import Status from "components/global/Status";
import EyetSVG from "assets/svgs/EyetSVG";
import EditTSvg from "assets/svgs/EditTSvg";
import CheckAllSVG from "assets/svgs/CheckAll";
import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";
import TrashSvg  from 'assets/svgs/TrashSvg'
import ReturnSvg   from 'assets/svgs/RetrunSvg';
import { useSelector } from "react-redux";



const CustomerAssignInvestor = ({
  currentInventoriesPage ,
  setCurrentInventoriesPage ,
  limitInventories,
  setLimitInventories,
      totalInventoriesPages,
              totalInventoriesDocs,
}) => {


const {customerInventories} = useSelector(state => state.customer);


// console.log(' this is a  customerInventories',customerInventories)


const start = (currentInventoriesPage - 1) * limitInventories + 1;
const end = start + customerInventories.length - 1;


  return (
 <div className="bg-white rounded-xl flex flex-col gap-5">


          {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3 pt-3">
                <p className="form-title">All Assigned Inventories</p>
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
                      <th className="px-3 py-4">
                      No
                      </th>
                            <th className="px-3 py-4">
                      <div className='flex flex-row items-center gap-2'>
                            Type
                                 {/* <ArrowDownSvg/> */}
                      </div>
                     </th>
               
                      <th className="px-3 py-4">
                      <div className='flex flex-row items-center gap-2'>
                           Plot No.
                                 {/* <ArrowDownSvg/> */}
                      </div>
                     </th>
                      <th className="px-3 py-4">
                             <div className='flex flex-row items-center gap-2'>
                                 Number
                         {/* <ArrowDownSvg/>  */}
                          </div>
                     </th>
                        <th className="px-3 py-4">
                             <div className='flex flex-row items-center gap-2'>
                               Full Number
                         {/* <ArrowDownSvg/>  */}
                          </div>
                     </th>
                     
                      <th className="px-3 py-4">
                         <div className='flex flex-row items-center gap-2'>
                          Plot Size
                         {/* <ArrowDownSvg/>  */}
          
                      </div>
                      </th>

                       
                      <th className="px-3 py-4">
                         <div className='flex flex-row items-center gap-2'>
                           Significance
                         {/* <ArrowDownSvg/>  */}
          
                      </div>
                      </th>


                       <th className="px-3 py-4">
                         <div className='flex flex-row items-center gap-2'>
                           Status
                         {/* <ArrowDownSvg/>  */}
          
                      </div>
                      </th>

                     
            
        
    
                    </tr>
                  </thead>
        
               <tbody>
  {customerInventories.map((row,index) => (
    <tr
      key={row.id}
      className={`border-b hover:bg-gray-50 transition ${
        customerInventories.includes(row?._id) ? "bg-[#F0FAFF]" : ""
      }`}
    >
  

      <td className="px-3 py-4 whitespace-nowrap">{index+1}</td>
      <td className="px-3 py-4 whitespace-nowrap  capitalize">{row?.inventory?.type}</td>
      <td className="px-3 py-4 whitespace-nowrap">{row?.inventory?.plotNumber}</td>
      <td className="px-3 py-4 whitespace-nowrap">{row?.inventory?.number}</td>
      <td className="px-3 py-4 whitespace-nowrap">{row?.inventory?.fullNumber}</td>
      <td className="px-3 py-4 whitespace-nowrap">{row?.inventory?.significance}</td>
      <td className="px-3 py-4   whitespace-nowrap"> {row?.inventory?.approximateSize} </td>

      <td className="px-3 py-4">
     
        <Status status={row.status}/>  
    
      </td>

  
    </tr>
  ))}
</tbody> 

                </table>
              </div>
          ,
              ,
              {/* Footer (Pagination + Limit) */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
         <TealPagination 

     totalPages={totalInventoriesPages}
        currentPage={currentInventoriesPage}
       setCurrentPage={setCurrentInventoriesPage}
/>
                                {/* Limit Dropdown */}

                      <div className=' flex items-center justify-between sm:justify-start  gap-2'>
            
              
  <p className="text-sm text-[#A8A8A8]">
    Showing {totalInventoriesDocs === 0 ? 0 : start} to {totalInventoriesDocs === 0 ? 0 : end} of {totalInventoriesDocs} entries
  </p>
                             <div className="w-[140px] h-[40px] ">
                         <PageLimit totalpages={totalInventoriesDocs || 10} limit={limitInventories} setLimit={setLimitInventories} />
                            </div>
                      </div>
                            
                              
                    
                              
                              </div>
    </div>
  )
}

export default CustomerAssignInvestor