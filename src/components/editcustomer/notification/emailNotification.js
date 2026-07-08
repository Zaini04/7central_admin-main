import { useState, useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "components/global/form/TextError";
import CheckAllSVG from "assets/svgs/CheckAll";

const EmailNotification = ({ name, formik }) => {
  const [isOn, setIsOn] = useState(false);

  // Keep Formik toggle value synced with switch
useEffect(() => {
  const formValue = formik.values[name]?.toggle === "on";
  setIsOn(formValue);
}, [formik.values[name]?.toggle]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col xs:flex-row gap-2 px-3 mt-4">
        {/* LEFT SIDE */}
        <div className=" w-full xs:w-[40%] flex flex-col gap-2">
          <h2 className="text-base font-semibold">Email Notifications</h2>
          <p className="text-sm text-dark1">
            Substance can send you email notifications for any new direct messages
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="  w-full xs:w-[60%] flex flex-col gap-2">
          {/* Toggle */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
           onClick={() => {
  const newValue = !isOn;
  setIsOn(newValue);
  formik.setFieldValue(`${name}.toggle`, newValue ? "on" : "off");
}}
          >
            <div
              className={`w-[50px] h-[25px] rounded-full flex items-center px-1 transition-all duration-500 ${
                isOn ? "bg-[#59B29F]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-[22px] h-[22px] bg-light2 rounded-full shadow-md transform transition-all duration-500 ${
                  isOn ? "translate-x-[30px]" : "translate-x-0"
                }`}
              ></div>
            </div>
            <p
              className={`font-semibold transition-all duration-500 ${
                isOn ? "text-gunmetal" : "text-gray-500"
              }`}
            >
              {isOn ? "On" : "Off"}
            </p>
          </div>

          {/* Checkboxes */}
       
        </div>
      </div>

      {/* Validation Error */}

    </div>
  );
};

export default EmailNotification;
