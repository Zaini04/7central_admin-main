import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { useFormikContext } from "formik";
import Axios from "config/api";
import { setStats } from "redux/slices/inventorySlice";
import { BeatLoader } from "react-spinners";
import useClickOutside from "utils/clickOutside";
import TextError from "components/global/form/TextError";
import ArrowSVG from "assets/svgs/ArrowSVG";
import {setDocinventoryExtraDetails} from 'redux/slices/inventorySlice'


const SelectInventory = ({ label = "Inventory", 
  value, 
   project,
  sector,
  disabled, onSelect, error }) => {
  const [keyword, setKeyword] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  
  const dropdownRef = useRef(null);
  const { docs } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const pageSize = 10;

  // Formik integration
  const { setFieldValue, setFieldTouched } = useFormikContext();

  useClickOutside(dropdownRef, () => setShowMenu(false));

const handleSelect = (item) => {
  if (onSelect) {
    onSelect(item);
  } else {
    setFieldValue("selectedInventory", item);
  }

  setFieldTouched("selectedInventory", true, false);

  dispatch(setDocinventoryExtraDetails(item));

  setKeyword("");
  setShowMenu(false);
};


  const handleInputChange = (e) => {
    setKeyword(e.target.value);
    setShowMenu(true);
  };

  const handleInputFocus = () => {
    setFocused(true);
    setShowMenu(true);
    setFieldTouched("selectedInventory", true, false);
  };

  const handleInputBlur = () => {
    setFocused(false);
    // Don't set showMenu to false here to allow clicking on options
  };

  const { isLoading } = useQuery(
    ["fetch-inventory", keyword, project, sector,],
    async () => {
      let url = `/inventory?pageSize=${pageSize}&sector=${sector}&project=${project}&status=assigned`;
      if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
      const res = await Axios.get(url);
      return res.data.data;
    },
    {
          enabled: !disabled,  
      onSuccess: (data) => {
        const { docs, pages, docsCount, page } = data;
        dispatch(setStats({ docs, pages, docsCount, page }));
      },
    }
  );

  // Use value from props or get it from Formik context
  const selectedInventory = value;

  return (
    <div className="relative form-row" ref={dropdownRef}>
      <div
        className={`relative w-full rounded-lg border   transition-all duration-300
         ${
    disabled
      ? "bg-gray-100/50 cursor-not-allowed"
      : `cursor-pointer ${error ? "border-red-500" : "border-lighter"}`
  }
        `}
      >
        <input
          type="text"
             disabled={disabled}   
          value={selectedInventory?.fullNumber || ""}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          className="w-full text-gunmetal bg-transparent py-2 h-[32px] px-4 text-base rounded-lg outline-none cursor-text"
          readOnly // Make it read-only to prevent manual typing
        />

        <label
          className={`absolute left-0 px-1 transition-all duration-300  pointer-events-none
            ${focused || selectedInventory ? "top-[-10px] text-[12px] text-primary  bg-light2" : "top-4 text-gray3"}
            ${error ? "text-red-500" : ""}
          `}
        >
          {label}
        </label>

        {   !disabled  && (
            <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ${showMenu ? "rotate-180" : ""}`}
          onClick={() => setShowMenu(prev => !prev)}
        >
          <ArrowSVG />
        </div>

        )}

      
      </div>

      {showMenu && !disabled && (

        <div className="absolute top-[60px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
          <div className="p-2 border-b">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search Inventory"
              className="w-full px-2 py-1 border rounded-md text-sm focus:outline-none"
              autoFocus
            />
          </div>

          {isLoading ? (
            <div className="py-4 flex justify-center">
              <BeatLoader size={13} color="#2D3748" />
            </div>
          ) : docs && docs.length > 0 ? (
            docs.map((item) => (
              <div
                key={item?._id}
                onClick={() => handleSelect(item)}
                className={`px-3 py-2 cursor-pointer transition-colors ${
                  selectedInventory?._id === item?._id ? "bg-primary text-white" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item?.fullNumber}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400 italic">No matching items</div>
          )}
        </div>
      )}

      {error && <TextError>{error}</TextError>}
    </div>
  );
};

export default SelectInventory;