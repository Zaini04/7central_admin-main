import React from 'react';
import { FieldArray, ErrorMessage, useFormikContext } from 'formik';
import TextError from './TextError';

function MetaTagsInput({ label, name }) {
    const { values, setFieldValue } = useFormikContext();

    const renderFields = (type, index) => {
        switch (type) {
            case 'og':
                return (
                    <>
                        <input
                            name={`${name}[${index}].property`}
                            placeholder="Property"
                            className=""
                            value={values[name][index].property}
                            onChange={(e) =>
                                setFieldValue(`${name}[${index}].property`, e.target.value)
                            }
                        />
                        <textarea
                            name={`${name}[${index}].content`}
                            placeholder="Content"
                            className="h-[120px] resize-none"
                            value={values[name][index].content}
                            onChange={(e) =>
                                setFieldValue(`${name}[${index}].content`, e.target.value)
                            }
                        />
                    </>
                );
            case 'canonical':
                return (
                    <>
                        <input
                            name={`${name}[${index}].rel`}
                            placeholder="Rel"
                            className=""
                            value={values[name][index].rel}
                            onChange={(e) =>
                                setFieldValue(`${name}[${index}].rel`, e.target.value)
                            }
                        />
                        <textarea
                            name={`${name}[${index}].href`}
                            placeholder="Href"
                            className="h-[120px] resize-none"
                            value={values[name][index].href}
                            onChange={(e) =>
                                setFieldValue(`${name}[${index}].href`, e.target.value)
                            }
                        />
                    </>
                );
            default:
                return (
                    <>
                        <input
                            name={`${name}[${index}].name`}
                            placeholder="Name"
                            className=""
                            value={values[name][index].name}
                            onChange={(e) =>
                                setFieldValue(`${name}[${index}].name`, e.target.value)
                            }
                        />
                        <textarea
                            name={`${name}[${index}].content`}
                            placeholder="Content"
                            className="h-[120px] resize-none"
                            value={values[name][index].content}
                            onChange={(e) =>
                                setFieldValue(`${name}[${index}].content`, e.target.value)
                            }
                        />
                    </>
                );
        }
    };


    return (
        <div className="form-row mb-4">
            {label && <label className="">{label}</label>}
            <FieldArray name={name}>
                {({ push, remove }) => (
                    <div>
                        {values[name].map((metaTag, index) => (
                            <div key={index} className="grid grid-cols-2 mb-2 gap-4">
                                <select
                                    name={`${name}[${index}].type`}
                                    value={metaTag.type}
                                    onChange={(e) => {
                                        const newType = e.target.value;
                                        const updatedMetaTag = { ...values[name][index], type: newType }; // Copy current metaTag
                                
                                        // Remove irrelevant fields based on the new type
                                        if (newType === 'default') {
                                            delete updatedMetaTag.property;
                                            delete updatedMetaTag.rel;
                                            delete updatedMetaTag.href;
                                        } else if (newType === 'og') {
                                            delete updatedMetaTag.name;
                                            delete updatedMetaTag.rel;
                                            delete updatedMetaTag.href;
                                        } else if (newType === 'canonical') {
                                            delete updatedMetaTag.name;
                                            delete updatedMetaTag.content;
                                            delete updatedMetaTag.property;
                                        }
                                
                                        // Update Formik with the modified meta tag
                                        setFieldValue(`${name}[${index}]`, updatedMetaTag);
                                    }}
                                    className=""
                                >
                                    <option value="default">Default</option>
                                    <option value="og">OG</option>
                                    <option value="canonical">Canonical</option>
                                </select>
                                {renderFields(metaTag.type, index)}
                                <div className='flex items-center'>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-500 hover:text-red-700 focus:outline-none text-2xl"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => push({ type: 'default', name: '', content: '' })}
                            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                        >
                            + Add Meta Tag
                        </button>
                    </div>
                )}
            </FieldArray>
            <ErrorMessage component={TextError} name={name} className="text-red-500 text-sm mt-1" />
        </div>
    );
}

export default MetaTagsInput;
