import { ErrorMessage, Field } from 'formik';
import React from 'react'
import TextError from './TextError';

const ToggleBtn = ({ label , checkedValue , uncheckValue , name , field , form }) => {
    const handleChange = e => {
        if(e.target.checked) {
            return form.setFieldValue(name , checkedValue || true)
        }
        form.setFieldValue(name , uncheckValue || false)
    }

    return (
        <div className="flex flex-col gap-2">
            {
                label && 
                <label className='label'>
                    {label}
                </label>
            }
            <div className='flex items-center gap-3'>
                <label className="relative inline-flex items-center mr-5 cursor-pointer">
                <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                onChange={handleChange}
                checked={checkedValue ? field?.value === checkedValue : field?.value}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
            </div>
        </div>
    )
}

const ToggleButton = ({ label , name , ...rest}) => {
    return (
        <div className="flex-1">
            <Field name={name}>
                {
                    ({ field , form }) => (
                        <ToggleBtn
                        label={label}
                        name={name}
                        field={field}
                        form={form}
                        {...rest}
                        />
                    )
                }
            </Field>
            <ErrorMessage component={TextError} name={name} />
        </div>
    )
}

export default ToggleButton