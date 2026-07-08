import React, { useRef, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import uploadImg from 'assets/images/upload-img.png';
import TextError from './TextError';

const MultiFileInput = ({ label = 'Add Images', field, form, meta }) => {
    const imgRef = useRef(null);
    const [previews, setPreviews] = useState([]);

    const handleFileChange = (files) => {
        if (!files || files.length === 0) {
            toast.error("Please select an image.");
            return;
        }

        let newFieldFiles = [...field.value];
        let newPreviews = [...previews];

        Array.from(files)?.forEach((file) => {
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (file.size > maxSize) {
                toast.error(`Image size exceeds 5MB.`);
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                newPreviews.push(reader.result);
                newFieldFiles.push(reader.result);

                setPreviews(newPreviews);
                form.setFieldValue(field.name, newFieldFiles);
            };
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => handleFileChange(acceptedFiles),
        accept: {
            'image/png': [],
            'image/jpg': [],
            'image/jpeg': []
        },
        multiple: true,
    });

    const removeImage = (index) => {
        const updatedFiles = field.value.filter((_, i) => i !== index);
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
        form.setFieldValue(field.name, updatedFiles);
    };

    return (
        <div className="flex flex-col gap-1.5">
            <input {...getInputProps()} ref={imgRef} hidden />

            <div className="flex flex-wrap items-center gap-4">
                {previews.length > 0 &&
                    previews.map((item, i) => (
                        <div key={i} className="relative">
                            <img
                                src={item}
                                alt="Preview"
                                className="w-[180px] h-[120px] object-cover rounded-md border border-gray-300"
                            />
                            <div
                                className="absolute top-1 right-2 text-red-500 cursor-pointer text-xl"
                                onClick={() => removeImage(i)}
                            >
                                <i className="uil uil-trash"></i>
                            </div>
                        </div>
                    ))}

                {field?.value?.length > 0 ? (
                    <div
                        {...getRootProps()}
                        className={`w-[150px] h-[120px] rounded-md border flex items-center justify-center text-5xl text-grayText cursor-pointer 
                        ${meta.touched && meta.error ? 'border-red-500'
                            : isDragActive ? 'border-green-500 text-green-500'
                                : 'border-gray-600'}`}
                        onClick={() => imgRef?.current?.click()}
                    >
                        <i className="uil uil-image-plus"></i>
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed border-lighter p-4 rounded-md cursor-pointer text-grayText w-full 
                        ${meta.touched && meta.error ? 'border-red-500'
                            : isDragActive ? 'border-green-500'
                                : 'border-gray-400'}
                        flex justify-center items-center`}
                        onClick={() => imgRef?.current?.click()}
                    >
                        <div className="flex flex-col items-center">
                            <img src={uploadImg} alt="Upload" className="w-[120px]" />
                            {isDragActive ? (
                                <p className="text-green-500">Drop the files here...</p>
                            ) : (
                                <p className="text-center">
                                    Drag & drop images here,<br />or click to select files
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const MultiFileBase64 = ({ label, name, formik, ...rest }) => (
    <div className="flex-1 flex flex-col gap-2">
        <Field name={name}>
            {({ field, form, meta }) => (
                <MultiFileInput
                    label={label}
                    field={field}
                    form={form}
                    meta={meta}
                    {...rest}
                />
            )}
        </Field>
        <ErrorMessage component={TextError} name={name} />
    </div>
);

export default MultiFileBase64;
