import { useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "utils/clickOutside";
import { Formik, Form } from "formik";
import FormControl from "components/global/form/FormControl";
import CancelButton from "components/global/form/CancelButton";
import NextButton from "components/global/form/NextButton";

const CallStatusModal = ({ setCallStatusModal, callData }) => {
  const mainRef = useRef(null);

  // Click outside backdrop layer configuration to close modal safely
  useClickOutside(mainRef, () => {
    setCallStatusModal(false);
  });

  console.log("calldata",callData)

  // Initial values mapped exactly from your image input specifications
  const initValues = {
    name: callData?.name || "Ali Khan",
    phone: callData?.phone || "+92-301-1234567",
    callStatus: callData?.status || "Connected",
    callDuration: callData?.duration || "-------",
    callNotes: callData?.notes || "-------",
    nextActionDate: callData?.nextActionDate || "",
  };

  // Status dropdown options selection dataset list 
  const statusOptions = [
    { key: "Connected", value: "Connected" },
    { key: "No Answer", value: "No Answer" },
    { key: "Wrong Number", value: "Wrong Number" },
    { key: "Call Back Later", value: "Call Back Later" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-black/25 flex items-center justify-center px-3 h-screen z-[9999]">
      <div
        ref={mainRef}
        className="bg-white w-[90%] md:w-[65%] xl:w-[55%] rounded-2xl py-5 relative overflow-y-auto max-h-[92vh] flex flex-col gap-4 shadow-xl popup"
      >
        {/* 1. Header Row Area */}
        <div className="flex justify-between items-center w-full px-6 py-1">
          <h2 className="page-heading">
            Call Status
          </h2>

          <button
            onClick={() => setCallStatusModal(false)}
            className="text-gray-400 h-8 w-8 rounded-full hover:text-black hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
          >
            <RxCross1 size={16} />
          </button>
        </div>

        {/* 2. Form Section Field Wrapper Container */}
        <div className="w-full flex flex-col gap-3 px-6 mt-2">
          <Formik initialValues={initValues} onSubmit={(values) => console.log(values)}>
            {(formik) => (
              <Form className="flex flex-col gap-6 w-full">
                
                {/* Responsive Inputs Grid Row */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10">
                  
                  <FormControl
                    control="input"
                    type="text"
                    label="Name"
                    name="name"
                    formik={formik}
                    className="w-full text-xs"
                  />

                  <FormControl
                    control="input"
                    type="text"
                    label="Phone Number"
                    name="phone"
                    formik={formik}
                    className="w-full text-xs"
                  />

                  <FormControl
                    control="multiple-option"
                    label="Call Status"
                    name="callStatus"
                    options={statusOptions}
                    formik={formik}
                    className="w-full text-xs"
                  />

                  <FormControl
                    control="input"
                    type="text"
                    label="Call Duration"
                    name="callDuration"
                    formik={formik}
                    className="w-full text-xs"
                  />
                </div>

<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10">
                  <FormControl
                    control="textarea"
                    rows={4}
                    type="text"
                    label="Notes"
                    name="callNotes"
                    formik={formik}
                    className="w-full text-xs"
                  />

                {/* Full-width Call Notes Textarea Input Row */}
                {/* <div className="w-full flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Call Notes</label>
                  <textarea
                    name="callNotes"
                    rows={4}
                    value={formik.values.callNotes}
                    onChange={formik.handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none text-gray-400"
                  />
                </div> */}

  <FormControl
                    control="date-time"
                    type="text"
                    label="Next Follow Up Date/Time"
                    name="nextActionDate"
                    formik={formik}
                    className="w-full text-xs"
                  />
                {/* Next Follow Up Date Input Container Layer */}
                <div className="mt-4 w-full relative flex flex-col gap-1.5">
                  {/* <label className="text-[12px] text-gray3">Next Follow Up Date/Time</label> */}
                  <div className="relative w-full flex items-center">
                    {/* <input
                      type="text"
                      name="nextActionDate"
                      value={formik.values.nextActionDate}
                      onChange={formik.handleChange}
                      className="w-full border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-500"
                    /> */}
                    {/* Inline Right-aligned Calendar Svg Vector Icon */}
                    {/* <div className="absolute right-3.5 text-gray-400 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div> */}
                  </div>
                </div>
                </div>

                {/* Horizontal Divider Break Line exactly like image structure */}
                        <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

                {/* 3. Action Buttons Row Panel */}
                <div className="w-full flex justify-end items-center gap-3 mt-1 pb-2">
                  <button
                    onClick={() => setCallStatusModal(false)}
                    type="button"
                  >
                    <CancelButton/>
                  </button>
                  <button
                    type="submit"
                  >
                <NextButton label="Save Call" isIcon={false } />
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CallStatusModal;