import React, { useState, useRef } from "react";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import TextError from "components/global/form/TextError";

const MultiSelect = ({ label, name, options = [], formik, onSelect, onRemove }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Extract method strings from parts array
  const selectedValues = (formik.values[name] || []).map((p) => p.method);

  useClickOutside(dropdownRef, () => setShowMenu(false));

  const isSelected = (value) => selectedValues.includes(value);

  const handleToggleSelect = (option) => {
    const exists = formik.values[name].some((p) => p.method === option.value);

    if (!exists) {
      // Use the onSelect callback instead of directly setting formik values
      if (onSelect) {
        onSelect(option);
      } else {
        // Fallback to direct formik update if no callback provided
        formik.setFieldValue(name, [
          ...formik.values[name],
          { method: option.value, amount: "", paidAt: "", reference: "" },
        ]);
      }
    } else {
      // Use the onRemove callback instead of directly setting formik values
      if (onRemove) {
        onRemove(option);
      } else {
        // Fallback to direct formik update if no callback provided
        formik.setFieldValue(
          name,
          formik.values[name].filter((p) => p.method !== option.value)
        );
      }
    }
  };

  // Helper to get label from value
  const getLabel = (value) => {
    const option = options.find((o) => o.value === value);
    return option ? option.label : value;
  };

  const isActive = selectedValues.length > 0;

  return (
    <div className="relative form-row w-full" ref={dropdownRef}>
      <div className="relative w-full transition-all duration-300 py-1 rounded-lg border border-lighter">
        {/* Selected items display */}
        <div
          className="flex flex-wrap gap-2 py-2 px-3 cursor-pointer min-h-[48px]"
          onClick={() => setShowMenu(true)}
        >
          {selectedValues.length > 0 &&
            selectedValues.map((value) => (
              <span
                key={value}
                className="bg-primary text-white text-xs rounded-full px-2 py-0.5 mt-1.5 font-semibold flex items-center gap-1"
              >
                {getLabel(value)}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSelect({ value }); // remove item
                  }}
                >
                  ×
                </button>
              </span>
            ))}

          {/* Floating label */}
          <label
            className={`absolute left-3 bg-light2 px-1 transition-all duration-300 pointer-events-none ${
              isActive ? "top-[-10px] text-[13px] text-gray3" : "top-3 text-gray3"
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
          <div className="absolute top-[65px] md:top-[60px] left-0 w-full bg-white border rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
            {options.map((option) => {
              const selected = isSelected(option.value);
              return (
                <div
                  key={option.value}
                  onClick={() => {
                    handleToggleSelect(option);
                    setShowMenu(false);
                  }}
                  className={`px-3 py-2 cursor-pointer ${
                    selected
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        )}

        {/* Error */}
        {formik.errors[name] && formik.touched[name] && (
          <TextError>{formik.errors[name]}</TextError>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;