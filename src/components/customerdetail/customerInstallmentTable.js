import { useState,useEffect } from "react";

import Status from "components/global/Status";
import EyetSVG from "assets/svgs/EyetSVG";

import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";

import { useSelector,useDispatch } from "react-redux";
import moment from "moment";
import {setCustomerInstallmentsDetail}  from 'redux/slices/customerSlice';
import ExportButton from "components/global/exportbutton/ExportButton";
import Axios from "config/api";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { setDoc } from "redux/slices/customerSlice";

// import EditTSvg from "assets/svgs/EditTSvg";
// import CheckAllSVG from "assets/svgs/CheckAll";
// import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
// import { useNavigate } from "react-router-dom";
// import TrashSvg  from 'assets/svgs/TrashSvg'

const CustomerInstallmentTable = ({
  currentInstallmentPage,
  setCurrentInstallmentPage,
  totalInstallmentsDocs,
  totalInstallmentsPages,
  limitInstallment,
  setLimitInstallment,
  setInstallmentsDetail
}) => {


     const { doc,customerInstallments } = useSelector(
       (state) => state.customer
     );







           const { id } = useParams();

const [storeData, setStoreData] = useState([]); 
const dispatch=useDispatch();



 function formatLabel(text = "") {
  return text
    .replace(/_/g, " ")       
    .split(" ")               
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");           
}




const { data } = useQuery(["single-customer", id], async () => {
  const res = await Axios(`/customer/${id}`);
  return res.data; 
});


useEffect(() => {
  if (!data?.data?.doc) return;
  const d = data.data.doc;
  console.log("d", d);

  dispatch(setDoc(d));
}, [data, dispatch]);

useEffect(() => {
  async function fetchInstallments() {
    try {
      const res = await Axios.get(
        `/customer/${id}/installments?pageSize=${totalInstallmentsDocs}&page=1`
      );
      
      console.log("res", res);
      
     setStoreData(res.data.data.docs);
      
    } catch (error) {
      console.error("Error fetching installments", error);
    }
  }

  fetchInstallments();
}, [id, totalInstallmentsDocs,]);




const start = (currentInstallmentPage - 1) * limitInstallment + 1;
const end = start + customerInstallments.length - 1;

  return (
 <div className="bg-white rounded-xl flex flex-col gap-5 my-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3 pt-3">
        <p className="form-title">Installments </p>
       <ExportButton
  title="Installments"
  tableData={storeData?.map((item, index) => ({
    No: index + 1,
    "Installment Type": formatLabel(item?.type),
    "Total Payment": item?.amount,
    "Paid Payment": item?.paidAmount,
    "Remaining Amount": item?.amount - item?.paidAmount,
    "Due Date": item?.dueDate ? moment(item?.dueDate).format("DD-MM-YYYY") : "-",
  })) || []}
  columns={[
    "No",
    "Installment Type",
    "Total Payment",
    "Paid Payment",
    "Remaining Amount",
    "Due Date",
  ]}
              fileName="Customer Installments"

bgcolor={'bg-white'} colortext={'white'} textColor={'text-primary'}
/>

      </div>

      {/* Table */}
     <div className="overflow-x-auto mt-4    maintable ">
      <table className="w-[95%] rounded-xl border  overflow-hidden border-gray-200 mx-auto bg-white ">
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
     
              <th className="px-3 py-4 text-white">
              No
              </th>
              <th className="px-3 py-4 text-white">
                     Installment Type
                   
             </th>
          
        <th className="px-3 py-4 whitespace-nowrap text-white">
                  Total Payment
                </th>

                <th className="px-3 py-4 whitespace-nowrap text-white">
                    Paid  Payment
                </th>

                  <th className="px-3 py-4 whitespace-nowrap text-white">
                    Remaining Amount
                
                </th>

   

              <th className="px-3 py-4 text-white">
                       Due Date
  
              </th>
              <th className="px-3 py-4 text-white">
              Status
              </th>

              <th className="px-3 py-4 text-white">Action</th>
            </tr>
          </thead>

          <tbody>
            {customerInstallments.map((row, index) => (
              <tr
                key={row?._id}
                className={`border-b hover:bg-gray-50 transition ${
                  customerInstallments.includes(row?._id) ? "bg-[#F0FAFF]" : ""
                }`}
              >
                 <td className="px-3 py-4 whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
             
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                {index+1}
                </td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                {formatLabel(row?.type)}
                </td>



                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                 {row?.amount}
                </td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                 {row?.paidAmount}
                </td>

                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                 {row?.amount-row?.paidAmount}
                </td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                    {row?.createdAt ? moment(row?.dueDate).format("DD-MM-YYYY") : "-"}
                </td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                  <Status status={row?.status} />
                </td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                  <div className="flex flex-row gap-1.5 items-center">
                 <div  
                     onClick={() => {
                                   setInstallmentsDetail(true);
                                   dispatch(setCustomerInstallmentsDetail(row));
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
  
       totalPages={totalInstallmentsPages}
          currentPage={currentInstallmentPage}
         setCurrentPage={setCurrentInstallmentPage}
  />
                                  {/* Limit Dropdown */}
  
                        <div className=' flex items-center justify-between sm:justify-start  gap-2'>
              
  <p className="text-sm text-[#A8A8A8]">
    Showing {totalInstallmentsDocs === 0 ? 0 : start} to {totalInstallmentsDocs === 0 ? 0 : end} of {totalInstallmentsDocs} entries
  </p>
                               <div className="w-[140px] h-[40px] ">
                           <PageLimit totalpages={totalInstallmentsDocs || 10} limit={limitInstallment} setLimit={setLimitInstallment} />
                              </div>
                        </div>
                              
                                
                      
                                
                                </div>

</div>


  );
};

export default CustomerInstallmentTable;
