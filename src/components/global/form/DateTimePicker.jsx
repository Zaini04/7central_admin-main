import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function DateTimePicker(props) {
  const { label, name, formik, readOnly = false, ...rest } = props;
  const [focused, setFocused] = useState(false);

  // Split system: Parses Formik's Date value into separate standard inputs
  const getDateTimeParts = (value) => {
    if (!value) return { dateStr: "", timeStr: "" };
    const d = new Date(value);
    if (isNaN(d.getTime())) return { dateStr: "", timeStr: "" };

    const pad = (n) => String(n).padStart(2, '0');
    
    // YYYY-MM-DD standard format
    const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    // HH:MM 24-hour native input format
    const timeStr = `${pad(d.getHours())}:${pad(d.getMinutes())}`;

    return { dateStr, timeStr };
  };

  return (
    <div className="relative form-row w-full">
      <Field name={name}>
        {({ field, form, meta }) => {
          const { setFieldValue } = form;
          const { value } = field;
          const isError = meta.touched && meta.error;
          const isActive = focused || value;

          const { dateStr, timeStr } = getDateTimeParts(value);

          // Combined internal change emitter helper
          const handlePartChange = (newDateStr, newTimeStr) => {
  const dStr = newDateStr || dateStr || new Date().toISOString().split('T')[0];
  const tStr = newTimeStr || timeStr || "12:00";
  
  // Clean string format: "YYYY-MM-DD HH:mm"
  const combinedStr = `${dStr} ${tStr}`; 
  
  // Validate before setting
  const testDate = new Date(`${dStr}T${tStr}`);
  setFieldValue(name, isNaN(testDate.getTime()) ? null : combinedStr);
};

          // Container configurations
          const containerBase =
            'relative input-container w-full transition-all duration-300 rounded-lg border flex items-center bg-white';

          let containerClasses = '';
          if (readOnly) {
            containerClasses = 'backdrop-blur-sm bg-gray-100/50 cursor-not-allowed border-gray-200';
          } else if (isError) {
            containerClasses = 'border-red-500';
          } else if (focused) {
            containerClasses = 'border-primary shadow-md';
          } else {
            containerClasses = 'border-lighter';
          }

          return (
            <div className={`${containerBase} ${containerClasses}`}>
              
              {/* 1. Date Native Picker Sub-Input Input Area */}
              <input
                type="date"
                disabled={readOnly}
                value={dateStr}
                onChange={(e) => handlePartChange(e.target.value, timeStr)}
                onFocus={() => !readOnly && setFocused(true)}
                onBlur={() => !readOnly && setFocused(false)}
                className="w-1/2 py-3 pl-4 pr-1 bg-transparent text-gray-500 outline-none cursor-pointer text-xs"
              />

              {/* Middle Border Divider Segment */}
              <div className="h-5 w-[1px] bg-gray-200" />

              {/* 2. Time Native Picker Sub-Input Input Area */}
              <input
                type="time"
                disabled={readOnly}
                value={timeStr}
                onChange={(e) => handlePartChange(dateStr, e.target.value)}
                onFocus={() => !readOnly && setFocused(true)}
                onBlur={() => !readOnly && setFocused(false)}
                className="w-1/2 py-3 pl-2 pr-4 bg-transparent text-gray-500 outline-none cursor-pointer text-xs"
              />

              {/* Floating Uniform Dynamic Label Component */}
              <label
                htmlFor={name}
                className={`absolute left-0 transition-all duration-300 pointer-events-none bg-light2 px-1
                  ${
                    isActive
                      ? `top-[-12px] text-[12px] z-10 ${
                          isError
                            ? 'text-red-500'
                            : focused
                            ? 'text-primary'
                            : 'text-gray3'
                        }`
                      : 'top-3 text-gray3'
                  }
                `}
              >
                {label}
              </label>

            </div>
          );
        }}
      </Field>

      {/* Formik Validations Error Handler */}
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default DateTimePicker;