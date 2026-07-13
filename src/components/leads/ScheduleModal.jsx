import { useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "utils/clickOutside";
import { Formik, Form } from "formik";
import FormControl from "components/global/form/FormControl";
import CancelButton from "components/global/form/CancelButton";
import NextButton from "components/global/form/NextButton";

const ScheduleVisitModal = ({ setScheduleVisitModal, visitData }) => {
  const mainRef = useRef(null);

  // Modal ke baahir click karne par safely close karne ke liye handler
  useClickOutside(mainRef, () => {
    setScheduleVisitModal(false);
  });

  console.log("visitData", visitData);

  // Initial values according to the requested design schema
  const initValues = {
    name: visitData?.name || "Ali Khan",
    phone: visitData?.phone || "+92-301-1234567",
    visitDateTime: visitData?.visitDateTime || "",
    visitLocation: visitData?.location || "-------",
    remarks: visitData?.remarks || "-------",
    meetingType: visitData?.meetingType || "Office Visit",
  };

  // Meeting types dataset matching your requested parameters
  const meetingTypeOptions = [
    { key: "Office Visit", value: "Office Visit" },
    { key: "Site Visit", value: "Site Visit" },
    { key: "Virtual Meeting", value: "Virtual Meeting" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-black/25 flex items-center justify-center px-3 h-screen z-[9999]">
      <div
        ref={mainRef}
        className="bg-white w-[90%] md:w-[65%] xl:w-[55%] rounded-2xl py-5 relative overflow-y-auto max-h-[92vh] flex flex-col gap-4 shadow-xl popup"
      >
        {/* 1. Header Area Panel */}
        <div className="flex justify-between items-center w-full px-6 py-1">
          <h2 className="page-heading">
            Schedule Visit
          </h2>

          <button
            onClick={() => setScheduleVisitModal(false)}
            className="text-gray-400 h-8 w-8 rounded-full hover:text-black hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
          >
            <RxCross1 size={16} />
          </button>
        </div>

        {/* 2. Inputs Dynamic Layout Wrapper */}
        <div className="w-full flex flex-col gap-3 px-6 mt-2">
          <Formik 
            initialValues={initValues} 
            onSubmit={(values) => console.log("Scheduled Visit Output Data:", values)}
          >
            {(formik) => (
              <Form className="flex flex-col gap-6 w-full">
                
                {/* Row 1: Name & Phone Number */}
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
                </div>

                {/* Row 2: Visit Date/Time & Visit Location */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10">
                  <FormControl
                    control="date-time"
                    type="text"
                    label="Visit Date/Time"
                    name="visitDateTime"
                    formik={formik}
                    className="w-full text-xs"
                  />

                  <FormControl
                    control="input"
                    type="text"
                    label="Visit Location"
                    name="visitLocation"
                    formik={formik}
                    className="w-full text-xs"
                  />
                </div>

                {/* Row 3: Remarks Block Area */}
                <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-10">
                  <FormControl
                    control="textarea"
                    rows={4}
                    type="text"
                    label="Remarks"
                    name="remarks"
                    formik={formik}
                    className="w-full text-xs"
                  />
                </div>

                {/* Row 4: Meeting Type Selection Component */}
                <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-10">
                  <FormControl
                    control="multiple-option"
                    label="Meeting Type"
                    name="meetingType"
                    options={meetingTypeOptions}
                    formik={formik}
                    className="w-full text-xs"
                  />
                </div>

                {/* Horizontal Section UI Break Divider */}
                <hr className="w-[100%] h-[1.5px] mx-auto bg-[#9A9A9A] mt-2" />

                {/* 3. Action Processing Control Layout */}
                <div className="w-full flex justify-end items-center gap-3 mt-1 pb-2">
                  <button
                    onClick={() => setScheduleVisitModal(false)}
                    type="button"
                  >
                    <CancelButton />
                  </button>
                  <button type="submit">
                    <NextButton label="Save Schedule" isIcon={false} />
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

export default ScheduleVisitModal;