
import React, { useState, useRef } from "react";
import { ErrorMessage } from "formik";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import TextError from 'components/global/form/TextError';

const ApplicantTypeSelect = (props) => {
  const { label, name, formik, type = "text", options = [], ...rest } = props;

  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setShowMenu(false));

  const storedValue = formik.values[name];

  const isError = formik.touched[name] && formik.errors[name];
  const isActive = focused || storedValue;

  const selectedLabel = (() => {
    if (!storedValue) return "";
    const found = options.find(
      (opt) => (opt?.value ?? opt) === storedValue
    );
    return found?.key || found || "";
  })();

  const handleSelect = (option) => {
    const actualValue = option.value ?? option;   
    formik.setFieldValue(name, actualValue);
    formik.setFieldTouched(name, true, false);
    setShowMenu(false);
  };

  return (
    <div className="relative form-row" ref={dropdownRef}>
      <div
        className={`relative w-full transition-all duration-300 rounded-lg border ${
          isError ? "border-red-500" : "border-lighter"
        }`}
      >
        <input
          id={name}
          name={name}
          type="text"
          value={selectedLabel}
          onFocus={() => {
            setFocused(true);
            setShowMenu(true);
          }}
          onBlur={() => {
            setFocused(false);
            formik.setFieldTouched(name, true);
          }}
          readOnly
          className="w-full bg-transparent py-2 h-[32px] px-4 text-sm   text-primary rounded-lg outline-none cursor-pointer"
        />

        {/* Floating Label */}
        <label
          htmlFor={name}
          className={`absolute left-4 bg-light2 px-1 transition-all duration-300 pointer-events-none ${
            isActive
              ? `top-[-10px] text-[12px] font-light ${
                  isError
                    ? "text-red-500"
                    : focused
                    ? "text-primary"
                    : "text-gray3"
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
            const label = option.key ?? option;
            const actualValue = option.value ?? option;

            return (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                  storedValue === actualValue
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

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};


export default ApplicantTypeSelect;
