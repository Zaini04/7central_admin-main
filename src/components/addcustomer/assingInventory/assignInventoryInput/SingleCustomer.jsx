import React, { useState, useRef,useEffect, useMemo } from "react";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import { useDispatch, useSelector } from "react-redux";
import { setStats,setDocExtraDetails } from "redux/slices/customerSlice";
import { useQuery } from "react-query";
import Axios from "config/api";
import { BeatLoader } from "react-spinners";
import TextError from "components/global/form/TextError";




const SingleCustomer = ({ label, name, onChange, value = null, error }) => {
  const dispatch = useDispatch();
  const { docs: CustomerOptions } = useSelector((state) => state.customer);

  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setShowMenu(false));

  
 const { isLoading } = useQuery(
  ["fetch-all-customer", searchTerm], 
  () => {
    let url = "/customer";

    if (searchTerm) {
      url += `?keyword=${encodeURIComponent(searchTerm)}`;
    }

    return Axios.get(url); 
  },
  {
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const {
        data: {
          data: { docs },
        },
      } = response;

      dispatch(setStats({ docs }));
    },
  }
);


  useEffect(() => {
    if (!value || CustomerOptions.length === 0) return;

    const preSelectedCustomer = CustomerOptions.find(c => c._id === value);
    if (preSelectedCustomer) {
      dispatch(setDocExtraDetails(preSelectedCustomer));
    }
  }, [value, CustomerOptions, dispatch]);
  const selectedLabel = useMemo(() => {
    return CustomerOptions.find((p) => p?._id === value)?.name || "";
  }, [CustomerOptions, value]);


  const handleSelect = (option) => {
    if (onChange) onChange(name, option._id);
  dispatch(setDocExtraDetails(option));  
    setShowMenu(false); 
  };



    const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="relative form-row" ref={dropdownRef}>
      <div
        className={`relative w-full transition-all duration-300 rounded-xl border ${
          error ? "border-red-500" : "border-lighter"
        }`}
      >
        <input
          id={name}
          name={name}
          type="text"
          value={selectedLabel}
          readOnly
          onFocus={() => {
            setFocused(true);
            setShowMenu(true);
          }}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent py-3 px-4 text-base text-primary rounded-lg outline-none cursor-pointer"
        />

        <label
          htmlFor={name}
          className={`absolute left-4 bg-light2 px-1 transition-all duration-300 pointer-events-none ${
            focused || selectedLabel
              ? `top-[-10px] text-[13px] font-light ${
                  error ? "text-red-500" : "text-primary"
                }`
              : "top-3 text-gray3"
          }`}
        >
          {label}
        </label>

        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ${
            showMenu ? "rotate-180" : ""
          }`}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <ArrowSVG />
        </div>
      </div>

      {showMenu && (
        <div className="absolute top-[60px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
           <div className="p-3">
              <input
                type="text"
                placeholder="Search customer..."
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
          ) : CustomerOptions?.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No Customers Found</div>
          ) : (
            CustomerOptions.map((option) => (
              <div
                key={option._id}
                onClick={() => handleSelect(option)}
                className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                  value === option._id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {option?.name}
              </div>
            ))
          )}
        </div>
      )}

      {error && <TextError>{error}</TextError>}
    </div>
  );
};

export default SingleCustomer;
