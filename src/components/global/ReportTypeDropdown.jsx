import React, { useRef } from "react";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useToggle from "hooks/useToggle";
import useClickOutside from "utils/clickOutside";

const ReportTypeDropdown = ({ selected, setSelected, options = [] }) => {
  const menuRef = useRef();
  const [showMenu, toggleShowMenu] = useToggle(false);

  useClickOutside(menuRef, () => toggleShowMenu(false));

  const handleSelect = (option) => {
    setSelected(option.value);
    toggleShowMenu(false);
  };

  const selectedLabel =
    options.find((o) => o.value === selected)?.label || "Select";

  return (
    <div className="relative  h-[50px]" ref={menuRef}>
      {/* Button */}
      <div
        onClick={() => toggleShowMenu()}
        className="w-full h-full bg-light2 rounded-[10px] border border-pure/35 px-3 flex items-center justify-between text-gunmetal cursor-pointer select-none"
      >
        <span className="font-semibold truncate">{selectedLabel}</span>
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
        <div className="absolute top-[55px] left-0 w-full bg-light2 border border-pure/35 rounded-[10px] shadow-lg z-10 overflow-hidden">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 cursor-pointer hover:bg-pure/10 font-medium ${
                selected === option.value ? "text-primary" : "text-gunmetal"
              }`}
            >
              {option.label}
              {option?.hint ? (
                <p className="text-xs text-gunmetal/70">{option.hint}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportTypeDropdown;