import React from "react";
import { Link, useLocation } from "react-router-dom";
import RadioButtonChecked from "assets/svgs/RadioButtonChecked";
import RadioButtonUnchecked from "assets/svgs/RadioButtonUnchecked";

const SelectInventory = () => {
  const location = useLocation(); 
  const currentPath = location.pathname;

  return (
    <div className="w-full flex flex-col gap-3 pb-4 rounded-xl ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3 pt-6 ">
        <p className="text-dark1 font-semibold  text-sm sm:text-lg">
          Select Inventory Add Option
        </p>
      </div>

      <div className="w-full grid  grid-cols-1 sm:grid-cols-2 gap-4 px-3 pb-4">
        {/* Add Single Inventory */}
        <Link to="/app/inventory/add">
          <div className="bg-white h-[40px] rounded-xl border border-lighter px-3 flex justify-between items-center">
            <p className="text-sm text-[#3A3541AD] font-normal">
              Add Single Inventory
            </p>
            {currentPath === "/app/inventory/add" ? (
              <RadioButtonChecked />
            ) : (
              <RadioButtonUnchecked />
            )}
          </div>
        </Link>

        {/* Upload by CSV / XLSX */}
        <Link to="/app/inventory/upload">
          <div className="bg-white border border-lighter h-[40px] rounded-xl px-3 flex justify-between items-center">
            <p className="text-sm  text-[#3A3541AD] font-normal">
              Upload by .csv and .xlsx File
            </p>
            {currentPath === "/app/inventory/upload" ? (
              <RadioButtonChecked />
            ) : (
              <RadioButtonUnchecked />
            )}
          </div>
        </Link>
      </div>
                      <hr className="w-[98%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

    </div>
  );
};

export default SelectInventory;
