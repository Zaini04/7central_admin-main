import { useState,useEffect } from 'react';
import DocumnetInventoryForm  from 'components/inventoryDocumnets/documnetInvetory'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'config/api';
import { useQuery } from 'react-query';
import  {setDocInventoryDocument}   from 'redux/slices/inventorySlice';
import { useDispatch,useSelector } from 'react-redux';
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import UploadedTable  from 'components/inventoryDocumnets/UploadedTable';

import ViewDeatilPop  from 'components/inventoryDocumnets/viewDeatilPop';


const InventoryDocument = () => {
    const { id } = useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();


      const {docInventoryDocument} = useSelector((state) => state.inventory);
const [veiwDetail,setVeiwDetail]=useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);



const { data, isLoading, isError, error } = useQuery(
    ["InventoryDocumnet", id,currentPage, limit],
    () => Axios(`/document?inventory=${id}&pageSize=${limit}&page=${currentPage}`)
  );
  const totalPages = data?.data?.data?.pages || 0;
const totalDocs = data?.data?.data?.docsCount || 0;



  useEffect(() => {
    if (!data?.data?.data?.docs) return;
    dispatch(setDocInventoryDocument(data.data.data.docs));
  }, [data, dispatch]);

  return (

    <>

    {veiwDetail  &&  <ViewDeatilPop  setVeiwDetail={setVeiwDetail}/>}   
    <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row  gap-2  sm:items-center sm:justify-between  w-full">
                <div className="flex flex-col gap-1.5">
                    <h2 className="page-heading">Inventory Document</h2>
                </div>
                  <button 
        onClick={() => navigate(`/app/inventory/${id}/purchase-plan`)}
        type="button"
        className="btn-secondary w-fit"
      >
        Skip
      </button>
            </div>

           <div className="w-full bg-white flex flex-col gap-2 pb-4 rounded-xl shadow-sm">
                            <DocumnetInventoryForm/>
             </div>


         {
    isLoading ? (
        <Loader />
    ) : isError ? (
        <DisplayError message={error} />
    ) : docInventoryDocument?.length > 0 ? (
                     <UploadedTable
                     docs={docInventoryDocument}
                totalPages={totalPages}
                totalDocs={totalDocs}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setLimit={setLimit}
                limit={limit}
                setVeiwDetail={setVeiwDetail}
 

            
        />
    ) : (
        <ItemNotFound message="No  Inventory found." />
    )
}




        </div>
    </>
     
  )
}

export default InventoryDocument;