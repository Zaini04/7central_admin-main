import React, { useState } from "react";
import UploadFileSVG from "assets/svgs/UploadFileSVG";
import Sheeticon from "assets/svgs/sheeticon";

const UploadFile = ({ label, name, formik }) => {
  const [fileName, setFileName] = useState("");
  const [fileBase64, setFileBase64] = useState("");

  const handleCSV = () => {
    const header = ["Name", "Number"];
    const rows = [
      ["John Doe", "1234567890"],
      ["Jane Smith", "9876543210"],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows]
        .map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "Inventory.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      ![
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ) {
      alert("Please upload a valid .csv or .xlsx file");
      return;
    }

    try {
      const base64Data = await fileToBase64(file);
      setFileName(file.name);
      setFileBase64(base64Data);

      formik.setFieldValue(name, {
        base64: base64Data,
      });


    } catch (error) {
      console.error("Error converting file:", error);
    }
  };


  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleDropClick = () => {
    document.getElementById(name).click();
  };

  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="sm:col-span-2">
      <div className="flex flex-col gap-3 w-full">
        {/* Label */}
        <label className="text-dark1 font-semibold text-sm sm:text-lg">
          {label}
        </label>

        <div className="w-full flex justify-center">
          <div className="w-11/12 flex flex-col gap-4">
            {/* Drag & Drop Box */}
            <div
              onClick={handleDropClick}
              className={`w-full border-2 border-dashed ${
                error ? "border-red-500" : "border-gray-300"
              } h-[150px] flex flex-col items-center justify-center rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all relative`}
            >
              {fileName ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white bg-opacity-70 rounded-lg">
                  <p className="text-green-600 text-sm sm:text-base font-medium">
                    {fileName}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Click to upload another file
                  </p>
                </div>
              ) : (
                <>
                  <UploadFileSVG />
                  <p className="text-gray-500 text-sm sm:text-base mt-2 text-center">
                    Click or drag file to this area to upload
                  </p>
                   <p className="text-gray-400 text-sm sm:text-base  pb-4">
              Formats accepted: .csv, .xlsx
            </p>
                </>
              )}

              <input
                id={name}
                type="file"
                accept=".csv, .xlsx"
                onChange={handleFileUpload}
                onBlur={() => formik.setFieldTouched(name, true)}
                className="hidden"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-xs sm:text-sm">
                {formik.errors[name]}
              </p>
            )}

           

            {/* Sample Template Info */}
            <p className="text-gray-600 text-sm self-end sm:text-base pt-2">
              If you do not have a file, you can use the sample below:
            </p>

            {/* Download Sample Button */}
            <div
              onClick={handleCSV}
              className="w-fit self-end flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
            >
              <Sheeticon />
              <p className="text-gray-600 text-sm sm:text-base self-end">
                Download Sample Template
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
