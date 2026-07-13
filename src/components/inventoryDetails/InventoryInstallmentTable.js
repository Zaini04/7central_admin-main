import { useState,useEffect} from "react";

import Status from "components/global/Status";
import EyetSVG from "assets/svgs/EyetSVG";
import EditTSvg from "assets/svgs/EditTSvg";
import CheckAllSVG from "assets/svgs/CheckAll";
import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";
import { useNavigate } from "react-router-dom";
import TrashSvg  from 'assets/svgs/TrashSvg'
import { useSelector } from "react-redux";
import moment from "moment";
import ExportButton from "components/global/exportbutton/ExportButton";
import Axios from "config/api";
import { useParams } from "react-router-dom";


const InventoryInstallmentTable = ({
  currentInstallmentPage,
  setCurrentInstallmentPage,
  limitInstallment,
  setLimitInstallment,
  
  
}) => {

  const navigate=useNavigate();
  const {id}=useParams();

const [storeData, setStoreData] = useState([]); 
 const { docs , pages ,docsCount, } = useSelector(state => state.installment);

  const {docDetails } = useSelector((state) => state.inventory);

      
 const start = (currentInstallmentPage - 1) * limitInstallment + 1;
const end = start + docs.length - 1;
function formatLabel(text = "") {
  return text
    .replace(/_/g, " ")       
    .split(" ")               
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");           
}




useEffect(() => {
  async function fetchInstallments() {
    try {
      const res = await Axios.get(
        `/sale/get-all-installments?inventory=${id}&pageSize=${docsCount}&page=1`
      );
      
      console.log("res", res);
      
     setStoreData(res.data.data.docs);
      
    } catch (error) {
      console.error("Error fetching installments", error);
    }
  }

  fetchInstallments();
}, [id, docsCount,]);
  return (
      <>
      {/* Header */}
      <div className="flex flex-col bg-white rounded-xl gap-5 sm:flex-row sm:justify-between w-full px-3 pt-3">
        <p className="form-title">Installments Plan</p>
       


<ExportButton
  title="Inventory Installments"
  tableData={storeData?.map((item, index) => ({
    No: index + 1,
    "Inventory": item?.inventory?.fullNumber || "-",
    "Installment Type": formatLabel(item?.type) || "-",
    "Payment Type": formatLabel(item?.sale?.paymentType) || "-",
    "Total Payment": item?.amount || 0,
    "Paid Payment": item?.paidAmount || 0,
    "Remaining Amount": (item?.amount || 0) - (item?.paidAmount || 0),
    "Due Date": item?.dueDate ? moment(item?.dueDate).format("DD-MM-YYYY") : "-",
    "Created By": item?.createdBy?.username || "-",
  })) || []}
  columns={[
    "No",
    "Inventory",
    "Installment Type",
    "Payment Type",
    "Total Payment",
    "Paid Payment",
    "Remaining Amount",
    "Due Date",
    "Created By",
  ]}
  fileName="Inventory Installments"
  bgcolor="bg-primary"
  textColor="text-white"
   docDetails={docDetails} 
/>


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
              No</th>
             
              <th className="px-3 py-4">
        
                     Inventory
                 
     
             </th> 
              <th className="px-3 py-4">
        
                     Installment Type
                 
     
             </th> 
              <th className="px-3 py-4">
                          Payment  Type
          
             </th>
          



               <th className="px-3 py-4 whitespace-nowrap">
                  Total Payment
                </th>

                <th className="px-3 py-4 whitespace-nowrap">
                    Paid  Payment
                </th>

                  <th className="px-3 py-4 whitespace-nowrap">
                    Remaining Amount
                
                </th>
              <th className="px-3 py-4">
           
                       Due Date
        
              </th>
              <th className="px-3 py-4">
          
              Created By
     
       
              </th>
              <th className="px-3 py-4">
          
              Status
     
       
              </th>

                   <th className="px-3 py-4 whitespace-nowrap">Action</th>

            </tr>
          </thead>

          <tbody>
            {docs.map((row, index) => (

              <tr
                onClick={() => {
                  if(row.status !=='paid'){
                navigate(`/app/installments/${row?._id}`)
                  }
                 }}

                key={row?._id}
                className={`border-b hover:bg-gray-50 transition `}
              >
            
                <td className="px-3 py-4">
                  {index+1}
                </td>
                <td className="px-3 py-4 capitalize">
                    {row?.inventory?.fullNumber}
                </td>
                <td className="px-3 py-4 capitalize">
                    {row?.type}
                </td>
                <td className="px-3 py-4">
       {formatLabel(row?.sale?.paymentType)}
                </td>
                <td className="px-3 py-4">
        {row?.amount}
                </td>
                    <td className="px-3 py-4">
        {row?.paidAmount}
                </td>
                    <td className="px-3 py-4">
        {row?.amount-row?.paidAmount}
                </td>
        <td className="px-3 py-4">
          {row?.dueDate ? moment(row?.dueDate).format("DD-MM-YYYY") : "-"}
                </td>
        <td className="px-3 py-4">
{row?.createdBy?.username ??""}                </td>
                <td className="px-3 py-4">
                  <Status status={row?.status} />
                </td>
                               <td className="px-3 py-4">
{
  row?.status ==='paid' ?
  (
  <></>

  ):(
  <div className="flex flex-row gap-1.5 items-center">
    <button
      className="w-fit px-4 py-1 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 transition"
    >
      Pay
    </button>
  </div>)
}


</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer (Pagination + Limit) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
               <TealPagination 
      
           totalPages={pages}
              currentPage={currentInstallmentPage}
             setCurrentPage={setCurrentInstallmentPage}
      />
                                      {/* Limit Dropdown */}
      
                            <div className=' flex items-center justify-between sm:justify-start  gap-2'>
  <p className="text-sm sm:text-base text-[#A8A8A8]">
        
  Showing {docsCount === 0 ? 0 : start} to {docsCount === 0 ? 0 : end} of {docsCount} entries
</p>
   
                                   <div className="w-[140px] h-[40px] ">
                               <PageLimit totalpages={docsCount || 10} limit={limitInstallment} setLimit={setLimitInstallment} />
                                  </div>
                            </div>
                                  
                                    
                          
                                    
                                    </div>

</>


  );
};

export default InventoryInstallmentTable;
