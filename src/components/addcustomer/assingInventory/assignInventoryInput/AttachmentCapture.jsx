import { useRef, useState, useEffect } from 'react';
import CloudAddSvg from 'assets/svgs/CloudAddSvg.js';
import Webcam from 'react-webcam';
import TextError from 'components/global/form/TextError';

const AttachmentCapture = ({ label, name, value, onChange, error }) => {
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!value) {
      setShowCamera(false);
      setTagInput("");
    }
  }, [value]);

  const isImage = value?.fileType?.startsWith("image/");

  const setAttachment = (fileData) => {
    onChange(name, fileData);
    setShowCamera(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment({
        base64: reader.result,
        fileName: file.name,
        fileType: file.type,
        tags: [],
      });
    };
    reader.readAsDataURL(file);
  };

  const handleBrowseClick = () => fileInputRef.current?.click();

  const captureFromCamera = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setAttachment({
      base64: imageSrc,
      fileName: `capture-${Date.now()}.jpg`,
      fileType: "image/jpeg",
      tags: [],
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() === "") return;
    const existingTags = value?.tags || [];
    onChange(name, { ...value, tags: [...existingTags, tagInput.trim()] });
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    const existingTags = value?.tags || [];
    onChange(name, {
      ...value,
      tags: existingTags.filter((t) => t !== tagToRemove),
    });
  };

  const isError = Boolean(error);

  return (
    <div className="relative form-row w-full mt-3">
      {/* Floating Label - same as Input.js */}
      <label
        htmlFor={name}
        className={`absolute -top-8 left-0  text-[12px] px-1 pointer-events-none
          ${isError ? 'text-red-500' : 'text-gray3'}
        `}
      >
        {label}
      </label>

      <div className="w-full h-auto border-2 border-dashed border-[#DCE4E8] rounded-xl flex flex-col items-center justify-center text-center p-6">
        {showCamera ? (
          <div className="flex flex-col items-center gap-3">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg w-[250px] h-[200px] object-cover border border-gray-300"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={captureFromCamera}
                className="bg-primary text-white px-4 py-2 rounded-[10px] hover:opacity-90"
              >
                Capture
              </button>
              <button
                type="button"
                onClick={() => setShowCamera(false)}
                className="border border-gray-400 text-gray-600 px-4 py-2 rounded-[10px] hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {value ? (
              isImage ? (
                <img
                  src={value.base64}
                  alt="Preview"
                  className="w-[150px] h-[150px] object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-[150px] h-[150px] flex flex-col items-center justify-center gap-2 bg-light2 rounded-lg mb-4 px-2">
                  <p className="text-xs text-gray-600 truncate w-full">{value.fileName}</p>
                  <p className="text-[10px] text-gray-400 uppercase">{value.fileType?.split("/")[1] || "file"}</p>
                </div>
              )
            ) : (
              <CloudAddSvg />
            )}

            <input
              type="file"
              ref={fileInputRef}
              id={name}
              name={name}
              accept="image/*,application/pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-gray3">Image, PDF, or Document up to 50MB</p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="rounded-full text-primary text-sm text-opacity-40 border border-primary/50 px-3 py-2 hover:text-opacity-100 hover:border-primary"
                >
                  {value ? "Change File" : "Browse File"}
                </button>

                <button type="button" onClick={() => setShowCamera(true)}>
                  <div className="h-[40px] bg-black rounded-full pl-1.5 pr-4 flex items-center justify-start gap-3 text-primary cursor-pointer select-none">
                    <div className="w-[27px] h-[27px] rounded-full bg-white text-black flex justify-center items-center">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.66675 6.66683C6.66675 5.93045 7.26368 5.3335 8.00008 5.3335C8.73648 5.3335 9.33341 5.93045 9.33341 6.66683C9.33341 7.40323 8.73648 8.00016 8.00008 8.00016C7.26368 8.00016 6.66675 7.40323 6.66675 6.66683Z" fill="#1F2020"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00008 1.3335C5.05456 1.3335 2.66675 3.72131 2.66675 6.66683C2.66675 9.61236 5.05456 12.0002 8.00008 12.0002C10.9456 12.0002 13.3334 9.61236 13.3334 6.66683C13.3334 3.72131 10.9456 1.3335 8.00008 1.3335ZM8.00008 4.00016C6.52732 4.00016 5.33341 5.19407 5.33341 6.66683C5.33341 8.13956 6.52732 9.3335 8.00008 9.3335C9.47281 9.3335 10.6667 8.13956 10.6667 6.66683C10.6667 5.19407 9.47281 4.00016 8.00008 4.00016Z" fill="#1F2020"/>
                        <path d="M4.84053 11.7686L4.46679 12.2669C3.72515 13.2558 4.43071 14.6669 5.66679 14.6669H10.3335C11.5695 14.6669 12.2751 13.2558 11.5335 12.2669L11.1597 11.7686C10.2421 12.338 9.15948 12.6669 8.00008 12.6669C6.84068 12.6669 5.75812 12.338 4.84053 11.7686Z" fill="#1F2020"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-sm text-white">Take Image</span>
                  </div>
                </button>
              </div>

              {value && (
                <div className="mt-4 w-full">
                  <label className="text-sm font-medium mb-1 block">Optional Tags</label>
                  <div className="flex gap-2 flex-wrap">
                    {value.tags?.map((tag, idx) => (
                      <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)} className="text-red-500 font-bold">
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex mt-2 gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tag"
                      className="border border-gray-300 outline-none rounded px-2 py-1 flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-[#1F2020] text-white px-4 py-1 rounded-xl hover:opacity-90"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {isError && <TextError>{error}</TextError>}
    </div>
  );
};

export default AttachmentCapture;