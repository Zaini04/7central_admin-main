import React, { useState } from 'react';
import DateView from 'react-datepicker';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import 'react-datepicker/dist/react-datepicker.css';

function DatePicker(props) {
  const { label, name, formik, readOnly = false, ...rest } = props;
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative form-row">
      <Field name={name}>
        {({ field, form, meta }) => {
          const { setFieldValue } = form;
          const { value } = field;
          const isError = meta.touched && meta.error;
          const isActive = focused || value;

          // Container base
          const containerBase =
            'relative input-container w-full transition-all duration-300 rounded-lg border  ';

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
            <div className={`${containerBase} ${containerClasses}  `}>
              {/* DatePicker Input */}
              <DateView
                id={name}
                {...field}
                {...rest}
                selected={value ? new Date(value) : null}
                onChange={(val) => setFieldValue(name, val)}
                onFocus={() => !readOnly && setFocused(true)}
                onBlur={() => !readOnly && setFocused(false)}
             
                className={`w-full py-3 px-4   bg-white    rounded-lg outline-none transition-all duration-200
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
                className={`absolute left-4       transition-all duration-300 pointer-events-none bg-light2 px-1
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
          );
        }}
      </Field>

      {/* Error Message */}
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default DatePicker;
