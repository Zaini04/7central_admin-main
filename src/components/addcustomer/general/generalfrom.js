import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Formik, Form } from "formik";
import { useDispatch,useParams } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormControl from "components/global/form/FormControl";

import StateInput   from 'components/global/form/StateInput';
import CountryInput from "components/global/form/CountryInput";
import CityInput from "components/global/form/CityInput";
import ImageUpload   from 'components/global/form/ImageUpload';
import customerValidations from "validations/customerGeneralValidations";
import Axios from "config/api";
import toast from "react-hot-toast";
import toastError from "utils/toastError";
import {customer_create}     from 'redux/actions/customerActions.js'



const initValues = {
  image: "",
  name: "",
  fatherName: "",
  email: "",
  cnic: "",
  passportName: "",
  phoneNumber: "",
  phoneNumber2: "",
  whatsappNumber: "",
  whatsappNumber2: "",
  houseFlatNumber: "",
  address: "",
  address2: "",
  countryName: "",
  countryCode: "",
  stateCode:'',
  province: "",
  city: "",
};


const GeneralForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let submitFormFn = null;

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (submitFormFn) submitFormFn();
    },
  }));


const handleSubmit = async (values, { resetForm }) => {
  setLoading(true);

const payload = {
   ...(values.image && { image: values.image}),
  name: values.name,
  fatherName: values.fatherName,
  email: values.email,
  cnic: values.cnic,
  phoneNumber: values.phoneNumber,
  whatsappNumber: values.whatsappNumber,

  ...(values.passportName && { passportName: values.passportName }),
  ...(values.phoneNumber2 && { phoneNumber2: values.phoneNumber2 }),
  ...(values.whatsappNumber2 && { whatsappNumber2: values.whatsappNumber2 }),
  ...(values.houseFlatNumber && { houseFlatNumber: values.houseFlatNumber }),
  ...(values.address && { address: values.address }),
  ...(values.address2 && { address2: values.address2 }),
  ...(values.countryName && { countryName: values.countryName }),
  ...(values.countryCode && { countryCode: values.countryCode }),
  ...(values.province && { province: values.province }),
  ...(values.city && { city: values.city }),
};


console.log('payload',payload);




  try {

  await dispatch(customer_create(payload, navigate)); 

    resetForm();
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex flex-col gap-3">
      {/* <div className="flex flex-col gap-0.5 w-full py-3 border-b px-3">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <p className="text-sm text-gray-600">Edit Personal Details</p>
      </div> */}

      <Formik 
      initialValues={initValues} 
      validationSchema={customerValidations}
      onSubmit={handleSubmit}>
        {(formik) => {
          submitFormFn = formik.submitForm;

          return (
      <Form className="flex flex-col gap-6">


  
  <div className="flex flex-col gap-6 ">
        <p className="font-semibold text-base px-3 text-gunmetal pt-6  ">Basic Information</p>
<div className=" -mt-8 flex flex-col-reverse gap-y-8 items-start md:flex-row md:items-end   pb-4 px-3">
    <div className="w-full md:w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-5  gap-y-10    ">



      <FormControl
        control="input"
        type="text"
        placeholder='Enter Full Name'
        label="Full Name"
        name="name"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      <FormControl
        control="input"
        type="text"
        placeholder="Enter Father/Husband Name"
        label="Father/Husband Name"
        name="fatherName"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />

        <FormControl
        control="input"
        type="text"
        placeholder='Enter CNIC / NICOP Number'
        label="CNIC / NICOP Number"
        name="cnic"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />
       <FormControl
        control="input"
        type="text"
        placeholder='Enter Passport Name'
        label="Passport Name (Optional)"
        name="passportName"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />

    </div>
<ImageUpload
    name="image"
    formik={formik}
  />

  </div>
  <hr className="w-[98%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

  </div>

  {/* contact Section */}
  <div className="flex flex-col gap-6 px-3">
    <p className="font-semibold text-base text-gunmetal py-6">Contact Details</p>

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10  pb-4">
      
      <FormControl
        control="input"
        type="text"
        placeholder="Enter Phone Number"
        label="Phone Number"
        name="phoneNumber"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />

       

      <FormControl
        control="input"
        type="email"
        placeholder='Enter Email '
        label="Email"
        name="email"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />

    

      

      <FormControl
        control="input"
        type="text"
        placeholder='Enter Phone Number 2 '
        label="Phone Number 2 "
        name="phoneNumber2"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      <FormControl
        control="input"
        type="text"
        placeholder="Enter WhatsApp Number"
        label="WhatsApp Number"
        name="whatsappNumber"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      <FormControl
        control="input"
        type="text"
        placeholder="WhatsApp Number 2 (Optional)"
        label="WhatsApp Number 2 (Optional)"
        name="whatsappNumber2"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      </div>
        <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

    </div>
  {/* Address Section */}
  <div className="flex flex-col gap-6 px-3">
    <p className="font-semibold text-base text-gunmetal py-6">Address</p>

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 border-b pb-4">

      <FormControl
        control="input"
        type="text"
        placeholder="Enter House/Flat Number"
        label="House/Flat Number"
        name="houseFlatNumber"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      <FormControl
        control="input"
        type="text"
        placeholder="Enter Address"
        label="Address"
        name="address"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      <FormControl
        control="input"
        type="text"
        placeholder="Enter Address 2 "
        label="Address 2 (Optional)"
        name="address2"
        formik={formik}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />

           <CountryInput name="countryName" formik={formik} />

          <StateInput
            name="province"
            formik={formik}
            countryCode={formik.values.countryCode}
          />

          <CityInput
            name="city"
            formik={formik}
            countryCode={formik.values.countryCode}
            stateCode={formik.values.stateCode}
          />



    </div>
  </div>
</Form>

          );
        }}
      </Formik>
    </div>
  );
});

export default GeneralForm;
