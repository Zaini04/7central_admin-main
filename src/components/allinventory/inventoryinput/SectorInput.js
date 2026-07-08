import React, { useState, useRef, useEffect } from "react";
import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import useClickOutside from "utils/clickOutside";
import { useQuery } from "react-query";
import Axios from "config/api";
import { BeatLoader } from "react-spinners";

const SectorInput = ({ name, placeholder = "Select Sector", onSelect }) => {
  const menuRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const [sectors, setSectors] = useState([]);  


  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useClickOutside(menuRef, () => setShowMenu(false));

const queryKey1 = ['get-sectors'];

const { data: sectorData, isLoading } = useQuery({
  queryKey: queryKey1,
  queryFn: () => Axios.get('/sector'),
  refetchOnWindowFocus: false,
  onSuccess: (res) => {
    // Safely extract docs
    const docs = res?.data?.data?.docs || [];
    setSectors(docs);
  },
});
useEffect(() => {
  const search = inputValue.toLowerCase();
  const filtered = sectors.filter((p) =>
    p.title.toLowerCase().includes(search)
  );

  setFilteredOptions(filtered);

  if (filtered.length === 0) {
    onSelect("");
  }
}, [inputValue, sectors]);


  const handleSelect = (option) => {
    setInputValue(option.title);
    onSelect(option._id);     
    setShowMenu(false);
  };

  return (
    <div className="relative w-full" ref={menuRef}>
      {/* Searchable Input */}
      <div className="relative">
      <input
  type="text"
  placeholder={placeholder}
  value={inputValue}
  onChange={(e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowMenu(true);

    if (value.trim() === "") {
      onSelect && onSelect("");
    }
  }}
  onFocus={() => setShowMenu(true)}
  className="w-full h-[40px] bg-white rounded-xl  px-3 pr-8 text-sm  text-gunmetal focus:outline-none focus:border-primary"
/>
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ${
            showMenu ? "rotate-180" : ""
          }`}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <ArrowDownSvg />
        </div>
      </div>

      {/* Dropdown */}
      {showMenu && (
        <div
          className="absolute top-[60px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md  z-10"
          style={{ maxHeight: "250px", overflowY: "auto" }}
        >

        {isLoading ? (
  <div className="py-4 flex justify-center">
    <div className="flex flex-col gap-1">
      <BeatLoader size={13} color="#2D3748" />
      <span className="text-gray-400 text-xs sm:text-sm">Loading...</span>
    </div>
  </div>
) : filteredOptions.length === 0 ? (
  <div className="px-3 py-2 text-gray-400">No Sector Found</div>
) : (
  filteredOptions.map((option) => (
    <div
      key={option._id}
      onClick={() => handleSelect(option)}
      className="px-3 py-2 text-sm  md:text-base cursor-pointer hover:bg-gray-100 text-gray-700"
    >
      {option.title}
    </div>
  ))
)}

        </div>
      )}
    </div>
  );
};

export default SectorInput;
