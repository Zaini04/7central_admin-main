import { useState, useRef } from "react";
import ArrowSVG from "assets/svgs/ArrowSVG";
  import ArrowDownSvg from "assets/svgs/ArrowDownSvg";

import useClickOutside from "utils/clickOutside";
import Axios from "config/api";
import { setStats } from "redux/slices/customerSlice";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";

const SelectCustomer = ({ label = " Customer", onSelect }) => {
  const [keyword, setKeyword] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");

  const dropdownRef = useRef(null);
    const { docs } = useSelector(state => state.customer);
  const dispatch = useDispatch();
  const pageSize = 10;

  useClickOutside(dropdownRef, () => setShowMenu(false));

  const handleSelect = (item) => {
    setSelectedId(item?._id);
    setSelectedLabel(item?.name);
    setKeyword("");
    setShowMenu(false);

    // send selection to parent
    if (onSelect) onSelect(item._id);
  };

  // Fetch inventory using react-query
  const { isLoading } = useQuery(
    ["fetch-customer", keyword],
    async () => {
      let url = `/customer?pageSize=${pageSize}`;
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
    <div className="relative form-row " ref={dropdownRef}>
      <div
        className={`relative w-full rounded-lg border  h-[56px] transition-all duration-300 ${
          focused ? "border-primary" : "border-lighter"
        }`}
      >
          <input
  type="text"
  value={selectedLabel}
  onFocus={() => {
    setFocused(true);
    setShowMenu(true);
  }}
  onBlur={() => setFocused(false)}
  onChange={(e) => {
    const value = e.target.value; 

    setKeyword(value);
    setSelectedLabel(value);
    setShowMenu(true);

    if (value === "") {
      setSelectedId("");
      if (onSelect) onSelect("");
    }
  }}
  className="w-full text-gunmetal bg-transparent py-3 px-4 h-full text-base rounded-lg outline-none cursor-text"
/>

        <label
          className={`absolute left-4 px-1 transition-all duration-300 bg-light2 pointer-events-none ${
            focused || selectedLabel !== ""
              ? "top-[-10px] text-[13px] text-primary"
              : "top-4 text-gray3"
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
          <ArrowDownSvg />
        </div>
      </div>

      {showMenu && (
        <div className="absolute top-[60px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
          <div className="p-2 border-b">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search Customer"
              className="w-full px-2 py-1 border rounded-md text-sm focus:outline-none"
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
                  selectedId === item?._id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item?.name}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400 italic">No matching items</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectCustomer;
