import React, { useRef } from "react";
import TextError from "components/global/form/TextError";

function FileInput({ label, name, value = [], onChange, error, multiple = true, accept }) {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    const updated = multiple ? [...value, ...selected] : selected;
    onChange(updated);
    e.target.value = ""; // same file dobara select ho sake
  };

  const handleRemove = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  const isError = Boolean(error);

  return (
    <div className="relative form-row w-full">
      <div
        onClick={() => inputRef.current?.click()}
        className={`w-full flex flex-col gap-2 rounded-xl border-2 border-dashed p-4 cursor-pointer transition-all
          ${isError ? "border-red-500" : "border-lighter hover:border-primary"}
        `}
      >
        <p className="text-sm text-gray-500">
          {label} <span className="text-xs text-gray-400">(Image, PDF, ya koi file)</span>
        </p>

        <input
          ref={inputRef}
          id={name}
          name={name}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {value?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {value.map((file, index) => (
              <div
                key={index}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 bg-light2 rounded-lg px-3 py-1.5 text-xs text-gunmetal"
              >
                <span className="truncate max-w-[140px]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-red-500 font-semibold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isError && <TextError>{error}</TextError>}
    </div>
  );
}

export default FileInput;