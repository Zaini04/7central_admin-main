import React from 'react';
import Select from 'react-select';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

const ReactSelect = ({ options, field, formik, meta, label, name, ...rest }) => {
    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '100%',
        }),
        control: (provided, state) => ({
            ...provided,
            outline: 'none',
            borderWidth: '1px',
            borderColor: meta.touched && meta.error ? 'red' : state.isFocused ? 'var(--primary)' : '',
            backgroundColor: '',
            padding: '5px 8px',
            color: 'var(--pure)',
            transition: 'ease-in-out 200ms',
            borderRadius: '8px',
        }),
        option: (provided, { isFocused, isSelected }) => ({
            ...provided,
            background: isFocused ? 'var(--primary)' : isSelected ? 'var(--primary)' : '',
            zIndex: 1,
        }),
        menu: (provided) => ({
            ...provided,
            width: 'max-content',
            minWidth: '100%',
        }),
        menuList: (provided) => ({
            ...provided,
            backgroundColor: 'var(--dark1)',
            color: 'var(--pure)',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'var(--pure)',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'var(--pure)',
            '&:hover': {
                color: 'var(--primary)',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: 'var(--primary)',
            borderRadius: '6px',
            padding: '2px 5px',
            display: 'flex',
            alignItems: 'center',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'white',
            fontWeight: 'bold',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: 'white',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'red',
                color: 'white',
            },
        }),
    };

    const isError = formik.touched[name] && formik.errors[name];

    // "Select All" ko options me add karein
    const allOptions = [{ value: 'select-all', label: 'Select All' }, ...options];

    const selectedValues = allOptions.filter((option) => formik.values[name]?.includes(option.value));

    const handleChange = (selectedOptions) => {
        if (!selectedOptions) {
            formik.setFieldValue(name, []);
            return;
        }

        const values = selectedOptions.map((option) => option.value);

        // Agar "Select All" select ho jaye, to saare options select karein
        if (values.includes('select-all')) {
            formik.setFieldValue(
                name,
                options.map((option) => option.value)
            );
        } else {
            // Agar ek bhi option deselect ho jaye to "Select All" hatayein
            formik.setFieldValue(name, values);
        }
    };

    return (
        <div className="form-row">
            {label && <label>{label}</label>}
            <Select
                id={name}
                name={name}
                options={allOptions}
                styles={customStyles}
                isMulti
                classNamePrefix="react-select"
                value={selectedValues}
                onChange={handleChange}
                onBlur={() => formik.setFieldTouched(name, true)}
            />
        </div>
    );
};

function MultiSelect({ label, name, meta, options, formik, ...rest }) {
    return (
        <div className="form-row">
            <Field name={name}>
                {({ form, meta, field }) => {
                    return (
                        <ReactSelect
                            label={label}
                            meta={meta}
                            field={field}
                            formik={formik}
                            options={options}
                            name={name}
                            {...rest}
                        />
                    );
                }}
            </Field>

            <ErrorMessage component={TextError} name={name} />
        </div>
    );
}

export default MultiSelect;
