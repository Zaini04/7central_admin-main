import { useState, useRef } from "react";
import { ErrorMessage } from "formik";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import TextError from 'components/global/form/TextError';
import Axios from "config/api";
import { setStats } from "redux/slices/inventorySlice";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";



const InventoryInput = ({ name, formik, label = "Select Inventory" }) => {
  const [keyword, setKeyword] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);

  const dropdownRef = useRef(null);
  const { docs: inventoryOptions } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const pageSize = 10;

  const [select,setSelected]=useState('');

  const value = formik.values[name] || "";
  const isError = formik.touched[name] && Boolean(formik.errors[name]);
  const isActive = focused || value !== "";

  useClickOutside(dropdownRef, () => setShowMenu(false));

  const handleSelect = (item) => {
    formik.setFieldValue(name, item?._id);
    setSelected(item?.fullNumber)
    setKeyword("");
    setShowMenu(false);
  };

  // Fetch inventory using react-query
  const { isLoading } = useQuery(
    ["fetch-inventory", keyword],
    async () => {
      let url = `/inventory?pageSize=${pageSize}`;
      if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
      const res = await Axios.get(url);
      return res.data.data;
    },
    {
      onSuccess: (data) => {
        const { docs, pages, docsCount, page } = data;
        dispatch(setStats({ docs, pages, docsCount, page }));
      },

    }
  );



  return (
    <div className="relative form-row" ref={dropdownRef}>
      <div
        className={`relative w-full rounded-lg border transition-all duration-300 ${
          isError
            ? "border-red-500"
            : focused
            ? "border-primary"
            : "border-lighter"
        }`}
      >
        <input
          id={name}
          name={name}
          type="text"
          value={select}
          onFocus={() => {
            setFocused(true);
            setShowMenu(true);
          }}
          onBlur={() => {
            setFocused(false);
            formik.setFieldTouched(name, true);
          }}
          placeholder="Select or type item..."
          onChange={(e) => {
            setKeyword(e.target.value);
            formik.setFieldValue(name, e.target.value);
            setShowMenu(true);
          }}
          className="w-full bg-transparent py-3 px-4 text-base rounded-lg outline-none cursor-text"
        />

        <label
          htmlFor={name}
          className={`absolute left-4 px-1 transition-all duration-300 bg-light2 pointer-events-none ${
            isActive
              ? `top-[-10px] text-[13px] ${
                  isError
                    ? "text-red-500"
                    : focused
                    ? "text-primary"
                    : "text-gray3"
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
          <div className="p-2 border-b">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search item..."
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
          ) : inventoryOptions && inventoryOptions.length > 0 ? (
            inventoryOptions.map((item) => (
              <div
                key={item}
                onClick={() => handleSelect(item)}
                className={`px-3 py-2 cursor-pointer transition-colors ${
                  value === item
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item?.fullNumber}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400 italic">
              No matching items
            </div>
          )}
        </div>
      )}

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default InventoryInput;
