import { useState, useRef } from "react";
import { ErrorMessage } from "formik";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import TextError from "./TextError";

// static list, edit/add levels as needed
const EDUCATION_LEVELS = [
  { name: "Matric", code: "matric" },
  { name: "Intermediate", code: "intermediate" },
  { name: "Undergraduate", code: "undergraduate" },
  { name: "Graduate", code: "graduate" },
  { name: "Masters", code: "masters" },
  { name: "MPhil", code: "mphil" },
  { name: "PhD", code: "phd" },
];

const EducationInput = ({ name, formik, label = "Education" }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef(null);

  const value = formik.values[name] || "";
  const isError = formik.touched[name] && formik.errors[name];
  const isActive = focused || value !== "";

  useClickOutside(dropdownRef, () => setShowMenu(false));

  const handleSelect = (option) => {
    formik.setFieldValue(name, option.name);
    // if you track a code field too, e.g. educationCode
    formik.setFieldValue("educationCode", option.code);
    setShowMenu(false);
  };

  return (
    <div className="relative form-row" ref={dropdownRef}>
      <div
        className={`relative w-full rounded-lg border transition-all duration-300 ${
          isError
            ? "border-red-500"
            : focused
            ? "border-primary"
            : "border-[#9A9A9A]"
        }`}
      >
        <input
          id={name}
          name={name}
          type="text"
          readOnly
          value={value}
          onFocus={() => {
            setFocused(true);
            setShowMenu(true);
          }}
          onBlur={() => {
            setFocused(false);
            formik.setFieldTouched(name, true);
          }}
          placeholder="Select Education"
          className="w-full bg-transparent py-2 px-4 rounded-lg outline-none cursor-pointer"
        />

        <label
          htmlFor={name}
          className={`absolute -top-8 left-0 px-1 transition-all duration-300 pointer-events-none ${
            isActive
              ? `top-[-10px] text-[13px] ${
                  isError
                    ? "text-red-500"
                    : focused
                    ? "text-primary"
                    : "text-gray3"
                }`
              : "top-[-10px] text-[#1F2020]"
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
        <div className="absolute top-[60px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
          {EDUCATION_LEVELS.map((option) => (
            <div
              key={option.code}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 cursor-pointer transition-colors ${
                value === option.name
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default EducationInput;