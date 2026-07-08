import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import customerNotificationValidation from "validations/customerNotificationValidation";
import EmailNotification from "./emailNotification";
import WhatsappNotification from "./whatsappNotification";
import TextMessageNotification from "./textMessageNotification";
import Axios from "config/api";
import toast from "react-hot-toast";
import {customer_notifications}  from 'redux/actions/customerActions';

const initialValues = {
  emailNotification: {
    toggle: "off",
  },
  whatsAppNotification: {
    toggle: "off",
  },
  textMessage: {
    toggle: "off",
  },
};

const Notificationfrom = forwardRef((props, ref) => {
          const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let submitFormFn = null;

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (submitFormFn) submitFormFn();
    },
  }));
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      console.log("Submitted Values:", values);
      const valueData={  customer: id ,
   emailNotifications: values.emailNotification.toggle === "on",
  smsNotifications: values.textMessage.toggle === "on",
  whatsappNotifications: values.whatsAppNotification.toggle === "on",


}

 console.log(' this is a valueData',valueData)

    dispatch(customer_notifications(valueData,navigate))
       resetForm();
      
   
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit Notification settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full pb-7 px-3 pt-5">
      {/* Header */}
      <div className="flex flex-col gap-0.5 w-full   px-3">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <p className="text-sm text-gray-600 pb-6">
          Get notified to customers about alerts and installment details. You can
          turn off at any time
        </p>
          <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

      </div>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={customerNotificationValidation}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          submitFormFn = formik.submitForm;
          return  (
          <Form className="flex flex-col gap-4">
            {/* Email Notification */}
            <EmailNotification name="emailNotification" formik={formik} />

            {/* WhatsApp Notification */}
            <WhatsappNotification
              name="whatsAppNotification"
              formik={formik}
            />

            {/* Text Message Notification */}
            <TextMessageNotification name="textMessage" formik={formik} />

            {/* Submit Button */}
            {/* <div className="px-3">
              <button
                type="submit"
                className="btn-primary py-3 sm:px-12 px-6 w-fit"
                disabled={loading}
              >
                {loading ? <ClipLoader size={20} /> : "Submit"}
              </button>
            </div> */}
          </Form>
        )}}
      </Formik>
  <hr className="w-[98%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

    </div>
  );
});

export default Notificationfrom;
