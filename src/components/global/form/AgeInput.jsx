import { useState, useMemo, useRef } from "react";
import { ErrorMessage } from "formik";
import TextError from "./TextError";

// calculates age in full years from a "YYYY-MM-DD" date string
const calculateAge = (dobString) => {
  if (!dobString) return null;

  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return null;

  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  // subtract a year if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age >= 0 ? age : null;
};

const DateOfBirthInput = ({ name, formik, label = "Date of Birth" }) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const value = formik.values[name] || "";
  const isError = formik.touched[name] && formik.errors[name];
  const isActive = focused || value !== "";

  const age = useMemo(() => calculateAge(value), [value]);

  const handleChange = (e) => {
    formik.setFieldValue(name, e.target.value);
  };

  // open the native date picker no matter where on the field is clicked
  const openPicker = () => {
    if (inputRef.current?.showPicker) {
      try {
        inputRef.current.showPicker();
      } catch {
        inputRef.current.focus();
      }
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="relative form-row">
      <div
        onClick={openPicker}
        className={`relative w-full rounded-lg border transition-all duration-300 cursor-pointer ${
          isError
            ? "border-red-500"
            : focused
            ? "border-primary"
            : "border-[#9A9A9A]"
        }`}
      >
        <input
          ref={inputRef}
          id={name}
          name={name}
          type="date"
          value={value}
          max={new Date().toISOString().split("T")[0]} // block future dates
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            formik.setFieldTouched(name, true);
          }}
          className="w-full bg-transparent py-2 px-4  rounded-lg outline-none cursor-pointer"
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
      </div>

      {/* age shown right below the input once a valid date is picked */}
      {age !== null && (
        <p className="mt-1 text-sm font-medium text-gray3">
          Age: {age} {age === 1 ? "year" : "years"}
        </p>
      )}

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default DateOfBirthInput;