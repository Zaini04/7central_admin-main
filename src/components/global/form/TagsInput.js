import React, { useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import TextError from './TextError';

function TagsInput({ label, name, limit, ...rest }) {
    const { setFieldValue, values } = useFormikContext();
    const [tag, setTag] = useState('');
    const [error, setError] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && tag) {
            e.preventDefault();
            if (values[name].length < limit) {
                if (!values[name].includes(tag)) {
                    setFieldValue(name, [...values[name], tag]);
                    setTag('');
                    setError('');
                }
            } else {
                setError(`You can only add up to ${limit} tags.`);
            }
        }
    };

    const removeTag = (index) => {
        setFieldValue(name, values[name].filter((_, i) => i !== index));
        if (values[name].length <= limit) {
            setError('');
        }
    };

    return (
        <div className="form-row">
            {label && <label htmlFor={name} className="block text-gray-700 font-bold">{label}</label>}
            <div>
                <input
                    id={name}
                    name={name}
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="p-2 border border-gray-300 rounded w-full"
                    {...rest}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <div className="mt-2 flex flex-wrap">
                    {values[name].map((tag, index) => (
                        <div key={index} className="bg-gray-200 rounded-full px-4 py-1 mr-2 mb-2 flex items-center">
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(index)}
                                className="ml-2 text-xl text-red-500 hover:text-red-700 focus:outline-none"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <ErrorMessage component={TextError} name={name} className="text-red-500 text-sm mt-1" />
        </div>
    );
}

export default TagsInput;
