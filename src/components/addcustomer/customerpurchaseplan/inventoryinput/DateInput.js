import React, { useState } from 'react';
import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextError from "components/global/form/TextError";

function DatePicker({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  touched,
  readOnly = false,
  ...rest
}) {
  const [focused, setFocused] = useState(false);

  const isError = Boolean(error);
  const isActive = focused || value;

  // Container base
  const containerBase =
    'relative input-container w-full transition-all duration-300 rounded-lg border';

  // Dynamic container styles
  let containerClasses = '';
  if (readOnly) {
    containerClasses =
      'backdrop-blur-sm bg-gray-100/50 cursor-not-allowed border-gray-200';
  } else if (isError) {
    containerClasses = 'border-red-500';
  } else if (focused) {
    containerClasses = 'border-primary shadow-md backdrop-blur-md bg-white/70';
  } else {
    containerClasses = 'border-lighter bg-white/50';
  }

  return (
    <div className="relative form-row z-10">
      <div className={`${containerBase} ${containerClasses}`}>
        {/* DatePicker Input */}
        <DateView
          id={name}
          placeholderText={placeholder}
          selected={value ? new Date(value) : null}
          onChange={(val) => onChange(val)}
          onFocus={() => !readOnly && setFocused(true)}
          onBlur={() => !readOnly && setFocused(false)}
          readOnly={readOnly}
  popperPlacement="top-start"
  dateFormat="dd/MMM/yyyy"
          {...rest}
          className={`w-full relative z-30 py-3 px-4 rounded-lg outline-none transition-all duration-200
            ${
              readOnly
                ? 'text-gray-500 bg-transparent select-none'
                : focused
                ? 'text-primary bg-transparent'
                : isError
                ? 'text-red-600 bg-transparent'
                : 'text-gray-500 bg-transparent'
            }
          `}
        />

        {/* Floating Label */}
        <label
          htmlFor={name}
          className={`absolute -top-8 left-0   z-0 transition-all duration-300 pointer-events-none  px-1
            ${
              isActive
                ? `top-[-12px] text-[13px] ${
                    isError
                      ? 'text-red-500'
                      : focused
                      ? 'text-primary'
                      : 'text-gray-600'
                  }`
                : 'top-3 text-gray3'
            }
          `}
        >
          {label}
        </label>
      </div>

      {/* Error Message */}
          {error && <TextError>{error}</TextError>}

    </div>
  );
}

export default DatePicker;
