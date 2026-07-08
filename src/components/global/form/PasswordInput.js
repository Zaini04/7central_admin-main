
import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import EyeSlashSvg from 'assets/svgs/EyeSlashSvg';
import EyeSvg from 'assets/svgs/EyeSvg';
import TextError from './TextError';

function PasswordInput(props) {
    const { label, name, formik, ...rest } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const isError = formik.touched[name] && formik.errors[name];
    const value = formik.values[name] || '';
    const isActive = focused || value;

    return (
        <div className="relative form-row">
            <div
                className={`relative input-container w-full transition-all duration-300 rounded-lg ${
                    isError
                        ? 'border-red-500'
                        : focused
                        ? 'border-primary'
                        : 'border-lighter'
                }`}
            >
                <Field
                    id={name}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    autoComplete="off"
                    className="w-full bg-transparent py-3 px-4 text-base text-pure rounded-lg outline-none pr-10"
                    {...rest}
                />

                {/* Floating Label */}
           <label
  htmlFor={name}
  className={`absolute left-4 transition-all duration-300 pointer-events-none bg-light2 px-1 ${
    isActive
      ? `top-[-12px]  text-[13px] font-light ${
          isError
            ? 'text-red-500'
            : focused
            ? 'text-primary'
            : 'text-gray3'
        }`
      : ' top-[-12px] text-gray3 '
  }`}
>
  {label}
</label>

                {/* Eye Icon */}
                <div
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xl w-fit cursor-pointer text-dark1 opacity-70 hover:opacity-100"
                    onClick={toggleShowPassword}
                >
                    {showPassword ? <EyeSlashSvg /> : <EyeSvg />}
                </div>
            </div>

            <ErrorMessage component={TextError} name={name} />
        </div>
    );
}

export default PasswordInput;
