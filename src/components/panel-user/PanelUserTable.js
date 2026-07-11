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
import { useDispatch, useSelector } from "react-redux";
import TrashSvg from "assets/svgs/TrashSvg";
import moment from "moment";
import confirmBox from "utils/confirmBox";
import { baseURL } from 'config/api';
import {admin_delete}  from 'redux/actions/adminActions';
  import { useQueryClient } from 'react-query';
  import toast from 'react-hot-toast';
  
const PanelUserTable = ({
  currentPage,
  setCurrentPage,
  limit,
  setLimit
}) => {

  const navigate=useNavigate();
 const {docs,pages,docsCount } = useSelector((state) => state.admin);
     const {user } = useSelector((state) => state.auth);

  const dispatch=useDispatch();
 const start = (currentPage - 1) * limit + 1;
const end = start + docs.length - 1;
  const queryClient = useQueryClient();



  

 const handleDelete = async (ID) => {
   if (!user?.isSuperAdmin) {
    toast.error("You are not authorized to delete this user panel.");
    return;
  }

  const title = 'Confirm Deletion';
  const message = 'Are you sure you want to delete this Admin Panel?';

  const onYesClick = async () => {
    await dispatch(admin_delete(ID));
    queryClient.invalidateQueries(["fetch-all-admin"]);
  };

  confirmBox({ title, message, onYesClick });
};

  return (
    <div className="w-full bg-white flex flex-col gap-2 pb-4 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full  pt-3">
        <p className="text-dark1 font-semibold text-lg px-6">All Users</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto maintable  ">
        <table className=" ">
          <thead className="text-left border-b  ">
            <tr>
               <th className="   whitespace-nowrap text-white">
              <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
              </th>
            
              <th className="  whitespace-nowrap">No</th>
              <th className="  whitespace-nowrap">
                   User Name
             
              </th>
              <th className="  whitespace-nowrap">
              Email
              </th>
         
              <th className="  whitespace-nowrap">
              Created Date
              </th>
          
              <th className="  whitespace-nowrap">
              Status
           
              </th>
                <th className="  whitespace-nowrap">
             Action
           
              </th>
         
            </tr>
          </thead>

        <tbody>
  {docs.map((row,index) => (
    <tr
      key={row?._id}
      className={`border-b hover:bg-gray-50 transition ${
        docs.includes(row?._id) ? "bg-[#F0FAFF]" : ""
      }`}
    >
      <td className="  whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
    
      <td className="  text-gray-700">
  {index+1}
      </td>

      {/* Name & Avatar */}
      <td className="  whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-[32px] h-[32px] border overflow-hidden rounded-full">
            <img
              src={img}
              alt={`${row?.username} avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-800">{row?.username}</span>
        </div>
      </td>

      <td className="  whitespace-nowrap">{row?.email}</td>

      <td className="  whitespace-nowrap">
                    {row?.createdAt ? moment(row?.dueDate).format("DD-MM-YYYY") : "-"}
      </td>

      <td className="  whitespace-nowrap">
    <Status  status={row?.status}/>

      </td>

         <td className="  whitespace-nowrap">
          <div
        onClick={() => handleDelete(row?._id)}
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-darkred cursor-pointer"
      >
    <TrashSvg/>
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
            setCurrentPage={setCurrentPage} />

        <div className="flex items-center gap-2">
           <p className="text-sm text-[#A8A8A8]">
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

export default PanelUserTable;
