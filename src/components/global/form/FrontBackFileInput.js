import { useRef, useState, useEffect } from 'react';
import { ErrorMessage } from 'formik';
import CloudAddSvg from 'assets/svgs/CloudAddSvg.js';
import TextError from './TextError';

const FrontBackFileInput = ({ labelFront, labelBack, name, formik }) => {
  const fileInputFrontRef = useRef(null);
  const fileInputBackRef = useRef(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
    const [tagFrontInput, setTagFrontInput] = useState(""); 
     const [tagBackInput, setTagBackInput] = useState(""); 

  // Initialize attachments if not present



   useEffect(() => {

    if (!formik.values[name]) {
      setFrontImage(null);
      setBackImage(null);
     
    }
  }, [formik.values[name]]);

  const handleImageUpload = (file, setImage, index) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        const updatedAttachments = [...formik.values[name]];
        updatedAttachments[index] = reader.result;
        formik.setFieldValue(name, updatedAttachments);
        formik.setFieldTouched(name, true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFrontChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file, setFrontImage, 0);
  };

  const handleBackChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file, setBackImage, 1);
  };

  const handleBrowseClick = (ref) => ref.current?.click();



  const handleAddTag = () => {
    if (tagFrontInput.trim() === "") return;
    const existingTags = formik.values[`${name}_front`] || [];
    formik.setFieldValue(`${name}_front`, [...existingTags, tagFrontInput.trim()]);
    setTagFrontInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    const existingTags = formik.values[`${name}_front`] || [];
    formik.setFieldValue(
      `${name}_front`,
      existingTags.filter((t) => t !== tagToRemove)
    );
  };




   const handleAddBackTag = () => {
    if (tagBackInput.trim() === "") return;
    const existingTags = formik.values[`${name}_back`] || [];
    formik.setFieldValue(`${name}_back`, [...existingTags, tagBackInput.trim()]);
    setTagBackInput("");
  };

  const handleRemoveBackTag = (tagToRemove) => {
    const existingTags = formik.values[`${name}_back`] || [];
    formik.setFieldValue(
      `${name}_back`,
      existingTags.filter((t) => t !== tagToRemove)
    );
  };


  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Front */}
      <div className="w-full h-auto border-2 border-dashed rounded-xl flex flex-col gap-3 items-center justify-center text-center p-6">
        <h2 className="text-base font-semibold mb-2">{labelFront}</h2>
        {frontImage ? (
          <img
            src={frontImage}
            alt="Front preview"
            className="w-[150px] h-[150px] object-cover rounded-lg mb-4"
          />
        ) : (
          <CloudAddSvg />
        )}
        <input
          type="file"
          ref={fileInputFrontRef}
          accept="image/*"
          onChange={handleFrontChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => handleBrowseClick(fileInputFrontRef)}
          className="btn-secondary"
        >
          {frontImage ? 'Change Front Image' : 'Upload Front Image'}
        </button>

           {/* Optional Tag Input */}
            {frontImage && (
              <div className=" mx-auto w-full md:w-[50%]">
                <label className="text-sm font-medium mb-1 block">Front  Tags</label>
                <div className="flex gap-2 flex-wrap">
                  {formik.values[`${name}_front`] &&
                    formik.values[`${name}_front`].map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-red-500 font-bold"
                        >
                          x
                        </button>
                      </span>
                    ))}
                </div>
                <div className="flex mt-2 gap-2">
                  <input
                    type="text"
                    value={tagFrontInput}
                    onChange={(e) => setTagFrontInput(e.target.value)}
                    placeholder="Add tag"
                className="border border-gray-300 outline-none rounded px-2 py-1 flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-primary text-white px-4 py-1 rounded hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
      </div>

   
      {/* Back */}
      <div className="w-full h-auto border-2 border-dashed rounded-xl flex flex-col gap-3 items-center justify-center text-center p-6">
        <h2 className="text-base font-semibold mb-2">{labelBack}</h2>
        {backImage ? (
          <img
            src={backImage}
            alt="Back preview"
            className="w-[150px] h-[150px] object-cover rounded-lg mb-4"
          />
        ) : (
          <CloudAddSvg />
        )}
        <input
          type="file"
          ref={fileInputBackRef}
          accept="image/*"
          onChange={handleBackChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => handleBrowseClick(fileInputBackRef)}
          className="btn-secondary"
        >
          {backImage ? 'Change Back Image' : 'Upload Back Image'}
        </button>



             {backImage && (
              <div className=" mx-auto w-full md:w-[50%]">
                <label className="text-sm font-medium  block">Back  Tags</label>
                <div className="flex gap-2 flex-wrap">
                  {formik.values[`${name}_back`] &&
                    formik.values[`${name}_back`].map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveBackTag(tag)}
                          className="text-red-500 font-bold"
                        >
                          x
                        </button>
                      </span>
                    ))}
                </div>
                <div className="flex mt-2 gap-2">
                  <input
                    type="text"
                    value={tagBackInput}
                    onChange={(e) => setTagBackInput(e.target.value)}
                    placeholder="Add tag"
                className="border border-gray-300 outline-none rounded px-2 py-1 flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddBackTag}
                    className="bg-primary text-white px-4 py-1 rounded hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
      </div>

      {error && <TextError>{error}</TextError>}
    </div>
  );
};

export default FrontBackFileInput;
