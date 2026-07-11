import React, { useState, useRef } from "react";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import TextError from "components/global/form/TextError";

const MultiSeclect = ({
label,
name,
value,       
onChange,      
placeholder,
onBlur,         
error,        
options = [],
}) => {
const [showMenu, setShowMenu] = useState(false);
const [focused, setFocused] = useState(false);
const dropdownRef = useRef(null);

useClickOutside(dropdownRef, () => setShowMenu(false));

const isActive = focused || value;

// Find the label for the current value
const selectedLabel = (() => {
if (!value) return "";
const found = options.find((opt) => (opt.value ?? opt) === value);
return found ? found.label ?? found : "";
})();

const handleSelect = (option) => {
const actualValue = option.value ?? option;
onChange(actualValue);
setShowMenu(false);
};

return ( <div className="relative form-row" ref={dropdownRef}>
<div
className={`relative w-full transition-all duration-300 rounded-lg border ${
          error ? "border-red-500" : "border-lighter"
        }`}
>
{/* Input */}
<input
id={name}
name={name}
type="text"
placeholder={placeholder}
value={selectedLabel}
onFocus={() => {
setFocused(true);
setShowMenu(true);
}}
onBlur={() => {
setFocused(false);
onBlur && onBlur(name);
}}
readOnly
className="w-full bg-transparent py-2  px-4 text-sm h-[32px] text-primary rounded-lg outline-none cursor-pointer"
/>


    {/* Floating Label */}
    <label
      htmlFor={name}
      className={`absolute left-0 px-1 transition-all duration-300 pointer-events-none ${
        isActive
          ? `top-[-10px] text-[13px] font-light ${
              error ? "text-red-500" : focused ? "text-primary" : "text-gray3"
            }`
          : "top-3 text-gray3"
      }`}
    >
      {label}
    </label>

    {/* Arrow */}
    <div
      className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ${
        showMenu ? "rotate-180" : ""
      }`}
      onClick={() => setShowMenu((prev) => !prev)}
    >
      <ArrowSVG />
    </div>
  </div>

  {/* Dropdown */}
  {showMenu && (
    <div className="absolute top-[60px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
      {options.map((option, index) => {
        const label = option.label ?? option;
        const actualValue = option.value ?? option;
        return (
          <div
            key={index}
            onClick={() => handleSelect(option)}
            className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
              value === actualValue
                ? "bg-primary text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {label}
          </div>
        );
      })}
    </div>
  )}

  {/* Error */}
  {error && <TextError>{error}</TextError>}
</div>

);
};

export default MultiSeclect;
