import Status from "components/global/Status";
import EyetSVG from "assets/svgs/EyetSVG";
import TrashSvg from 'assets/svgs/TrashSvg';
import { useParams } from "react-router-dom";
import moment from "moment";
import { useQueryClient } from 'react-query';
import confirmBox from "utils/confirmBox";
import {deleteCustomer} from  'redux/actions/customerActions'
import {setInventoryDocument} from 'redux/slices/inventorySlice';
import { useDispatch,useSelector} from "react-redux";
import TealPagination from "components/global/TealPagination";
import PageLimit from "components/global/PageLimit";

import toast from 'react-hot-toast';

const UploadedTable = ({docs,setVeiwDetail,
  totalPages,
  totalDocs ,
   currentPage,
        setCurrentPage,
   limit,
    setLimit
}) => {
  const dispatch=useDispatch();
      const {user } = useSelector((state) => state.auth);



                const start = (currentPage - 1) * limit + 1;
const end = start + docs.length - 1;
 

     const queryClient = useQueryClient();       
 const handleDeleteDocument = async (ID) => {
  if (!user?.isSuperAdmin) {

    toast.error("You are not authorized to delete this document.");
    return;
  }

  const title = "Confirm Deletion";
  const message = "Are you sure you want to delete this Inventory Document?";

  const onYesClick = async () => {
    try {
      await dispatch(deleteCustomer(ID));
      queryClient.invalidateQueries(["InventoryDocumnet"]);
    } catch (error) {
      toast.error("Failed to delete document.");
    }
  };

  confirmBox({ title, message, onYesClick });
};



  return (
    <div className="w-full table-container bg-white flex flex-col gap-2 pb-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3">
        <p className="text-gunmetal font-semibold">All Uploaded Documents</p>
      </div>
      {/* Table */}
      <div className="overflow-x-auto maintable">
        <table className="w-full bg-white">
          <thead className="text-left text-sm md:text-[15px]">
            <tr>
      
              <th className="px-3 py-4 whitespace-nowrap">No</th>
              <th className="px-3 py-4 whitespace-nowrap">Document Name</th>
          
              <th className="px-3 py-4 whitespace-nowrap">
                  Uploaded Date
          
              </th>
              <th className="px-3 py-4 whitespace-nowrap">
                  Status
            
              </th>
              <th className="px-3 py-4 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((row, index) => (
              <tr key={row._id}>
            

                <td className="px-3 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {row?.name}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                {row?.createdAt ? moment(row?.dueDate).format("DD-MM-YYYY") : "-"}
                </td>

                <td className="px-3 py-4 whitespace-nowrap">
                  <Status status={row?.status} />
                </td>
                   <td className="px-3 py-4">
                  <div className="flex flex-row gap-1.5 items-center">
                  {row?.status ==='deleted' ?  (
                       <>

                       </>

                  ) :(
                   <div 
                     onClick={() => {
                  setVeiwDetail(true);
                  dispatch(setInventoryDocument(row));
                }}

                   className="w-fit px-2.5 py-2.5 rounded-lg bg-primary">
                      <EyetSVG />
                    </div>
 
                  ) }
                                     {row?.status ==='deleted' ?  (
                                       <>

                                       </>


                                     ):(

                                              <>
                                                                     {user?.isSuperAdmin && (
                                              <div
                                                onClick={() => handleDeleteDocument(row?._id)}
                                                className="w-fit px-2.5 py-2.5 rounded-lg bg-darkred cursor-pointer"
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


      
           <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
                 <TealPagination 
        
             totalPages={totalPages}
                currentPage={currentPage}
               setCurrentPage={setCurrentPage}
        />
                                        {/* Limit Dropdown */}
        
                              <div className=' flex items-center justify-between sm:justify-start  gap-2'>
                    
        <p className="text-sm text-[#A8A8A8]">
          Showing {totalDocs === 0 ? 0 : start} to {totalDocs === 0 ? 0 : end} of {totalDocs} entries
        </p>

                                     <div className="w-[140px] h-[40px] ">
                                 <PageLimit totalpages={totalDocs  || 10} limit={limit} setLimit={setLimit} />
                                    </div>
                              </div>
                                    
                                      
                            
                                      
                                      </div>
    </div>
  );
};

export default UploadedTable;
