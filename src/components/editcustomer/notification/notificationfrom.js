import React, { forwardRef, useImperativeHandle, useState,useEffect } from "react";
import { Formik, Form } from "formik";
import { useDispatch,useSelector} from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import customerNotificationValidation from "validations/customerNotificationValidation";
import EmailNotification from "./emailNotification";
import WhatsappNotification from "./whatsappNotification";
import TextMessageNotification from "./textMessageNotification";
import Axios from "config/api";
import toast from "react-hot-toast";
import {setDocNotification}  from 'redux/slices/customerSlice'
import { useQuery } from "react-query";



const Notificationfrom = forwardRef((props, ref) => {

        const { loading, setLoading } = props;

          const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const { docNotification } = useSelector(state => state.customer);


    console.log(' this is  a docNotification',docNotification)


  let submitFormFn = null;

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (submitFormFn) submitFormFn();
    },
  }));


      
  



   const { data, isLoadingCustomer, isErrorCustomer} = useQuery(
      ["single-notfification", id],
      () => Axios(`/notification-setting/customer/${id}`)
    );
  
    useEffect(() => {
      const d = data?.data?.data?.doc;
      if (!d) return;
      dispatch(setDocNotification(d));
    }, [data, dispatch]);




  const initialValues = {
  emailNotification: {
    toggle: docNotification?.emailNotifications ? "on" : "off",
  },
  whatsAppNotification: {
    toggle: docNotification?.whatsappNotifications ? "on" : "off",
  },
  textMessage: {
    toggle: docNotification?.smsNotifications ? "on" : "off",
  },
};


  const handleSubmit = async (values, { resetForm }) => {


   const isChanged = Object.keys(values).some(
    key => values[key].toggle !== initialValues[key].toggle
  );

  if (!isChanged) {
    // Nothing changed, just navigate
    navigate(`/app/Customer-detail/${id}/document`);
    return;
  }




    try {
      setLoading(true);
      console.log("Submitted Values:", values);
      const valueData={  customer: id ,
  emailNotifications: values.emailNotification.toggle==="on"?true:false,
  smsNotifications: values.textMessage.toggle==="on"?true:false,
  whatsappNotifications: values.whatsAppNotification.toggle==="on"?true:false}

   console.log(' this is a valueData',valueData)


        const { data : { data : { doc , message } } } = await Axios.post(`/notification-setting/create-or-update` , valueData);
            toast.success(message);
            // const customerId = doc._id;
      // resetForm();
      navigate(`/app/Customer-detail/${id}/document`);
            setLoading(false);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit Notification settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full pb-7">
      {/* Header */}
      <div className="flex flex-col gap-0.5 w-full py-3  px-3">
        <h3 className="text-lg font-semibold pt-2">Notifications</h3>
        <p className="text-sm pb-2 text-gray-600">
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
                enableReinitialize={true}

      >
        {(formik) => {
          submitFormFn = formik.submitForm;
          return  (
          <Form className="flex flex-col gap-6 ">
            {/* Email Notification */}
            <EmailNotification name="emailNotification" formik={formik} />

            {/* WhatsApp Notification */}
            <WhatsappNotification
              name="whatsAppNotification"
              formik={formik}
            />

            {/* Text Message Notification */}
            <TextMessageNotification name="textMessage" formik={formik} />

         
          </Form>
        )}}
      </Formik>
    </div>
  );
});

export default Notificationfrom;
