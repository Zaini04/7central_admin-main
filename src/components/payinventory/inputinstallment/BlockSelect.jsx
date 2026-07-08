import React, { useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import TextError from "components/global/form/TextError";

import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import Axios from "config/api";
import { setStats } from "redux/slices/sectorSlice";
import { BeatLoader } from "react-spinners";

const BlockSelect = ({ label, name, formik,...rest }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { docs: sectorOptions, } = useSelector((state) => state.sector);

  const [pageSize,setPageSize]=useState(10)


  useClickOutside(dropdownRef, () => setShowMenu(false));


   const value = formik.values[name];
  const error = formik.touched[name] && formik.errors[name];
  const isActive = focused || value;

  const selectedLabel = useMemo(() => {
    return sectorOptions.find((p) => p._id === value)?.title || "";
  }, [sectorOptions, value]);

  // Fetch Sectors
  const queryKey = ["fetch-all-sector",pageSize];
  const { isLoading } = useQuery(queryKey, () => Axios(`/sector?pageSize=${pageSize}`), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const {
        data: {
          data: { docs, pages, docsCount, page },
        },
      } = data;

      dispatch(setStats({ docs, pages, docsCount, page }));
        setPageSize(docsCount || 10);
    },
  });

  const handleSelect = (val) => {
    formik.setFieldValue(name, val); 
    setShowMenu(false);
  };

  return (
    <div className="relative form-row" ref={dropdownRef}>
      {/* Box */}
     <div
  className={`relative w-full transition-all duration-300   rounded-lg border ${
    error ? "border-red-500" : "border-lighter"
  }`}
  onClick={() => setShowMenu((prev) => !prev)}
>
        <input
          id={name}
          name={name}
          type="text"
          readOnly
          value={selectedLabel}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent py-2 px-4 text-sm h-[32px] text-primary rounded-lg outline-none cursor-pointer"
          {...rest}
        />

        {/* Label */}
     <label
  htmlFor={name}
  className={`absolute left-0 bg-light2 px-1 transition-all duration-300 pointer-events-none ${
    isActive
      ? `top-[-10px] text-[12px] ${error ? "text-red-500" : "text-gray3"}`
      : "top-3.5 text-gray3"
  }`}
>
  {label}
</label>

        {/* Icon */}
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ${
            showMenu ? "rotate-180" : ""
          }`}
        >
          <ArrowSVG />
        </div>
      </div>

      {/* Dropdown */}
      {showMenu && (
        <div className="absolute top-[60px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
          {isLoading ? (
             <div className="py-4 flex justify-center">
                    <div className=" flex  flex-col gap-1">
               <BeatLoader size={13} color="#2D3748" />
               <span className="text-gray-400  text-xs sm:text-sm">Loading...</span>
             </div>
             </div>
          ) : sectorOptions?.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No Sector Found</div>
          ) : (
            sectorOptions.map((option) => (
              <div
                key={option._id}
                onClick={() => handleSelect(option._id)}
                className={`px-3 py-2 cursor-pointer ${
                  value === option._id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {option.title}
              </div>
            ))
          )}
        </div>
      )}


            {error && <TextError>{error}</TextError>}
    </div>
  );
};

export default BlockSelect;


