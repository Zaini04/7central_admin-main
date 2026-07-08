import React, { useState, useRef, useEffect } from 'react';
import { Field, ErrorMessage, getIn } from 'formik';
import TextError from 'components/global/form/TextError';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputDate = (props) => {
  const { label, name, formik, readOnly = false, ...rest } = props;

  const [focused, setFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const wrapperRef = useRef(null);

  // Nested form values
  const value = getIn(formik.values, name);
  const isTouched = getIn(formik.touched, name);
  const error = getIn(formik.errors, name);
  const isError = isTouched && error;

  // Convert stored (YYYY/MM/DD) → Date object for DatePicker
  let formattedValue =
    value && !isNaN(new Date(value)) ? new Date(value) : null;

  const isActive = focused || formattedValue;

  // Container classes
  const containerClasses =
    readOnly
      ? 'backdrop-blur-sm bg-gray-100/50 cursor-not-allowed border-gray-200'
      : isError
      ? 'border-red-500'
      : focused
      ? 'border-primary shadow-md backdrop-blur-md bg-white/70'
      : 'border-lighter bg-white/50';

  // Close datepicker on click outside
  useEffect(() => {
      
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDatePicker(false);
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ⭐ UI Display (MM/DD/YYYY)
const displayDate = value
  ? new Date(value).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).replace(/ /g, '/')
  : '';

  return (
    <div className="relative form-row" ref={wrapperRef}>
      {/* Input container */}
      <div className={`flex items-center border rounded-lg relative ${containerClasses}`}>
        <FaCalendarAlt className="text-gray-400 z-10 absolute right-3" />

        {/* Input */}
        <Field
          id={name}
          name={name}
          type="text"
          readOnly
          value={displayDate}
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
          className={`absolute left-4 bg-white px-1 transition-all duration-300 pointer-events-none
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

      {/* Error */}
      <ErrorMessage component={TextError} name={name} />

      {/* DatePicker */}
      {showDatePicker && (
        <div className="absolute z-50 top-[60px]">
          <DatePicker
            selected={formattedValue}
            inline
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            onChange={(date) => {
              if (date) {
                // ⭐ Store in Formik as YYYY/MM/DD
                const formatted = `${date.getFullYear()}/${String(
                  date.getMonth() + 1
                ).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;

                formik.setFieldValue(name, formatted);
              } else {
                formik.setFieldValue(name, '');
              }

              setShowDatePicker(false);
              setFocused(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InputDate;
