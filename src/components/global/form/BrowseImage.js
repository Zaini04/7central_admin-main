import { useRef, useState } from 'react';
import { ErrorMessage } from 'formik';
import CloudAddSvg from 'assets/svgs/CloudAddSvg.js';
import TextError from './TextError'; // Formik error display

const BrowseImage = ({ label, name, formik }) => {
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Convert file to Base64 and store in Formik
  const handleImageUpload = (base64) => {
    setUploadedImage(base64);
    formik.setFieldValue(name, base64);
    formik.setFieldTouched(name, true); 
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => handleImageUpload(reader.result); // Base64
      reader.readAsDataURL(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const isError = formik.touched[name] && formik.errors[name];

  return (
    <div className="w-full h-auto border-2 border-dashed border-[#DCE4E8] rounded-xl flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-base font-semibold mb-2">{label}</h2>

      {uploadedImage ? (
        <img
          src={uploadedImage}
          alt="Uploaded preview"
          className="w-[150px] h-[150px] object-cover rounded-lg mb-4"
        />
      ) : (
        <CloudAddSvg />
      )}

      <input
        type="file"
        ref={fileInputRef}
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray3">
          JPEG, JPG, PNG formats, up to 50MB
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button" 
            onClick={handleBrowseClick}
            className="
              rounded-full
              text-primary 
              text-sm sm:text-base
              text-opacity-40 
              border 
              border-primary/50 
              w-fit 
              px-3 
              py-2 
              transition-all 
              duration-300 
              hover:text-opacity-100 
              hover:border-primary
            "
          >
            {uploadedImage ? 'Change Image' : 'Browse File'}
          </button>
        </div>
      </div>

      {/* Validation error */}
      {isError && <TextError>{formik.errors[name]}</TextError>}
    </div>
  );
};

export default BrowseImage;
