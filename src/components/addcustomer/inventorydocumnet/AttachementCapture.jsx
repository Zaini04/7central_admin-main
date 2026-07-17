import { useRef } from "react";
import CloudAddSvg from "assets/svgs/CloudAddSvg.js";

const AttachmentCaptureCompact = ({ name, value, onChange }) => {
  const fileInputRef = useRef(null);

  const isImage = value?.fileType?.startsWith("image/");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(name, {
        base64: reader.result,
        fileName: file.name,
        fileType: file.type,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // taake same file dobara select ho sake
  };

  const handleBrowseClick = () => fileInputRef.current?.click();

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        id={name}
        name={name}
        accept="image/*,application/pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="flex items-center gap-2 bg-white border border-[#DCE4E8] rounded-full pl-1 pr-3 py-1 max-w-[220px]">
          {isImage ? (
            <img
              src={value.base64}
              alt="preview"
              className="w-6 h-6 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-light2 flex items-center justify-center shrink-0">
              <CloudAddSvg />
            </div>
          )}
          <span className="text-xs text-gray-600 truncate">
            {value.fileName}
          </span>
          <button
            type="button"
            onClick={handleBrowseClick}
            className="text-[10px] text-primary underline shrink-0"
          >
            Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleBrowseClick}
          className="flex items-center gap-1.5 rounded-full text-primary text-xs border border-primary/50 px-3 py-1.5 hover:border-primary"
        >
          <CloudAddSvg />
          Upload File
        </button>
      )}
    </div>
  );
};

export default AttachmentCaptureCompact;