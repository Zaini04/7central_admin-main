import { useState,useEffect } from "react";
import Status from "components/global/Status";
import EyetSVG from "assets/svgs/EyetSVG";
import CheckAllSVG from "assets/svgs/CheckAll";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import Axios from "config/api";
import { useParams } from "react-router-dom";


const InstallmentsTable = ({
  currentPage,
  setCurrentPage,
  limit,
  setLimit
}) => {

  const navigate=useNavigate();


  const {id}=useParams();
    const { docs , pages ,docsCount, } = useSelector(state => state.installment);
const [storeData, setStoreData] = useState([]); 

  console.log('storeData  oijaenri',storeData);


function formatLabel(text = "") {
  return text
    .replace(/_/g, " ")       
    .split(" ")               
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");           
}

const start = (currentPage - 1) * limit + 1;
const end = start + docs.length - 1;

const formatNumber = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const raw = String(value).replace(/,/g, "");
  if (raw === "" || raw === ".") return raw;

  const [intPart, decPart] = raw.split(".");
  const intFormatted = Number(intPart || 0).toLocaleString("en-US");
  return decPart !== undefined ? `${intFormatted}.${decPart}` : intFormatted;
};






  return (
    <div className="w-full table-container bg-white flex flex-col gap-2 pb-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3">
        <p className="text-dark1 font-semibold">All Installments</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto maintable">
        <table className="w-full bg-white">
          <thead className="text-left text-sm md:text-[15px]">
            <tr>
             
              <th className="px-3 py-4 whitespace-nowrap">No</th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex flex-row items-center gap-2">
                  Customer Name
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex flex-row items-center gap-2">
                  Inventory No.
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex flex-row items-center gap-2">
                  Payment Type 
                </div>
              </th>
              
           
               
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex flex-row items-center gap-2">
                 Total Payment
                </div>
              </th>

               <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex flex-row items-center gap-2">
                  Paid  Payment
                </div>
              </th>

                 <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex flex-row items-center gap-2">
                   Remaining Amount
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex flex-row items-center gap-2">
                  Due Date 
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex flex-row items-center gap-2">
                  Created By 
                </div>
              </th>
                         <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex flex-row items-center gap-2">
                  Status 
                </div>
              </th>
              <th className="px-3 py-4 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((row, index) => (
              <tr
  onClick={() => navigate(`/app/installments/${row?._id}`)}
               key={row?._id}>
              

                <td className="px-3 py-1.5 whitespace-nowrap">{index + 1}</td>
                {/* <td className="px-3 py-1.5 whitespace-nowrap">{row?.inventory?.longAutoIncrementId}</td> */}
                <td className="px-3 py-1.5 whitespace-nowrap capitalize">
                                   {row?.sale?.buyers?.map(b => b?.name).join(', ')}

                </td>
                <td className="px-3 py-1.5 whitespace-nowrap text-center">
                  {row?.inventory?.fullNumber}
                </td>
                <td className="px-3 py-1.5 whitespace-nowrap">
                    {formatLabel(row?.type)}
                </td>

                    <td className="px-3 py-1.5 whitespace-nowrap text-center">
                  {formatNumber(row?.amount)}
                </td>
                <td className="px-3 py-1.5 whitespace-nowrap text-center">
                                    {formatNumber(row?.paidAmount)}
                </td>
                <td className="px-3 py-1.5 whitespace-nowrap text-center">
                 {formatNumber(((row?.amount??0 )- (row?.paidAmount??0)))}
                {/* {row?.amount - row?.paidAmount} */}
              </td>
                <td className="px-3 py-1.5 whitespace-nowrap">
              {row?.dueDate ? moment(row?.dueDate).format("DD-MM-YYYY") : "-"}
               </td>
                <td className="px-3 py-1.5 whitespace-nowrap">
                  {row?.createdBy?.username ??""}   
                </td>
            
                <td className="px-3 py-4 whitespace-nowrap">
              <Status    status={row?.status}/>
                </td>




                      <td className="px-3 py-4">
{
  row?.status ==='paid' ?
  (
  <></>

  ):(
  <div className="flex flex-row gap-1.5 items-center">
    <button
      className="w-fit px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition"
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

      {/* Pagination */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3 flex-wrap-none">
     <TealPagination 

     totalPages={pages}
        currentPage={currentPage}
       setCurrentPage={setCurrentPage}
/>
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <p className="text-sm sm:text-base text-[#A8A8A8]">
            <p className="text-sm text-[#A8A8A8]">
  Showing {docsCount === 0 ? 0 : start} to {docsCount === 0 ? 0 : end} of {docsCount} entries
</p>
          </p>
          <div className="w-[140px] h-[40px]">
                                 <PageLimit totalpages={docsCount || 10} limit={limit} setLimit={setLimit} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentsTable;
