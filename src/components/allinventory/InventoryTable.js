import { useState } from "react";

import Status from "components/global/Status";
import EyetSVG from "assets/svgs/EyetSVG";
import EditTSvg from "assets/svgs/EditTSvg";
import CheckAllSVG from "assets/svgs/CheckAll";
import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import img from "assets/images/img2.jpg";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setDocinventoryExtraDetails} from 'redux/slices/inventorySlice'
import { useQueryClient } from 'react-query';
import confirmBox from "utils/confirmBox";
import {deleteInventory} from  'redux/actions/inventoryActions'
import TrashSvg  from 'assets/svgs/TrashSvg'
import toast from 'react-hot-toast';
import DatePicker from "components/addcustomer/customerpurchaseplan/inventoryinput/DateInput";

const InventoryTable = ({
  currentPage,
  setCurrentPage,
  setLimit,
  limit
}) => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
    const { docs , pages ,docsCount, deleteLoading } = useSelector(state => state.inventory);
          const {user } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();
  
  const [selectedRows, setSelectedRows] = useState([]);

const start = (currentPage - 1) * limit + 1;
const end = start + docs.length - 1;


  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(docs.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };






  const handleDeleteInventory = async (ID) => {

  if (!user?.isSuperAdmin) {
    // User is not super admin
    toast.error("You are not authorized to delete this inventory.");
    return;
  }

  const title = 'Confirm Deletion';
  const message = 'Are you sure you want to delete this Inventory?';

  const onYesClick = async () => {
    await dispatch(deleteInventory(ID));
    queryClient.invalidateQueries(["fetch-all-inventory"]);
  };

  confirmBox({ title, message, onYesClick });
};

 



  function formatLabel(text = "") {
  return text
    .replace(/_/g, " ")       
    .split(" ")               
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");           
}

  return (
    <div className="w-full table-container rounded-xl  bg-white flex flex-col gap-2 pb-4">
      {/* Header */}
      
<div className=' flex flex-col   sm:flex-row sm:justify-between  w-[95%] mx-auto '>
  <div className=' w-full sm:w-[267px]'>
  <p className="text-dark1 font-semibold ">All Inventories</p> 

  </div>
  
</div>

      {/* Table */}
      <div className="  overflow-x-auto maintable mt-4 px-4">
      <table className="w-[95%] rounded-xl  overflow-hidden mx-auto bg-white ">
        <thead className="text-left text-white rounded-t-xl  bg-[#1F2020] text-xs md:text-[15px]">
            <tr>
        <th className="   whitespace-nowrap text-white">
              <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
              </th>
        <th className="   whitespace-nowrap text-white">
                No</th>
        <th className="   whitespace-nowrap text-white">
                ID Code</th>
              <th className="   whitespace-nowrap text-white">
                Customer Name</th>
              <th className="   whitespace-nowrap text-white ">Project</th>
              <th className="   whitespace-nowrap text-white ">Sector</th>
              <th className="   whitespace-nowrap text-white ">Type</th>
              <th className="   whitespace-nowrap text-white  ">Plot No.</th>
              <th className="   whitespace-nowrap text-white ">Number</th>
              <th className="   whitespace-nowrap text-white ">Full Number</th>
              <th className="   whitespace-nowrap text-white ">Status</th>
              <th className="   whitespace-nowrap text-white ">Action</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((row, index) => (
              <tr
              // onClick={() => navigate(`/app/inventory/${row?._id}`)}
                key={row._id}
                className={`border-b hover:bg-gray-50 transition ${
                  selectedRows.includes(row._id) ? "bg-[#F0FAFF]" : ""
                }`}
              >
                {/* Checkbox */}
                  <td className="  whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>

                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] text-xs">{row?.autoIncrementId}</td>
                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] text-xs">{row?.fullNumber}</td>
                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] text-xs">
                {row?.currentSale?.buyers?.map(b => b?.name).join(', ')}
                  {/* <div className="flex items-center gap-2">
                    <div className="w-[32px] h-[32px] border overflow-hidden rounded-full">
                      <img
                        src={img}
                        alt="user avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {}
                  </div> */}
                </td>
                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] text-xs">{row?.project?.title}</td>
                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] text-xs">{row?.sector?.title}</td>
                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] text-xs  capitalize">{row.type}</td>
                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] text-xs">{row.plotNumber}</td>
                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] text-xs">{row.number}</td>
                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] text-xs">{row.fullNumber}</td>
                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] self-center text-xs">
                 <Status status={formatLabel(row.status)} />
                </td>
                <td className="   whitespace-nowrap font-medium text-[#1A1C1E] text-xs">
                  <div className="flex flex-row gap-1.5 items-center">
  {row.status === "deleted" ? (
    <></>
  ) : (
    <>
     
      {  row.status === "not_assigned"?(<></>): row.status === "draft" ||(!row?.currentSale?.plan)? (
        <button
          onClick={() => navigate(`/app/inventory/${row?._id}/purchase-plan`)}
          className="w-fit px-4 py-1 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 transition"
        >
         Set Installment Plan
        </button>
      ) : (
        !(row.status === "full_paid" || row.status === "not_assigned") && (
          <button
            onClick={() => {
              navigate(`/app/inventory/${row?._id}/pay-inventory`);
              dispatch(setDocinventoryExtraDetails(row));
            }}
            className="w-fit px-4 p-1 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 transition"
          >
            Pay
          </button>
        )
      )}

      <div
        onClick={() => navigate(`/app/inventory/${row?._id}`)}
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-primary cursor-pointer"
      >
        <EyetSVG />
      </div>


 {user?.isSuperAdmin && (
                      <div
                        onClick={() => handleDeleteInventory(row?._id)}
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-darkred cursor-pointer"
                      >
                        <TrashSvg />
                      </div>
                    )}
    
    </>
  )}
</div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer (Pagination + Limit) */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full  mt-4 gap-3">
              <TealPagination 
     
          totalPages={pages}
             currentPage={currentPage}
            setCurrentPage={setCurrentPage}
     />

        <div className="flex items-center gap-2">
        <p className="text-xs text-[#A8A8A8]">
  Showing {docsCount === 0 ? 0 : start} to {docsCount === 0 ? 0 : end} of {docsCount} entries
</p>

          <div className="w-[140px] h-[40px]">
            <PageLimit totalpages={docsCount || 10} limit={limit} setLimit={setLimit}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
