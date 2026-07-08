import SelectInput from 'components/global/form/SelectInput';
import Axios from "config/api";
import { useState } from 'react';
import ProjectInput   from './inventoryinput/ProjectInput';
import SectorInput  from './inventoryinput/SectorInput';
import Search from 'components/global/Search';
import { Inventory_Status } from 'constants/app.constants';

const InventoryFilter = ({
  setType,
  setSectors,
setProjects,
  keyword,
  setKeyword,
  setStatus
}) => {



  
  
 

 
 

  return (
    <div className="w-full rounded-lg py-4  flex flex-col gap-3 pb-4">

      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3">
        <p className="text-dark1 font-semibold">Search Filters</p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-3">

      <Search
           keyword={keyword}
                setKeyword={setKeyword}
            style={{ height: 40 }}
        placeholder='Search Inventories'
       />

        <SelectInput
          name="inventoryType"
          placeholder="Select Inventory Type"
          options={[
            "Residential",
            "Commercial",
              "Appartment",
          ]}
          onSelect={setType}
        />

        <ProjectInput
          name="project"
          placeholder="Select Project"
onSelect={setProjects}
      
        />

        <SectorInput
          name="sector"
          placeholder="Select Sector"
              onSelect={setSectors}
        />
      <SelectInput
        name="Status"
        placeholder="Status"
      options={Inventory_Status}
        onSelect={setStatus}
      />
      </div>
    </div>
  );
};

export default InventoryFilter;
