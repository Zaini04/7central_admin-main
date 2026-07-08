
import { useState } from 'react';
import Titlebtn  from 'components/global/Titlebtn';
import PanelUserTable  from 'components/panel-user/PanelUserTable';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import Axios from "config/api";
import { setStats } from "redux/slices/adminSlice";


const PanelUser = () => {

   const {docs } = useSelector((state) => state.admin);


//  console.log(' this is a  docs',docs)

  const dispatch=useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);


const queryKey = ["fetch-all-admin",currentPage,limit];

const { isLoading, isError, error } = useQuery(
  queryKey,
  async () => {
    let url = `/user/all-admins?pageSize=${limit}&page=${currentPage}`;

 

    const res = await Axios.get(url);
    return res;
  },
  {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      const {
        data: {
          data: { docs, pages, docsCount, page },
        },
      } = res;

      dispatch(setStats({ docs, pages, docsCount, page }));
    },
  }
);


  return (
       <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col xs:flex-row  gap-2  xs:items-center xs:justify-between  w-full">
                <div className="flex flex-col gap-1.5">
                    <h2 className="page-heading">Panel User</h2>
                </div>
               <Titlebtn  label='Add New User'  url='/app/panel-user/add'/>  
         
                          

          
            </div>

                  {isLoading ? (
              <Loader />
                    ) : isError ? (
                      <DisplayError message={error?.message || "Failed to load data"} />
                    ) : docs?.length > 0 ? (
            <PanelUserTable

              currentPage={currentPage}
               setCurrentPage={setCurrentPage}
             limit={limit}
              setLimit={setLimit}
            />
                    )
            : (
                                  <ItemNotFound message="No Payment Receipts Found" />
                                )}
            
       
            



        </div>
  )
}

export default PanelUser;