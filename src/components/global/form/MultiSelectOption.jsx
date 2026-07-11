import React, { useState, useRef, useMemo } from "react";
import { ErrorMessage } from "formik";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import TextError from "./TextError";

const MultiSelectOption = ({ label, name, formik, options = [], ...rest }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setShowMenu(false));

  const storedValue = formik.values[name] || [];
  const isError = formik.touched[name] && formik.errors[name];
  const isActive = focused || storedValue.length > 0;

  // Select or unselect
  const handleSelect = (option) => {
    let newValue;
    if (storedValue.includes(option)) {
      newValue = storedValue.filter((val) => val !== option);
    } else {
      newValue = [...storedValue, option];
    }
    formik.setFieldValue(name, newValue);
    formik.setFieldTouched(name, true, false);
  };

  // Remove selected tag
  const handleRemove = (value) => {
    const newValue = storedValue.filter((val) => val !== value);
    formik.setFieldValue(name, newValue);
  };

  // Filter options for search
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options]);

  return (
    <div className="relative form-row" ref={dropdownRef}>
      <div
        className={`relative w-full transition-all duration-300 py-1 rounded-lg border ${
          isError ? "border-red-500" : "border-lighter"
        }`}
      >
        {/* Selected tags */}
        <div
          className="flex flex-wrap gap-2 py-2 px-3 cursor-pointer min-h-[48px]"
          onClick={() => setShowMenu(true)}
        >
          {storedValue.map((val) => (
            <div
              key={val}
              className="flex items-center bg-primary text-white text-[13px] mt-2 px-2 py-1 rounded-full"
            >
              <span>{val}</span>
              <button
                type="button"
                className="ml-1 text-white font-bold  "
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(val);
                }}
              >
                &times;
              </button>
            </div>
          ))}

          {!storedValue.length && <span className="text-gray3">&nbsp;</span>}
        </div>

        {/* Floating Label */}
        <label
          className={`absolute -top-7 left-0 px-1 transition-all duration-300 pointer-events-none ${
            isActive
              ? `top-[-10px] text-[12px] font-light ${
                  isError
                    ? "text-red-500"
                    : focused
                    ? "text-primary"
                    : "text-gray3"
                }`
              : "top-3 text-[#1F2020]"
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
          <div className="flex flex-col gap-3">
            <div className="p-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            {filteredOptions.map((option, index) => {
              const selected = storedValue.includes(option);
              return (
                <div
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                    selected
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {option}
                </div>
              );
            })}

            {filteredOptions.length === 0 && (
              <div className="px-3 py-2 text-gray-400">No options found</div>
            )}
          </div>
        </div>
      )}

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default MultiSelectOption;
