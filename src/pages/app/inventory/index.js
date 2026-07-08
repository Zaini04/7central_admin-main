import React from 'react';
import { useState } from 'react';
import ExportButton from 'components/global/exportbutton/ExportButton';
import InventoryTable from 'components/allinventory/InventoryTable';
import InventoryFilter from 'components/allinventory/InventoryFilter';
import Titlebtn from 'components/global/Titlebtn';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// import useQueryParams from 'utils/hooks/useQueryParams';
import { useQuery } from 'react-query';
import Axios from 'config/api';
import { setStats } from 'redux/slices/inventorySlice';
import Loader from 'components/global/Loader';
import DisplayError from 'components/global/DisplayError';
import ItemNotFound from 'components/global/ItemNotFound';
import formatLabel from "utils/formatLabel";

const Inventory = () => {
        const dispatch = useDispatch();
    
      const navigate = useNavigate();
  const { docs } = useSelector(state => state.inventory);
const [keyword, setKeyword] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);
const [type,setType]=useState('')
const [status,setStatus]=useState('')
  const [projects , setProjects] = useState('');
    const [sectors , setSectors] = useState('');



const queryKey = ['fetch-all-inventory', currentPage, keyword, limit, projects,sectors,keyword,type,status];

const { isLoading, isError, error } = useQuery(
  queryKey,
  () => {
    let url = `/inventory?pageSize=${limit}&page=${currentPage}`;
    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }
    if (type) {
      let mappedType = "";
      if (type === "Residential") {
        mappedType = "residential";
      } else if (type === "Commercial") {
        mappedType = "commercial";
      }else if (type === "Appartment") {
        mappedType = "appartment";
      }
      if (mappedType) {
        url += `&type=${mappedType}`;
      }
    }

    if (projects) {
      url += `&project=${projects}`; 
    }

    if (sectors) {
      url += `&sector=${sectors}`; 
    }
    if (status) {
      url += `&status=${status}`;
    }


    console.log("Inventory API URL:", url);

    return Axios.get(url);
  },
  {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const {
        data: {
          data: { docs, pages, docsCount, page },
        },
      } = data;

      dispatch(setStats({ docs, pages, docsCount, page }));
    },
  }
);







    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col xl:flex-row gap-2 xl:items-center xl:justify-between w-full">
                <div className="flex flex-col gap-1.5">
                    <h2 className="page-heading">Inventory</h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
        <ExportButton
  title={"Inventory"}
  tableData={docs.map((item, index) => ({
    No: item?.autoIncrementId || "",
    "ID Code": item?.fullNumber || "",
    "Customer Name": item?.currentSale?.buyers?.[0]?.name || "",
    Project: item?.project?.title || "",
    Sector: item?.sector?.title || "",
    "Plot No.": item?.plotNumber || "",
    Number: item?.number || "",
    "Full Number": item?.fullNumber || "",
 
  }))}
  columns={[
    "No",
    "ID Code",
    "Customer Name",
    "Project",
    "Sector",
    "Plot No.",
    "Number",
    "Full Number",
  ]}
  fileName="Inventory"
  bgcolor="bg-white"
  colortext="#2D3748"
  textColor="text-primary"
/>


                      
                         <button
onClick={() => navigate('/app/inventory/bulk/pay-inventory')}
                     className="bg-white  rounded-full text-primary font-semibold px-4 text-xs h-[32px]">
                         Pay Inventory
                    </button>


                    <button
                      onClick={() => navigate('/app/inventory/ownership-transfer')}
                     className="bg-white border rounded-full font-semibold text-primary text-xs px-4 h-[32px]">
                        Ownership Transfer
                    </button>

                     <button
                            onClick={() => navigate('/app/inventory/assign')}
                            className="bg-white border rounded-full font-semibold text-xs text-primary px-4 h-[32px]"
                            >
                            Assign Inventory
                            </button>
                    <Titlebtn label="Add Inventory" url="/app/inventory/add" />
                </div>
            </div>

        <InventoryFilter
            keyword={keyword}
              setKeyword={setKeyword} 
  setType={setType}
  setProjects={setProjects}
  setSectors={setSectors}
sectors={sectors}
setStatus={setStatus}
/>


           {
    isLoading ? (
        <Loader />
    ) : isError ? (
        <DisplayError message={error} />
    ) : docs?.length > 0 ? (
        <InventoryTable 
currentPage={currentPage}
 setCurrentPage={setCurrentPage}
 setLimit={setLimit}
 limit={limit}
 

            
        />
    ) : (
        <ItemNotFound message="No  Inventory found." />
    )
}

        </div>
    );
};

export default Inventory;
