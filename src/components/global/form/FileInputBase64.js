import React, { useRef, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import uploadImg from 'assets/images/upload-img.png';
import TextError from './TextError';

const FileInput = ({ label = 'Upload Image', field, form, meta, minWidth = 800, minHeight = 600 }) => {
    const imgRef = useRef(null);
    const [preview, setPreview] = useState(null); 
    const [showFullImage, setShowFullImage] = useState(null); 

    const handleFileChange = (file) => {
        if (!file) {
            toast.error('Please select an image.');
            return;
        }

        const maxSize = 5 * 1024 * 1024; // Maximum file size 5MB

        if (file.size > maxSize) {
            toast.error('Image size exceeds the maximum limit of 5MB.');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                if (img.width >= minWidth && img.height >= minHeight) {
                    // Valid image resolution
                    setPreview(reader.result);
                    form.setFieldValue(field.name, reader.result);
                } else {
                    // Invalid image resolution
                    toast.error(
                        `Image resolution should be at least ${minWidth}x${minHeight}px. "${file.name}" was rejected.`
                    );
                }
            };
        };
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => handleFileChange(acceptedFiles[0]),
        accept: {
            'image/png': [],
            'image/jpg': [],
            'image/jpeg': [],
        },
        multiple: false,
    });

    const removeImage = () => {
        setPreview(null);
        form.setFieldValue(field.name, null);
    };

    return (
        <div>
            <div className="flex flex-col gap-3">
                <label className="label">{label}</label>
                <input {...getInputProps()} ref={imgRef} hidden />

                <div className="flex flex-wrap items-center gap-4">
                    {preview ? (
                        <div className="relative">
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-w-[300px] h-auto object-cover rounded-md border border-lighter"
                                onClick={() => setShowFullImage(true)}
                            />
                            <div
                                className="absolute top-1 right-2 text-red-500 cursor-pointer text-xl"
                                onClick={removeImage}
                            >
                                <i className="uil uil-trash"></i>
                            </div>
                        </div>
                    ) : (
                        <div
                            {...getRootProps()}
                            className={`
                                border-2 border-lighter border-dashed p-4 rounded-md cursor-pointer text-grayText w-full h-fit
                                ${meta.touched && meta.error ? 'border-red-500' : isDragActive ? 'border-green-500' : 'border-gray-400'}
                                flex justify-center items-center
                            `}
                            onClick={() => imgRef?.current?.click()}
                        >
                            <div className="flex flex-col items-center">
                                <img src={uploadImg} alt="Upload" className="w-[120px]" />
                                {isDragActive ? (
                                    <p className="text-green-500">Drop the file here...</p>
                                ) : (
                                    <p className="text text-center">
                                        Size {minWidth}x{minHeight} <br /> Drag & drop image here, <br /> or click to select a file
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showFullImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999]"
                    onClick={() => setShowFullImage(false)} // Close popup on click
                >
                    <img src={preview} alt='Full-size' className='max-h-[75vh] max-w-[90%]' />
                </div>
            )}
        </div>
    );
};

const FileInputBase64 = ({ label, name, formik, ...rest }) => (
    <div className="flex-1 flex flex-col gap-2">
        <Field name={name}>
            {({ field, form, meta }) => (
                <FileInput label={label} field={field} form={form} meta={meta} {...rest} />
            )}
        </Field>
        <ErrorMessage component={TextError} name={name} />
    </div>
);

export default FileInputBase64;
