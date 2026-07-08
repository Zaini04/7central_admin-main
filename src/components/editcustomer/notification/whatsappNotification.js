import { useState, useEffect } from "react";
import { ErrorMessage } from "formik";
import TextError from "components/global/form/TextError";
import CheckAllSVG from "assets/svgs/CheckAll";

const WhatsappNotification = ({ name, formik }) => {
  const [isOn, setIsOn] = useState(false);

useEffect(() => {
  const formValue = formik.values[name]?.toggle === "on";
  setIsOn(formValue);
}, [formik.values[name]?.toggle]);

  const handlePreferenceChange = (value) => {
    formik.setFieldValue(`${name}.preference`, value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col xs:flex-row gap-2 px-3 mt-4">
        <div className="  w-full xs:w-[40%] flex flex-col gap-2">
          <h2 className="text-base font-semibold">WhatsApp Notifications</h2>
          <p className="text-sm text-dark1">
            Substance can send you WhatsApp notifications for any new direct messages
          </p>
        </div>

        <div className="  w-full xs:w-[60%] flex flex-col gap-2">
          {/* Toggle Switch */}
          <div className="flex items-center gap-2">
            <div
                    onClick={() => {
  const newValue = !isOn;
  setIsOn(newValue);
  formik.setFieldValue(`${name}.toggle`, newValue ? "on" : "off");
}}
              className={`w-[50px] h-[25px] rounded-full flex items-center cursor-pointer transition-all duration-300 ${
                isOn ? "bg-[#59B29F]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-[22px] h-[22px] bg-light2 rounded-full transform transition-all duration-300 ${
                  isOn ? "translate-x-[32px]" : "translate-x-[2px]"
                }`}
              ></div>
            </div>
            <p  className={`font-semibold transition-all duration-500 ${
                isOn ? "text-gunmetal" : "text-gray-500"
              }`}>{isOn ? "On" : "Off"}</p>
          </div>

          {/* Error for toggle */}
          <ErrorMessage
            name={`${name}.toggle`}
            component={TextError}
          />

          {/* Preferences */}
          
        </div>
      </div>
    </div>
  );
};

export default WhatsappNotification;
