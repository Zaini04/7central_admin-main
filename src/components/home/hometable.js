
import { useState } from 'react';
import Status  from 'components/global/Status'
import EyetSVG from 'assets/svgs/EyetSVG';
import TrashSvg from 'assets/svgs/TrashSvg';
import SearchBox from 'components/global/SearchBox';

import img from "assets/images/img2.jpg";
import { useSelector } from 'react-redux';
import { baseURL } from 'config/api';
import moment from "moment";
import {customer_delete}  from 'redux/actions/customerActions';
  import { useQueryClient } from 'react-query';
import confirmBox from "utils/confirmBox";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from 'components/global/Loader';
import DisplayError from 'components/global/DisplayError';
import ItemNotFound from 'components/global/ItemNotFound';
import DateInput from 'components/global/form/DateInput';
import DatePicker from 'components/addcustomer/customerpurchaseplan/inventoryinput/DateInput';


// import EditTSvg from 'assets/svgs/EditTSvg';
// import CheckAllSVG   from 'assets/svgs/CheckAll';
// import ArrowDownSvg from "assets/svgs/ArrowDownSvg";


const Hometable = ({ keyword, setKeyword,isLoading,isError }) => {
   const { docs } = useSelector(state => state.customer);
    const {user } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
const navigate=useNavigate();
  const queryClient = useQueryClient();

  


  function formatLabel(text = "") {
  return text
    .replace(/_/g, " ")       
    .split(" ")               
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");           
}

const handleDelete = async (ID) => {


   if (!user?.isSuperAdmin) {
    toast.error("You are not authorized to delete this Customer.");
    return;
  }
  const title = 'Confirm Deletion';
  const message = 'Are you sure you want to delete this Customer?';

  const onYesClick = async () => {
    await dispatch(customer_delete(ID));
    queryClient.invalidateQueries(["fetch-all-customer"]);
  };

  confirmBox({ title, message, onYesClick });
};






  return (
    <div className="w-full table-container rounded-xl bg-white flex flex-col gap-4 pb-4">

<div className=' flex flex-col  sm:flex-row sm:justify-between  w-[95%] mx-auto '>
  <div className=' w-full sm:w-[267px]'>
<SearchBox

    keyword={keyword}
          setKeyword={setKeyword}
/>
  </div>
<div>
  {/* <p className="text-dark1 font-semibold">Filter</p> */}
  <DatePicker placeholder="Select Date"/>
</div>   
</div>




{
  isLoading ? (
    <Loader />
  ) : isError ? (
    <DisplayError message={isError} />
  ) : docs?.length === 0 ? (
    <ItemNotFound  message="No Recent Customer found."/>
  ) : (
    <div className="overflow-x-auto maintable">
      <table className="w-[95%] rounded-xl  overflow-hidden border-gray-200 mx-auto bg-white ">
        <thead className="">
          <tr className="">
            <th className="   whitespace-nowrap text-white">
                    <input
                      type="checkbox"
                      // checked={allSelected}
                      // onChange={toggleAll}
                      className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                    />
                  </th>
            <th className="  whitespace-nowrap text-white">No</th>
            <th className="  whitespace-nowrap text-white">ID Code</th>
            <th className="  whitespace-nowrap text-white">Customer Name</th>
            <th className="  whitespace-nowrap text-white">Phone Number</th>
            <th className="  whitespace-nowrap text-white">Created Date</th>
            <th className="  whitespace-nowrap text-white">Location</th>
            {/* <th className="  whitespace-nowrap">Status</th> */}
            <th className="  whitespace-nowrap text-white">Action</th>
          </tr>
        </thead>

        <tbody>
          {docs.map((row) => (
            <tr className='border font-medium' key={row?._id}>

              <td className="  whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>
              <td className="font-medium   whitespace-nowrap text-[#1A1C1E] text-xs">{row?.autoIncrementId}</td>

              <td className="font-medium   whitespace-nowrap text-[#1A1C1E] text-xs">{row?.longAutoIncrementId}</td>

              <td className="font-medium   whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="w-[32px] h-[32px] overflow-hidden rounded-full">
                    <img
                      src={row?.image ? `${baseURL}/${row?.image}` : img}
                      alt="user avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {row?.name}
                </div>
              </td>

              <td className="font-medium   whitespace-nowrap text-[#1A1C1E] text-xs">{row?.phoneNumber ?? ""}</td>

              <td className="font-medium   whitespace-nowrap text-[#1A1C1E] text-xs">
                {row?.createdAt ? moment(row?.createdAt).format("DD-MM-YYYY") : "-"}
              </td>

              <td className="font-medium   whitespace-nowrap text-[#1A1C1E] text-xs">
                {row?.countryName && (
                  <div className="w-fit px-3 rounded-md py-1 bg-[#EDF1F3]">
                    {row?.countryName}
                  </div>
                )}
              </td>

              {/* <td className="  whitespace-nowrap">
                <Status
                  status={
                    row?.status === "assigned"
                      ? "Assigned"
                      : row?.status === "not_assigned"
                      ? "Not Assigned"
                      : row?.status === "deleted"
                      ? "Deleted"
                      : "Unknown"
                  }
                />
              </td> */}

              <td className="  whitespace-nowrap text-xs">
                {row?.status === "deleted" ? (
                  <></>
                ) : (
                  <div className="flex flex-row gap-1.5 items-center">

                    {/* View */}
                    <div
                      onClick={() => navigate(`/app/Customer-detail/${row._id}`)}
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-primary cursor-pointer"
                    >
                      <EyetSVG />
                    </div>

                    {user?.isSuperAdmin && (
                      <div
                        onClick={() => handleDelete(row?._id)}
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-darkred cursor-pointer"
                      >
                        <TrashSvg />
                      </div>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}  

     




       


   





      
    </div>
  );
};

export default Hometable;


      