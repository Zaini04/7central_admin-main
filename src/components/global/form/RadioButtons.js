import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function RadioButtons (props) {
    const { label, name, options , ...rest } = props;

    return (
        <div className='form-control'>
            {
                label && <label>{label}</label> 
            }
            <Field 
            name={name} 
            >
                {
                    ({ field }) => {
                        return options.map(option => {
                            return (
                            <React.Fragment key={option.key}>
                                <input
                                type='radio'
                                id={option.value}
                                value={option.value}
                                checked={field.value === option.value}
                                {...field}
                                {...rest}
                                />
                                <label htmlFor={option.value}>{option.key}</label>
                            </React.Fragment>
                            )
                        })
                    }
                }
            </Field>
            <ErrorMessage component={TextError} name={name} />
        </div>
    )
}

export default RadioButtons
