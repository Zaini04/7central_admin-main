import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Select(props) {
    const { label, name, options, formik , placeholder = 'Select' , showPlaceholder  , ...rest } = props;
    const isError = formik.touched[name] && formik.errors[name];

    return (
        <div className="form-row">
            {label && (
                <label htmlFor={name}>
                    {label}
                </label>
            )}
            <Field
                as="select"
                id={name}
                name={name}
                className={`${
                    isError ? 'border-red' : ''
                }`}
                value={formik.values[name]}
                {...rest}
            >   
                {
                    showPlaceholder && (
                        <option value="">
                            {placeholder}
                        </option>
                    )
                }
                {options.map(option => (
                    <option key={option.key} value={option.value}>
                        {option.key}
                    </option>
                ))}
            </Field>
            <ErrorMessage component={TextError} name={name} />
        </div>
    );
}

export default Select;
