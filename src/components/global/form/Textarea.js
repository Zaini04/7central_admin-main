import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Textarea(props) {
  const { label, name, maxLength, formik, readOnly = false, ...rest } = props;
  const [focused, setFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState('');

  const value = formik.values[name] || '';
  const isError = formik.touched[name] && formik.errors[name];
  const isActive = focused || value;

  const handleChange = (e) => {
    const val = e.target.value;
    setCharCount(val.length);
    if (maxLength && val.length >= maxLength) {
      setError(`Reached maximum length of ${maxLength} characters.`);
    } else {
      setError('');
    }
    formik.setFieldValue(name, val);
  };

  // Container base
  const containerBase =
    'relative input-container w-full transition-all duration-300 rounded-lg border';

  // Dynamic container styles
  let containerClasses = '';
  if (readOnly) {
    containerClasses =
      'backdrop-blur-sm bg-gray-100/50 cursor-not-allowed border-gray-200';
  } else if (isError || error) {
    containerClasses = 'border-red-500';
  } else if (focused) {
    containerClasses = 'border-primary shadow-md backdrop-blur-md bg-white/70';
  } else {
    containerClasses = 'border-lighter bg-white/50';
  }

  return (
    <div className="relative form-row">
      {/* Textarea Container */}
      <div className={`${containerBase} ${containerClasses}`}>
        {/* Textarea Field */}
        <Field
          as="textarea"
          id={name}
          name={name}
          readOnly={readOnly}
          value={value}
          onFocus={!readOnly ? () => setFocused(true) : undefined}
          onBlur={!readOnly ? () => setFocused(false) : undefined}
          onChange={handleChange}
          className={`w-full resize-none h-[120px] py-3 px-4 rounded-lg outline-none transition-all duration-200
            ${
              readOnly
                ? 'text-gray-500 bg-transparent select-none'
                : focused
                ? 'text-primary bg-transparent'
                : isError || error
                ? 'text-red-600 bg-transparent'
                : 'text-gray-500 bg-transparent'
            }
          `}
          {...rest}
        />

        {/* Floating Label */}
        {label && (
          <label
            htmlFor={name}
            className={`absolute left-0 transition-all duration-300 pointer-events-none bg-light2 px-1
              ${
                isActive
                  ? `top-[-12px] text-[13px] ${
                      isError || error
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
        )}
      </div>

      {/* Character Count */}
      {maxLength && (
        <div className="text-right text-sm text-gray-400 mt-1">
          {charCount}/{maxLength}
        </div>
      )}

      {/* Error Message */}
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Textarea;
