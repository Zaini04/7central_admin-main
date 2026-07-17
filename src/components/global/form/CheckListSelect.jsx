import React, { useState, useRef } from "react";
import { ErrorMessage } from "formik";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import TextError from "./TextError";

const CheckListSelect = (props) => {
  const {
    label,
    name,
    formik,
    placeholder,
    options = [],
    checkedValues = [],
    valueMap = null,
    ...rest
  } = props;

  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setShowMenu(false));

  const storedValue = formik.values[name];
  const isError = formik.touched[name] && formik.errors[name];
  const isActive = focused || storedValue;

  const selectedLabel = (() => {
    if (!storedValue) return "";
    const found = options.find((opt) => (opt?.value ?? opt) === storedValue);
    return found?.key || found || "";
  })();

  const isPermanentlyChecked = (actualValue) => {
    const mappedValue = valueMap ? (valueMap[actualValue] || actualValue) : actualValue;
    return checkedValues.includes(mappedValue);
  };

  const handleSelect = (option) => {
    const actualValue = option.value ?? option;
    if (isPermanentlyChecked(actualValue)) return;

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
          placeholder={placeholder}
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
          className="w-full bg-transparent py-2 px-4 text-sm text-primary rounded-lg outline-none cursor-pointer"
        />

        <label
          htmlFor={name}
          className={`absolute -top-8 left-0  px-1 transition-all duration-300 pointer-events-none ${
            isActive
              ? `top-[-10px] text-[12px] font-light ${
                  isError ? "text-red-500" : focused ? "text-primary" : "text-gray3"
                }`
              : "top-3 text-gray3"
          }`}
        >
          {label}
        </label>

        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ${
            showMenu ? "rotate-180" : ""
          }`}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <ArrowSVG />
        </div>
      </div>

      {showMenu && (
        <div className="absolute top-[52px] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-[260px] overflow-y-auto py-1.5">
          {options.map((option, index) => {
            const optionLabel = option.key ?? option;
            const actualValue = option.value ?? option;
            const locked = isPermanentlyChecked(actualValue);
            const active = storedValue === actualValue;

            return (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`flex items-center gap-3 px-4 py-2.5 mx-1.5 rounded-lg transition-colors duration-150 ${
                  locked
                    ? "opacity-50 cursor-not-allowed"
                    : active
                    ? "bg-primary/10 cursor-pointer"
                    : "hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 ${
                    locked || active ? "bg-primary border-primary" : "border-gray-300 bg-white"
                  }`}
                >
                  {(locked || active) && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                <span
                  className={`text-sm ${
                    locked ? "text-gray-400" : active ? "text-primary font-medium" : "text-gray-700"
                  }`}
                >
                  {optionLabel}
                </span>

                {/* {locked && (
                  <span className="ml-auto text-[10px] text-gray-400 font-medium">
                    Already Added
                  </span>
                )} */}
              </div>
            );
          })}
        </div>
      )}

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default CheckListSelect;