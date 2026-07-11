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
import Titlebtn  from  'components/global/Titlebtn';

import toast from 'react-hot-toast';

const InventoryUploadedTable = ({docs,setVeiwDetail,
       totalInventoryPages ,
            totalInventoryDocs,
  currentInventoryDocumentPage,
  setCurrentInventoryDocumentPage,
  limitInventoryDocument,
  setLimitInventoryDocument,

}) => {
  const dispatch=useDispatch();
      const {user } = useSelector((state) => state.auth);
const {doc:singleCustomer} = useSelector(state => state.customer);

 const inventoryId = singleCustomer?.sales?.[0]?.inventory?._id;    


     const start = (currentInventoryDocumentPage - 1) * limitInventoryDocument + 1;
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

// if (!inventoryId) {
//   return (
//     <Titlebtn 
//       label="Add Inventory Document"
//       onClick={() => toast.error("Inventory not found for this customer")}
//     />
//   );
// }


  return (
    <div className="w-full table-container bg-white flex flex-col gap-2 pb-4">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between w-full px-3">
        <p className="text-gunmetal font-semibold">All Uploaded  Inventory Documents</p>
                            <Titlebtn label="Add Inventory Document" url={`/app/Customer-detail/${inventoryId}/Inventorydocument`} />
        
      </div>
      {/* Table */}
      <div className="overflow-x-auto mt-4    maintable ">
      <table className="w-[95%] rounded-xl  overflow-hidden border-gray-200 mx-auto bg-white ">
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

      
              <th className="px-3 py-4 whitespace-nowrap text-white">No</th>
              <th className="px-3 py-4 whitespace-nowrap text-white">Document Name</th>
          
              <th className="px-3 py-4 whitespace-nowrap text-white">
                  Uploaded Date
          
              </th>
              <th className="px-3 py-4 whitespace-nowrap  text-white">
                  Status
            
              </th>
              <th className="px-3 py-4 whitespace-nowrap text-white">Action</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((row, index) => (
              <tr key={row._id}>
             <td className="px-3 py-4 whitespace-nowrap"> <input
                          type="checkbox"
                          // checked={isRowSelected}
                          // onChange={() => toggleRow(row._id)}
                          className="w-3 h-3 rounded border-gray-300 accent-white bg-transparent cursor-pointer"
                        /></td>

                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">{index + 1}</td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                  {row?.name}
                </td>
                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                {row?.createdAt ? moment(row?.dueDate).format("DD-MM-YYYY") : "-"}
                </td>

                <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
                  <Status status={row?.status} />
                </td>
                   <td className="px-3 py-4 whitespace-nowrap font-medium text-dark1 text-xs">
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
        
             totalPages={totalInventoryPages}
                currentPage={currentInventoryDocumentPage}
               setCurrentPage={setCurrentInventoryDocumentPage}
        />
                                        {/* Limit Dropdown */}
        
                              <div className=' flex items-center justify-between sm:justify-start  gap-2'>
                    
        <p className="text-sm text-[#A8A8A8]">
          Showing {totalInventoryDocs === 0 ? 0 : start} to {totalInventoryDocs === 0 ? 0 : end} of {totalInventoryDocs} entries
        </p>

                                     <div className="w-[140px] h-[40px] ">
                                 <PageLimit totalpages={totalInventoryDocs  || 10} limit={limitInventoryDocument} setLimit={setLimitInventoryDocument} />
                                    </div>
                              </div>
                                    
                                      
                            
                                      
                                      </div>
    </div>
  );
};

export default InventoryUploadedTable;
