import React, { useRef } from "react";
import ArrowSVG from "../../assets/svgs/ArrowSVG";
import useToggle from "hooks/useToggle";
import useClickOutside from "utils/clickOutside";

const PeriodDropdown = ({ selected, setSelected }) => {
  const menuRef = useRef();
  const [showMenu, toggleShowMenu] = useToggle(false);

  useClickOutside(menuRef, () => toggleShowMenu(false));

  const options = ["Year", "Month", "Week"];

  const handleSelect = (option) => {
    setSelected(option);
    toggleShowMenu(false);
  };

  return (
    <div className="relative w-[148px] h-[50px]" ref={menuRef}>
      {/* Button */}
      <div
        onClick={() => toggleShowMenu()}
        className="w-full h-full bg-light2 rounded-[10px] border border-pure/35 px-3 flex items-center justify-between text-gunmetal cursor-pointer select-none"
      >
        <span className="font-semibold">{selected}</span>
        <div
          className={`transition-transform duration-300 ${
            showMenu ? "rotate-180" : ""
          }`}
        >
          <ArrowSVG />
        </div>
      </div>

      {/* Menu */}
      {showMenu && (
        <div className="absolute top-[55px] left-0 w-[148px] bg-light2 border border-pure/35 rounded-[10px] shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 cursor-pointer hover:bg-pure/10 font-medium ${
                selected === option ? "text-primary" : "text-gunmetal"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PeriodDropdown;
