
import React, { useState } from 'react';
import TextError from "components/global/form/TextError";


function Input(props) {
  const {
    label,
    name,
    value = '',
    onChange,
    onBlur,
    type = 'text',
    readOnly = false,
    error = '',
    ...rest
  } = props;

  const [focused, setFocused] = useState(false);

  const isError = Boolean(error);
  const isActive = focused || value;

  // Date formatting
  const formattedValue =
    type === 'date' && value ? new Date(value).toISOString().split('T')[0] : value;

  // Container base
  const containerBase =
    'relative input-container w-full transition-all duration-300 rounded-xl border';

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
    <div className="relative form-row">

      {/* Input Container */}
      <div className={`${containerBase} ${containerClasses}`}>

        {/* Standard input */}
        <input
          id={name}
          name={name}
          type={type}
          value={formattedValue}
          readOnly={readOnly}
          onFocus={!readOnly ? () => setFocused(true) : undefined}
          onBlur={(e) => {
            setFocused(false);
            if (onBlur) onBlur(e);
          }}
          onChange={onChange}
          className={`w-full py-2 h-[32px] text-sm px-4 rounded-lg outline-none transition-all duration-200
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
          {...rest}
        />

        {/* Floating Label */}
        <label
          htmlFor={name}
          className={`absolute -top-8 left-0 transition-all duration-300 pointer-events-none px-1
            ${
              isActive
                ? `top-[-12px] text-[12px] ${
                    isError
                      ? 'text-red-500'
                      : focused
                      ? 'text-primary'
                      : 'text-gray-600'
                  }`
                : 'top-[-12px] text-gray3'
            }
          `}
        >
          {label}
        </label>
      </div>

      {/* Error Message */}
      {isError && <TextError>{error}</TextError>}
    </div>
  );
}

export default Input;