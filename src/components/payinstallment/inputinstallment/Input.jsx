import React, { useState, useMemo } from "react";
import TextError from "components/global/form/TextError";
import { getIn } from "formik";

const parseNumber = (value = "", maxDecimals = 2) => {
  // keep digits + dot only, remove commas
  let cleaned = value.replace(/,/g, "").replace(/[^\d.]/g, "");

  // allow only one dot
  const firstDot = cleaned.indexOf(".");
  if (firstDot !== -1) {
    cleaned =
      cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "");
  }

  // limit decimals
  const parts = cleaned.split(".");
  if (parts.length === 2 && typeof maxDecimals === "number") {
    parts[1] = parts[1].slice(0, maxDecimals);
    cleaned = `${parts[0]}.${parts[1]}`;
  }

  return cleaned;
};

const formatNumber = (value, maxDecimals = 2) => {
  if (value === "" || value === null || value === undefined) return "";

  const str = String(value);
  const raw = str.replace(/,/g, "");
  if (raw === "" || raw === ".") return raw;

  const [intPart, decPart] = raw.split(".");
  const intFormatted = Number(intPart || 0).toLocaleString("en-US");

  if (decPart !== undefined) {
    return `${intFormatted}.${decPart.slice(0, maxDecimals)}`;
  }
  return intFormatted;
};

function Input(props) {
  const {
    label,
    name,
    value = "",

    // ✅ Formik support (optional)
    formik,

    // existing handlers still supported
    onChange,
    onBlur,

    type = "text",
    readOnly = false,
    error = "",
    step,
    ...rest
  } = props;

  const [focused, setFocused] = useState(false);

  // ✅ pull value + error from formik if provided
  const fieldValue = formik ? getIn(formik.values, name) ?? "" : value;
  const fieldError = formik ? getIn(formik.errors, name) : error;
  const fieldTouched = formik ? getIn(formik.touched, name) : true;

  const isError = Boolean(fieldTouched && fieldError);
  const isActive = focused || fieldValue;

  // Date formatting
  const formattedDateValue =
    type === "date" && fieldValue ? new Date(fieldValue).toISOString().split("T")[0] : fieldValue;

  // ✅ number formatting display (commas)
  const isNumberType = type === "number";
  const displayValue = useMemo(() => {
    if (!isNumberType) return formattedDateValue;
    // show commas, allow decimals based on step
    const maxDecimals = step === "0.01" ? 2 : 0;
    return formatNumber(formattedDateValue, maxDecimals);
  }, [formattedDateValue, isNumberType, step]);

  // Container base
  const containerBase =
    "relative input-container w-full transition-all duration-300 rounded-lg border";

  // Dynamic container styles
  let containerClasses = "";
  if (readOnly) {
    containerClasses =
      "backdrop-blur-sm bg-gray-100/50 cursor-not-allowed border-gray-200";
  } else if (isError) {
    containerClasses = "border-red-500";
  } else if (focused) {
    containerClasses = "border-primary shadow-md backdrop-blur-md bg-white/70";
  } else {
    containerClasses = "border-lighter bg-white/50";
  }

  const handleChange = (e) => {
    if (readOnly) return;

    if (isNumberType) {
      const maxDecimals = step === "0.01" ? 2 : 0;
      const raw = parseNumber(e.target.value, maxDecimals);

      // ✅ if formik exists, set raw value in formik
      if (formik) {
        formik.setFieldValue(name, raw);
      }

      // still call external onChange if provided
      if (onChange) onChange(e, raw);

      return;
    }

    // normal behavior
    if (formik) formik.handleChange(e);
    if (onChange) onChange(e);
  };

  const handleBlur = (e) => {
    setFocused(false);

    if (formik) formik.handleBlur(e);
    if (onBlur) onBlur(e);
  };

  return (
    <div className="relative form-row">
      <div className={`${containerBase} ${containerClasses}`}>
        <input
          id={name}
          name={name}
          // ✅ important: use text input for number formatting with commas
          type={isNumberType ? "text" : type}
          inputMode={isNumberType ? "decimal" : undefined}
          value={displayValue}
          readOnly={readOnly}
          onFocus={!readOnly ? () => setFocused(true) : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`w-full py-3 px-4 rounded-lg outline-none transition-all duration-200
            ${
              readOnly
                ? "text-gray-500 bg-transparent select-none"
                : focused
                ? "text-primary bg-transparent"
                : isError
                ? "text-red-600 bg-transparent"
                : "text-gray-500 bg-transparent"
            }
          `}
          {...rest}
        />

        <label
          htmlFor={name}
          className={`absolute left-4 transition-all duration-300 pointer-events-none bg-light2 px-1
            ${
              isActive
                ? `top-[-12px] text-[13px] ${
                    isError
                      ? "text-red-500"
                      : focused
                      ? "text-primary"
                      : "text-gray-600"
                  }`
                : "top-[-12px] text-gray-400"
            }
          `}
        >
          {label}
        </label>
      </div>

      {isError && <TextError>{fieldError}</TextError>}
    </div>
  );
}

export default Input;
