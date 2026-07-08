import React, { useState, useRef, useEffect } from "react";
import ArrowDownSvg from "assets/svgs/ArrowDownSvg";
import useClickOutside from "utils/clickOutside";

const SelectInput = ({ name, placeholder = "Select Option", options = [], onSelect }) => {
  const menuRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useClickOutside(menuRef, () => setShowMenu(false));


  useEffect(() => {
    const lower = inputValue.toLowerCase();
    const filtered = options.filter((opt) => opt.toLowerCase().includes(lower));
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  const handleSelect = (option) => {
    setInputValue(option);
    onSelect && onSelect(option);
    setShowMenu(false);
  };

  return (
    <div className="relative w-full " ref={menuRef}>
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value);
            setShowMenu(true);

   
            if (value === "") {
              onSelect && onSelect("");
            }
          }}
          onFocus={() => setShowMenu(true)}
          className="w-full h-[40px] bg-white placeholder:text-sm  text-sm  rounded-xl  px-3 pr-8 text-gunmetal 
                     focus:outline-none focus:border-primary"
        />

        {/* Arrow */}
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
          className="absolute top-[60px] left-0 w-full bg-white border border-gray-300 rounded-xl shadow-md z-10"
          style={{ maxHeight: "250px", overflowY: "auto" }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-3 py-2 cursor-pointer text-sm  md:text-base transition-colors duration-150 ${
                  inputValue === option
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400 italic">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
