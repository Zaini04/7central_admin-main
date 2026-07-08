import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Input(props) {
  const { label, name, formik, type = 'text', readOnly = false, ...rest } = props;
  const [focused, setFocused] = useState(false);

  const isError = formik.touched[name] && formik.errors[name];
  const value = formik.values[name] || '';
  const isActive = focused || value;

  // Fix date formatting
  const formattedValue =
    type === 'date' && value ? new Date(value).toISOString().split('T')[0] : value;

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
    containerClasses = 'border-[#9A9A9A] bg-white/50';
  }

  return (
    <div className="relative form-row">
      {/* Input Container */}
      <div className={`${containerBase} ${containerClasses}`}>
        {/* Input Field */}
        <Field
          id={name}
          name={name}
          type={type}
          value={formattedValue}
          readOnly={readOnly}
          onFocus={!readOnly ? () => setFocused(true) : undefined}
          onBlur={!readOnly ? () => setFocused(false) : undefined}
          className={`w-full py-2 px-4   rounded-xl transition-all duration-200
            ${
              readOnly
                ? 'text-gray-500 bg-transparent select-none'
                : focused
                ? '  text-primary bg-transparent'
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
          className={`absolute -top-[25px]  left-0 transition-all duration-300 pointer-events-none  px-1
            ${
              isActive
                ? `top-[-12px] ${
                    isError
                      ? 'text-red-500'
                      : focused
                      ? 'text-primary'
                      : 'text-gray-gray3'
                  }`
                : 'top-[-12px]  text-gray3'
            }
          `}
        >
          {label}
        </label>
      </div>

      {/* Error Message */}
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;
