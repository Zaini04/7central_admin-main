import React, { useState, useRef } from "react";
import useToggle from "hooks/useToggle";
import useClickOutside from "utils/clickOutside";
import ArrowSVG from "../../assets/svgs/ArrowSVG";

const PageLimit = ({totalpages=9999, limit, setLimit }) => {
  const menuRef = useRef();
  const [showMenu, toggleShowMenu] = useToggle(false);

  const options = [
    { label: "Show 10", value: 10 },
    { label: "Show 25", value: 25 },
    { label: "Show 50", value: 50 },
    { label: "Show 100", value: 100 },
    { label: "Show All", value: totalpages },
  ];

  const [selected, setSelected] = useState(
    options.find(opt => opt.value === limit)?.label || "Show 10"
  );

  // Close dropdown when clicking outside
  useClickOutside(menuRef, () => toggleShowMenu(false));

  const handleSelect = (option) => {
    setSelected(option.label);
    setLimit(option.value);
    toggleShowMenu(false);
    // console.log("Selected limit:", option.value);
  };

  return (
    <div className="relative w-full h-full" ref={menuRef}>
      {/* Dropdown trigger */}
      <div
        onClick={toggleShowMenu}
        className="w-full bg-light2 rounded-[10px] border border-gray-300 px-3 py-2 flex items-center justify-between text-gunmetal h-full cursor-pointer select-none"
      >
        <span className="font-normal">{selected}</span>
        <div className={`transition-transform duration-300 ${showMenu ? "rotate-180" : ""}`}>
          <ArrowSVG />
        </div>
      </div>

      {/* Dropdown menu */}
      {showMenu && (
        <div className="absolute top-[-210px] mt-1 left-0 w-full bg-white border border-gray-300 shadow-md z-10">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                selected === option.label ? "bg-primary text-white" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageLimit;
