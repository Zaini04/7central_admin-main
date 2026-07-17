import React, { useState, useRef } from "react";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { setStats,setDocMultipleDetails,removeDocMultipleDetails } from "redux/slices/customerSlice";
import Axios from "config/api";

import TextError from "components/global/form/TextError";
import { BeatLoader } from "react-spinners";

const MultiCustomerSelect = ({ label, name,placeholder, selectedCustomers = [], error, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const CustomerOptions = useSelector((state) => state.customer.docs) || [];
  const selectedItems = Array.isArray(selectedCustomers) ? selectedCustomers : [];

  const isSelected = (item) =>
    selectedItems.some((t) => t?._id === item?._id);

  const { isLoading } = useQuery(
    ["fetch-all-customer", searchTerm],
    async () => {
      let url = `/customer`;
      if (searchTerm) {
        url += `?keyword=${encodeURIComponent(searchTerm)}`;
      }
      const response = await Axios.get(url);
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const { docs, pages, docsCount, page } = data.data;
        dispatch(setStats({ docs, pages, docsCount, page }));
      },
    }
  );

  useClickOutside(dropdownRef, () => setShowMenu(false));

  const storedValue = selectedCustomers;
  const isActive = focused || storedValue.length > 0;

  const handleToggleSelect = (item) => {
    if (isSelected(item)) {
      onChange(selectedItems.filter((t) => t?._id !== item?._id));
          dispatch(removeDocMultipleDetails(item._id));
    } else {
      onChange([...selectedItems, item]);
          dispatch(setDocMultipleDetails(item));

    }
  };

  const handleRemove = (id) => {
    onChange(selectedItems.filter((item) => item._id !== id));
          dispatch(removeDocMultipleDetails(id));

  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative  form-row" ref={dropdownRef}>
      <div placeholder={placeholder} className="relative  w-full h-[40px] transition-all duration-300 py-1 rounded-lg border border-lighter">
        {/* Selected items */}
        <div
          className="flex flex-wrap gap-2 py-2 px-3 cursor-pointer min-h-[48px]"
          onClick={() => setShowMenu(true)}
        >
          {selectedItems.length > 0 &&
            selectedItems.map((item) => (
              <span
                key={item?._id}
                className="bg-primary   text-white  text-[14px]  rounded-full px-4 py-0.5 mb-8  font-semibold flex items-center gap-1"
              >
                {item?.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item?._id);
                  }}
                  className="text-sm text-white"
                >
                  ×
                </button>
              </span>
            ))}

          {/* Floating label */}
          <label
            className={`absolute left-0  px-1 transition-all duration-300 pointer-events-none ${
              isActive ? "top-[-10px] text-[12px] text-gray3" : "top-3 text-gray3"
            }`}
          >
            {label}
          </label>

          {/* Arrow */}
          <div
            className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ${
              showMenu ? "rotate-180" : ""
            }`}
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <ArrowSVG />
          </div>
        </div>

        {/* Dropdown */}
        {showMenu && (
          <div className="absolute top-[60px] left-0 w-full bg-white border rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
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
                <div className="flex flex-col gap-1">
                  <BeatLoader size={13} color="#2D3748" />
                  <span className="text-gray-400 text-xs sm:text-sm">Loading...</span>
                </div>
              </div>
            ) : CustomerOptions?.length > 0 ? (
              CustomerOptions.map((customer) => {
                const selected = isSelected(customer);
                return (
                  <div
                    key={customer?._id}
                  onClick={() => {
            handleToggleSelect(customer);
            setShowMenu(false);
          }}

                    className={`px-3 py-2 cursor-pointer ${
                      selected ? "bg-primary text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {customer?.name}
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-gray-400">No customers found</div>
            )}
          </div>
        )}

        {error && <TextError>{error}</TextError>}
      </div>
    </div>
  );
};

export default MultiCustomerSelect;
