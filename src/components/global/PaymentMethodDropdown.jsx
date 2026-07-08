import React, { useRef } from "react";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useToggle from "hooks/useToggle";
import useClickOutside from "utils/clickOutside";

const PaymentMethodDropdown = ({
  selected,
  setSelected,
  disabled = false,
  options = [],
  placeholder = "All Methods",
}) => {
  const menuRef = useRef();
  const [showMenu, toggleShowMenu] = useToggle(false);

  useClickOutside(menuRef, () => toggleShowMenu(false));

  const handleSelect = (option) => {
    setSelected(option.value);
    toggleShowMenu(false);
  };

  const selectedLabel =
    options.find((o) => o.value === selected)?.label || placeholder;

  return (
    <div className="relative  h-[50px]" ref={menuRef}>
      {/* Button */}
      <div
        onClick={() => {
          if (disabled) return;
          toggleShowMenu();
        }}
        className={`w-full h-full rounded-[10px] border px-3 flex items-center justify-between select-none
          ${
            disabled
              ? "bg-light2/60 border-pure/20 text-gunmetal/50 cursor-not-allowed"
              : "bg-light2 border-pure/35 text-gunmetal cursor-pointer"
          }`}
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
      {!disabled && showMenu && (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodDropdown;