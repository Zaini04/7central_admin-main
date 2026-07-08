import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";

import TextError from "components/global/form/TextError";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import Axios from "config/api";
import { setStats } from "redux/slices/inventorySlice";
import { BeatLoader } from "react-spinners";
import {setDocinventoryExtraDetails}  from  'redux/slices/inventorySlice'

const InventorySelect = ({
  label,
  value,
  onChange,
  placeholder,
  project,
  sector,
  disabled,
  error,
}) => {

  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { docs: inventoryOptions } = useSelector((state) => state.inventory);
  
   const [pageSize]=useState(10)

  useClickOutside(dropdownRef, () => setShowMenu(false));
  const selectedLabel = useMemo(() => {
    return (
      inventoryOptions.find((p) => p._id === value)?.fullNumber || ""
    );
  }, [inventoryOptions, value]);
 const { isLoading } = useQuery(
  ["fetch-inventory", project, sector, pageSize, searchTerm],
  () => {

    let url = `/inventory?project=${project}&sector=${sector}&pageSize=${pageSize}&status=not_assigned`;


    if (searchTerm) {
      url += `&keyword=${encodeURIComponent(searchTerm)}`;
    }

    return Axios(url);
  },
  {
    enabled: !disabled,
    onSuccess: (res) => {
      const { docs, pages, docsCount, page } = res.data.data;
      dispatch(setStats({ docs, pages, docsCount, page }));
    },
  }
);


  const handleSelect = (item) => {
    if (disabled) return;
    onChange(item?._id);
    dispatch(setDocinventoryExtraDetails(item));
    setShowMenu(false);
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="relative form-row" ref={dropdownRef}>
      {/* Input box */}
      <div
        className={`relative w-full rounded-lg border transition ${
    disabled
      ? "bg-gray-100 cursor-not-allowed"
      : `cursor-pointer ${error ? "border-red-500" : "border-lighter"}`
  }`}
        onClick={() => !disabled && setShowMenu((p) => !p)}
      >
        <input
          type="text"
          readOnly
          placeholder={placeholder}
          disabled={disabled}
          value={disabled ? "" : selectedLabel}
          onFocus={() => !disabled && setFocused(true)}
          onBlur={() => !disabled && setFocused(false)}
          className="w-full py-3 px-4 h-[32px]  text-sm  text-primary bg-transparent"
        />

       <label
  className={`absolute -top-8 left-0   px-1 transition-all duration-300 pointer-events-none ${
    focused || value
      ? `top-[-10px] text-[12px]    ${error ? "text-red-500" : "text-gray3"}`
      : "top-3 text-gray3"
  }`}
>
  {label}
</label>


        {!disabled && (
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${showMenu ? "rotate-180" : ""}`}>
            <ArrowSVG />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {showMenu && !disabled && (
        <div className="absolute top-[60px] left-0 w-full bg-white border rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
          <div className="p-3">
              <input
                type="text"
                placeholder="Search  Inventory..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>
          {isLoading ? (
              <div className="py-4 flex justify-center">
                              <div className=" flex  flex-col gap-1">
                         <BeatLoader size={13} color="#2D3748" />
                         <span className="text-gray-400  text-xs sm:text-sm">Loading...</span>
                       </div>
                       </div>
          ) : inventoryOptions?.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No Inventory Found</div>
          ) : (
            inventoryOptions.map((item) => (
              <div
                key={item._id}
                className={`px-3 py-2 cursor-pointer 
                  ${value === item._id ? "bg-primary text-white" : "hover:bg-gray-100 text-gray-700"}`}
                onClick={() => handleSelect(item)}
              >
                {item.fullNumber}
              </div>
            ))
          )}
        </div>
      )}

      

      {error && <TextError>{error}</TextError>}
    </div>
  );
};


export default InventorySelect;
