import React from 'react'
import { useState } from 'react';
import PeriodDropdown  from 'components/global/PeriodDropdown';
import ExportButton   from 'components/global/exportbutton/ExportButton';
import HomeCard  from 'components/home/HomeCard';
import HomeChart   from 'components/home/homechart/HomeChart';
import Hometable   from 'components/home/hometable';
import { useQuery } from 'react-query';
import Axios from 'config/api';
import { setStats } from 'redux/slices/customerSlice';
import Loader from 'components/global/Loader';
import DisplayError from 'components/global/DisplayError';
import ItemNotFound from 'components/global/ItemNotFound';
import { useDispatch,useSelector } from 'react-redux';
import {setStatsDashboard}  from  'redux/slices/dashboardSlice';
import  {setInventoryDashboard}  from   'redux/slices/dashboardSlice'

import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Titlebtn from 'components/global/Titlebtn';
import OverAllDashboardCard from 'components/dashboards/overAllDashboard/dashbordCards';
import AllLeadsCard from 'components/dashboards/overAllDashboard/AllLeadCard';


const OverAllDashboard = () => {

const dispatch=useDispatch()
    const { docs } = useSelector(state => state.customer);
 const { statsDashboard,inventoryDashboard} = useSelector(state => state.dashboard);


const [selected, setSelected] = useState("Month");

      const navigate = useNavigate();






const periodMap = {
  Year: "this_year",
  Month: "this_month",
  Week: "this_week",
};
    
const [keyword, setKeyword] = useState("");


const customerQueryKey = ['fetch-all-customer', keyword];

const { isLoading, isError, error } = useQuery(
  customerQueryKey,
  () => {
    let url = `/customer`;
    if (keyword) {
      url += `?keyword=${encodeURIComponent(keyword)}`;
    }


    return Axios.get(url);
  },
  {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const { data: { data: { docs, pages, docsCount, page } } } = data;
      dispatch(setStats({ docs, pages, docsCount, page }));
    },
  }
);




const dashboardQueryKey = ["fetch-all-dashboard", selected];

const {
  isLoading: dashboardLoading,
  isError: dashboardLoadingError,
} = useQuery(
  dashboardQueryKey,
  async () => {
    const period = periodMap[selected]; 

    let url = `/user/dashboard-stats`;
    if (period) {
      url += `?period=${period}`;
    }

    return Axios.get(url);
  },
  {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      const doc = res?.data?.data;
      dispatch(setStatsDashboard(doc));
    },
  }
);






const dashboardInventoryQueryKey = ["fetch-dashboard-inventory", selected];

const {
  isLoading: dashboardInventoryLoading,
  isError: dashboardInventoryError,
} = useQuery(
  dashboardInventoryQueryKey,
  async () => {
    const period = periodMap[selected]; 

    let url = `/user/dashboard-inventory-sale-stats`;
    if (period) {
      url += `?period=${period}`;
    }

    return Axios.get(url);
  },
  {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      const doc = res?.data?.data;
      dispatch(setInventoryDashboard(doc));
    },
  }
);








    return (
        <div className='flex flex-col gap-5 w-full'>
             <div className=' flex flex-col sm:flex-row  gap-2  sm:items-center sm:justify-between  w-full'>
             <div  className='flex  flex-col gap-1.5'>
             <h2 className='page-heading '>Dashboard</h2>
             {/* <p className='page-subtitle'>there is the latest update for the last 7 days. check now</p> */}

             </div>
                
               <div className=' flex flex-row gap-3'>

                
               <ExportButton  
  title="Customer"
  tableData={docs.map((item) => ({
    No: item?.autoIncrementId || "",
    "ID Code": item?.longAutoIncrementId || "",
    "Customer Name": item?.name || "",
    "Phone Number": item?.phoneNumber || "",
    "Created Date": item?.createdAt 
      ? moment(item?.createdAt).format("DD-MM-YYYY") 
      : "-",
    Location: item?.countryName || "",
  
  }))}
  columns={[
    "No",
    "ID Code",
    "Customer Name",
    "Phone Number",
    "Created Date",
    "Location",
  ]}
  fileName="Recent Customer"
bgcolor={'bg-white'} colortext={'white'} textColor={'text-primary'}
/>
              <Titlebtn  label='Add Customer'  url='/app/Customer/general'/>  

                {/* <button
            className="px-4 py-2 rounded-lg bg-primary text-white"
            onClick={() => navigate('/app/reports')}
          >
            {"Reports"}
          </button>
             <PeriodDropdown selected={selected} setSelected={setSelected} />
                        */}
                          {/* <ExportButton  
                    title="Recent Customer"
                    tableData={docs.map((item) => ({
                      No: item?.autoIncrementId || "",
                      "ID Code": item?.longAutoIncrementId || "",
                      "Customer Name": item?.name || "",
                      "Phone Number": item?.phoneNumber || "",
                      "Created Date": item?.createdAt 
                        ? moment(item?.createdAt).format("DD-MM-YYYY") 
                        : "-",
                      Location: item?.countryName || "",
                    }))}
                    columns={[
                      "No",
                      "ID Code",
                      "Customer Name",
                      "Phone Number",
                      "Created Date",
                      "Location",
                    ]}
                    fileName="Recent Customer"
                    bgcolor="bg-primary"
                    textColor="text-white"
                  /> */}
                              


               </div>
            

                 


             </div>


             
 {
  dashboardLoading ? (
    <Loader />
  ) : dashboardLoadingError ? (
    <DisplayError message={dashboardLoadingError} />
  ) : statsDashboard === 0 ? (
    <p>No data available</p>
  ) : (
    <div className=' flex flex-col gap-10'>
     <OverAllDashboardCard />
     {/* <AllLeadsCard/> */}
     </div>
  )
}


{/* 
  <HomeChart
 dashboardInventoryError={dashboardInventoryError}
  dashboardInventoryLoading={dashboardInventoryLoading}
dashboardLoading={dashboardLoading}
dashboardLoadingError={dashboardLoadingError}
  /> */}
 
   

             <Hometable

            keyword={keyword} 
            setKeyword={setKeyword}
             isLoading={isLoading} 
              isError={isError}
               
                  
                   

             />

              
        </div>
    )
}

export default OverAllDashboard;