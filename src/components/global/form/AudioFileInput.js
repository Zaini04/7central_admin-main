import React, { useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import TextError from './TextError';

const AudioInput = ({ label = 'Upload Audio', field, form, meta, useValueToPreview }) => {
    const [audioFile, setAudioFile] = useState(null); 
    const [uploadProgress, setUploadProgress] = useState(0); 
    const [isPlayable, setIsPlayable] = useState(false); 
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // If `useValueToPreview` is true and there's an initial value
        if (useValueToPreview && field.value) {
            const audioURL = typeof field.value === 'string' ? field.value : URL.createObjectURL(field.value);
            const fileName = typeof field.value === 'string' ? 'Existing Audio' : field?.value?.name
            setAudioFile({ name: fileName , url: audioURL }); 
            checkIfAudioIsPlayable(audioURL);
        }
    }, [field.value, useValueToPreview]);

    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
                setAudio(null);
            }
        };
    }, [audio]);

    const handleAudioChange = (file) => {
        if (!file) {
            toast.error('Please select an audio file.');
            return;
        }

        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    const fileURL = URL.createObjectURL(file);
                    form.setFieldValue(field.name, file); // Set the file in Formik
                    setAudioFile({ name: file.name, url: fileURL });
                    checkIfAudioIsPlayable(fileURL);
                    return 100;
                }
                return prev + 10;
            });
        }, 200); // Simulate upload progress every 200ms
    };

    const checkIfAudioIsPlayable = (url) => {
        const audio = new Audio(url);
        audio.oncanplaythrough = () => setIsPlayable(true);
        audio.onerror = () => {
            toast.error('This audio file is not playable.');
            setIsPlayable(false);
        };
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => handleAudioChange(acceptedFiles[0]),
        accept: {
            'audio/*': [],
        },
        multiple: false,
    });

    const removeAudio = () => {
        setAudioFile(null);
        setUploadProgress(0);
        form.setFieldValue(field.name, null); // Remove from Formik field
        setIsPlayable(false);
        if (audio) {
            audio.pause();
            setAudio(null);
        }
    };

    const playPauseHandler = () => {
        if (isPlaying) {
            audio?.pause();
            setIsPlaying(false);
        } else {
            const newAudio = new Audio(audioFile.url);
            newAudio.play();
            setAudio(newAudio);
            setIsPlaying(true);
        }
    };

    return (
        <div>
            <label className="label">{label}</label>
            <div className="mt-3">
                {audioFile ? (
                    <div className="flex items-center gap-4 border p-4 border-lighter rounded-md">
                        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-500">
                            <i className="uil uil-music"></i>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">
                                    {audioFile?.name?.length > 30
                                        ? audioFile?.name?.slice(0, 30) + '...'
                                        : audioFile?.name}
                                </span>
                                <span className="text-sm">
                                    {typeof field.value === 'string' ? '100%' : `${uploadProgress}%`}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-gray-300 rounded mt-1">
                                <div
                                    className="h-full bg-green-500 rounded"
                                    style={{ width: `${typeof field?.value === 'string' ? '100%' : `${uploadProgress}%`}` }}
                                ></div>
                            </div>
                        </div>

                        {isPlayable ? (
                            <button
                                type="button"
                                className="text-pure border border-pure rounded-full w-[35px] h-[35px] flex items-center justify-center"
                                onClick={playPauseHandler}
                            >
                                {isPlaying ? (
                                    <i className="uil uil-pause"></i>
                                ) : (
                                    <i className="uil uil-play"></i>
                                )}
                            </button>
                        ) : (
                            <span
                                className="text-red-500"
                                title="This file is not playable"
                            >
                                <i className="uil uil-exclamation-triangle"></i>
                            </span>
                        )}

                        <button
                            type="button"
                            className="text-pure border border-pure rounded-full w-[35px] h-[35px] flex items-center justify-center"
                            onClick={removeAudio}
                        >
                            <i className="uil uil-times text-xl"></i>
                        </button>
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed p-4 rounded-md cursor-pointer text-gray-500 w-full ${
                            meta.touched && meta.error
                                ? 'border-red-500'
                                : isDragActive
                                ? 'border-green-500'
                                : 'border-gray-400'
                        }`}
                    >
                        <input {...getInputProps()} hidden />
                        <p className="text-center">
                            Drag & drop an audio file, or click to select one
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const AudioFileInput = ({ label, name, formik, useValueToPreview, ...rest }) => (
    <div className="flex-1 flex flex-col gap-2">
        <Field name={name}>
            {({ field, form, meta }) => (
                <AudioInput
                    label={label}
                    field={field}
                    form={form}
                    meta={meta}
                    useValueToPreview={useValueToPreview}
                    {...rest}
                />
            )}
        </Field>
        <ErrorMessage component={TextError} name={name} />
    </div>
);

export default AudioFileInput;
