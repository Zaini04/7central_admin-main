import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";

import TextError from "components/global/form/TextError";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import Axios from "config/api";
import { setStats } from "redux/slices/inventorySlice";
import { BeatLoader } from "react-spinners";

const InventorySelect = ({
  label,
  value,
  onChange,
  project,
  sector,
  disabled,
  error,
}) => {
  const [keyword, setKeyword] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { docs: inventoryOptions = [] } = useSelector((state) => state.inventory);

  useClickOutside(dropdownRef, () => setShowMenu(false));

  // Selected label from redux list (fallback)
  const selectedLabel = useMemo(() => {
    return inventoryOptions.find((p) => p._id === value)?.fullNumber || "";
  }, [inventoryOptions, value]);

  // What to show in input:
  // - if user is typing → show keyword
  // - else show selected item label
  const inputValue = keyword !== "" ? keyword : selectedLabel;

const [pageSize,setPageSize]=useState(10)

const { isLoading } = useQuery(
    ["fetch-inventory", project, sector, keyword, pageSize],
    async () => {
      let url = `/inventory?project=${project}&sector=${sector}&pageSize=${pageSize}&status=not_assigned`;
      if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
      const res = await Axios.get(url);
      return res.data.data;
    },
    {
      enabled: !disabled && Boolean(project) && Boolean(sector),
      onSuccess: (data) => {
        const { docs, pages, docsCount, page } = data;
        dispatch(setStats({ docs, pages, docsCount, page }));
        setPageSize(docsCount || 10);
      },
    }
  );

  const handleSelect = (item) => {
    if (disabled) return;
    onChange(item?._id);      // ✅ keeps your old API (id only)
    setKeyword("");           // ✅ clear search
    setShowMenu(false);
    setFocused(false);
  };

  const handleInputChange = (e) => {
    const v = e.target.value;
    if (disabled) return;

    setKeyword(v);
    setShowMenu(true);

    // If user cleared input, clear selection too
    if (v === "") {
      onChange(""); // or null based on your form
    }
  };

  const containerClasses = disabled
    ? "bg-gray-100 cursor-not-allowed border-gray-200"
    : `cursor-text ${error ? "border-red-500" : focused ? "border-primary" : "border-lighter"}`;

  return (
    <div className="relative form-row" ref={dropdownRef}>
      {/* Input box */}
      <div className={`relative w-full rounded-lg border h-[32px] transition-all duration-300 ${containerClasses}`}>
        <input
          type="text"
          disabled={disabled}
          value={disabled ? "" : inputValue}
          onFocus={() => {
            if (disabled) return;
            setFocused(true);
            setShowMenu(true);
          }}
          onBlur={() => setFocused(false)}
          onChange={handleInputChange}
          className="w-full py-2  px-4 h-full text-sm text-primary bg-transparent rounded-lg outline-none"
          placeholder=""
        />

        {/* Floating label */}
        <label
          className={`absolute left-0 px-1 transition-all duration-300 pointer-events-none  ${
            focused || inputValue
              ? `top-[-10px] text-[13px] ${error ? "text-red-500" : "text-gray3"}`
              : "top-3 text-gray3"
          }`}
        >
          {label}
        </label>

        {!disabled && (
          <div
            className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ${
              showMenu ? "rotate-180" : ""
            }`}
            onMouseDown={(e) => e.preventDefault()} // prevent blur
            onClick={() => setShowMenu((p) => !p)}
          >
            <ArrowSVG />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {showMenu && !disabled && (
        <div className="absolute top-[60px] left-0 w-full bg-white border rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
          {/* Optional: Search box inside dropdown (keep if you want) */}
          <div className="p-2 border-b">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search Inventory"
              className="w-full px-2 py-1 border rounded-md text-sm focus:outline-none"
            />
          </div>

          {isLoading ? (
            <div className="py-4 flex justify-center">
              <div className="flex flex-col gap-1 items-center">
                <BeatLoader size={13} color="#2D3748" />
                <span className="text-gray-400 text-xs sm:text-sm">Loading...</span>
              </div>
            </div>
          ) : inventoryOptions.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No Inventory Found</div>
          ) : (
            inventoryOptions.map((item) => (
              <div
                key={item._id}
                className={`px-3 py-2 cursor-pointer transition-colors ${
                  value === item._id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onMouseDown={(e) => e.preventDefault()} // prevent blur
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