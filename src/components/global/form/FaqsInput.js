import React from 'react';
import { FieldArray, ErrorMessage, useFormikContext } from 'formik';
import TextError from './TextError';

function FaqsInput({ label, name }) {
    const { values, setFieldValue } = useFormikContext();

    return (
        <div className="form-row mb-4">
            {label && <label className="">{label}</label>}
            <FieldArray name={name}>
                {({ push, remove }) => (
                    <div className='flex flex-col gap-4'>
                        {values && values[name].map((qa, index) => (
                            <div key={index} className="flex  mb-2 gap-4">
                                <div className='flex-1 flex flex-col gap-3'>

                                    <input
                                        name={`${name}[${index}].question`}
                                        placeholder="Question"
                                        className=""
                                        value={values[name][index].question || ''}
                                        onChange={(e) =>
                                            setFieldValue(`${name}[${index}].question`, e.target.value)
                                        }
                                    />
                                    <textarea
                                        name={`${name}[${index}].answer`}
                                        placeholder="Answer"
                                        className="h-[100px] resize-none"
                                        value={values[name][index].answer || ''}
                                        onChange={(e) =>
                                            setFieldValue(`${name}[${index}].answer`, e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex items-center">
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
                            onClick={() => push({ question: '', answer: '' })}
                            className="mt-2 p-2 w-fit bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                        >
                            + Add Question
                        </button>
                    </div>
                )}
            </FieldArray>
            <ErrorMessage component={TextError} name={name} className="text-red-500 text-sm mt-1" />
        </div>
    );
}

export default FaqsInput;
