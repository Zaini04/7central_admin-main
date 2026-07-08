    import React, { useState, useRef, useEffect } from 'react';
    import { Field, ErrorMessage } from 'formik';
    import TextError from 'components/global/form/TextError';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputDate = (props) => {
  const { label, name, formik, readOnly = false, ...rest } = props;
  const [focused, setFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const inputRef = useRef(null);

  const isError = formik.touched[name] && formik.errors[name];
  const value = formik.values[name] || '';
  const isActive = focused || value;

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

  // Format date to YYYY-MM-DD for input display
  const formattedValue =
    value && !isNaN(new Date(value)) ? new Date(value) : null;

  // Close date picker when clicking outside
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative form-row" ref={wrapperRef}>
      {/* Input Container */}
      <div
        className={`flex items-center ${containerClasses} border rounded-lg relative`}
      >
        {/* Calendar Icon */}
        <FaCalendarAlt className=" text-gray-400 z-10  absolute   right-3" />

        {/* Input Field */}
        <Field
          id={name}
          name={name}
          type="text"
          readOnly
          value={formattedValue ? formattedValue.toLocaleDateString() : ''}
          onFocus={() => {
            if (!readOnly) {
              setFocused(true);
              setShowDatePicker(true);
            }
          }}
          className={`w-full py-3 pl-10 pr-4 rounded-lg outline-none transition-all duration-200
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
          className={`absolute left-4 transition-all duration-300 pointer-events-none bg-white px-1
            ${
              isActive
                ? `top-[-12px] text-[13px] ${
                    isError
                      ? 'text-red-500'
                      : focused
                      ? 'text-primary'
                      : 'text-gray-600'
                  }`
                : 'top-3 text-gray-400'
            }
          `}
        >
          {label}
        </label>
      </div>

      {/* Error Message */}
      <ErrorMessage component={TextError} name={name} />

      {/* Date Picker Popup */}
      {showDatePicker && (
        <div className="absolute z-50   top-[60px]">
          <DatePicker
            selected={formattedValue}
            onChange={(date) => {
              formik.setFieldValue(name, date);
              setShowDatePicker(false);
              setFocused(false);
            }}
            dateFormat="yyyy-MM-dd"
            inline
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
          />
        </div>
      )}
    </div>
  );
};

export default InputDate;
