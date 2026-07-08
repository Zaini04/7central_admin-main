import React, { useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";

import TextError from "components/global/form/TextError";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import Axios from "config/api";
import { setStats } from "redux/slices/inventorySlice";
import { BeatLoader } from "react-spinners";

const InventorySelect = ({ label, value, onChange, error }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const { docs: inventoryOptions } = useSelector((state) => state.inventory);
  const [pageSize] = useState(25);

  useClickOutside(dropdownRef, () => setShowMenu(false));

  const selectedLabel = useMemo(() => {
    return inventoryOptions.find((p) => p._id === value)?.longAutoIncrementId || "";
  }, [inventoryOptions, value]);

  const { isLoading } = useQuery(
    ["fetch-inventory"],
    () => Axios(`/inventory?pageSize=${pageSize}`),
    {
      onSuccess: (res) => {
        const { docs, pages, docsCount, page } = res.data.data;
        dispatch(setStats({ docs, pages, docsCount, page }));
      },
    }
  );

  const handleSelect = (id) => {
    onChange(id);
    setShowMenu(false);
  };

  return (
    <div className="relative form-row" ref={dropdownRef}>
      {/* Input box */}
      <div
        className={`relative w-full rounded-lg border transition ${
          error ? "border-red-500" : "border-lighter"
        } cursor-pointer`}
        onClick={() => setShowMenu((p) => !p)}
      >
        <input
          type="text"
          readOnly
          value={selectedLabel}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full py-3 px-4 text-[15px] text-primary bg-transparent"
        />

        <label
          className={`absolute left-4 px-1 transition-all duration-300 pointer-events-none ${
            focused || value
              ? `top-[-10px] text-[13px] bg-light2 ${error ? "text-red-500" : "text-gray3"}`
              : "top-3 text-gray3"
          }`}
        >
          {label}
        </label>

        <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${showMenu ? "rotate-180" : ""}`}>
          <ArrowSVG />
        </div>
      </div>

      {/* Dropdown */}
      {showMenu && (
        <div className="absolute top-[60px] left-0 w-full bg-white border rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
          {isLoading ? (
            <div className="py-4 flex justify-center">
              <div className="flex flex-col gap-1">
                <BeatLoader size={13} color="#2D3748" />
                <span className="text-gray-400 text-xs sm:text-sm">Loading...</span>
              </div>
            </div>
          ) : inventoryOptions?.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No Inventory Found</div>
          ) : (
            inventoryOptions.map((item) => (
              <div
                key={item._id}
                className={`px-3 py-2 cursor-pointer ${
                  value === item._id ? "bg-primary text-white" : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleSelect(item._id)}
              >
                {item.longAutoIncrementId}
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
