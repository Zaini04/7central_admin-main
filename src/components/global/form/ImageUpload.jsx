import React, { useState, useRef,useEffect } from "react";
import SettingProfileSVG from "assets/svgs/customersvg/SettingSVG";
import TextError from "./TextError";
import { ErrorMessage } from "formik";
import CustomerImg from "assets/images/customer.png"
import CustomerSvg from "assets/svgs/customersvg/customerSvg";
import DeleteSvg from "assets/svg/home/home/DeleteSvg";

const MAX_FILE_SIZE_MB = 4;
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/svg+xml"];

const ImageUpload = ({ label, name, formik }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(formik.values[name]);
  const [localError, setLocalError] = useState("");


useEffect(() => {

  if (!formik.values[name]) {
    setImagePreview(null);
  }
}, [formik.values[name]]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image type
    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      const errorMsg = "Invalid format. Only JPG, PNG, SVG allowed.";
      setLocalError(errorMsg);
      formik.setFieldError(name, errorMsg);
      setImagePreview(null);
      formik.setFieldValue(name, "");
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      const errorMsg = "File too large. Max 4MB.";
      setLocalError(errorMsg);
      formik.setFieldError(name, errorMsg);
      setImagePreview(null);
      formik.setFieldValue(name, "");
      return;
    }

    // Read and preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);
      setLocalError("");
      formik.setFieldValue(name, base64Image);
      formik.setFieldError(name, undefined);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = () => {
    setImagePreview(null);
    formik.setFieldValue(name, "");
    setLocalError("");
  };

  const isError = formik.touched[name] && formik.errors[name];
  const errorMessage = localError || (isError ? formik.errors[name] : "");

  return (
    <div className="rounded-xl px-6 flex items-center gap-6">
      <div className="flex flex-col items-center md:items-start gap-3 w-full">
        {/* Label */}
        <div className="w-fit text-center">
          <h3 className="text-base font-semibold text-gunmetal">{label}</h3>
        </div>

        {/* Image Upload Area */}
        <div className="flex flex-col justify-satrt  items-center gap-5">
          <div
            onClick={triggerFileInput}
            className={`w-[110px] h-[110px] bg-lightmist rounded-[50%] border ${
              errorMessage ? "border-red-500" : "border-deep-indigo/20"
            } border-dashed flex items-center justify-center overflow-hidden cursor-pointer`}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-[50%] max-w-[110px]"
              />
            ) : (
              <img src={CustomerImg} className="w-full h-full object-cover" />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:items-start items-center gap-1">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={triggerFileInput}
                className=" border border-[#9A9A9A] text-[#1F202066] font-medium w-28 px-3 py-1.5 rounded-full text-sm cursor-pointer"
              >
                Edit Photo
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="border border-[#9A9A9A] font-medium w-fit px-2 py-2 text-primary rounded-[50%] text-sm cursor-pointer"
              >
                <DeleteSvg/>
              </button>
            </div>

          

            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </div>

        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={VALID_IMAGE_TYPES.join(",")}
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Formik Error Message (extra safety) */}
        <ErrorMessage component={TextError} name={name} />
      </div>
    </div>
  );
};

export default ImageUpload;
