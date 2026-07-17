import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import FormControl from "components/global/form/FormControl";
import StateInput from "components/global/form/StateInput";
import CountryInput from "components/global/form/CountryInput";
import CityInput from "components/global/form/CityInput";

import nextkinValidations from "validations/nextkinValidations";
import { CUSTOMER_RELATION_TYPES } from "constants/addcustomer.constants";
import { RECORD_TYPES, DOCUMENT_TYPE_MAP } from "constants/app.constants";
import Axios from "config/api";
import toast from "react-hot-toast";
import { customer_nextofkin } from "redux/actions/customerActions";
import DateOfBirthInput from "components/global/form/AgeInput";

const initialValues = {
  customer: "",
  name: "",
  fatherName: "",
  cnic: "",
  passportNumber: "",
  phoneNumber: "",
  email: "",
  houseFlatNumber: "",
  address: "",
  address2: "",
  country: "",
  province: "",
  stateCode: "",
  city: "",
  dateOfBirth: "",

  // Document fields
  documentName: "",
  documentType: "",
  attachments: [],
  attachments_front: [],
  attachments_back: [],
  image: null,
  image_tags: [],
  otherNote: "",
};

const Nextkinfrom = forwardRef((props, ref) => {
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
    console.log("next kin form",values)
  setLoading(true);
  try {
    values.customer = id;
    values.countryName = values.country;
    delete values.stateCode;

    // Document fields ko destructure karke alag nikal lo — abhi backend nahi bhejne
    const {
      documentName,
      documentType,
      attachments,
      attachments_front,
      attachments_back,
      image,
      image_tags,
      otherNote,
      ...rest
    } = values;

    // Sirf console/local ke liye document data (abhi backend design hone tak)
    console.log("Document data (frontend only, not sent to backend):", {
      documentName,
      documentType,
      attachments,
      attachments_front,
      attachments_back,
      image,
      image_tags,
      otherNote,
    });

    console.log("Next of Kin Payload (sent to backend):", rest);

    await dispatch(customer_nextofkin(rest, navigate));
    resetForm();
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Failed to submit Next of Kin details.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col gap-3">
      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={nextkinValidations}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          submitFormFn = formik.submitForm;
          return (
            <Form className="flex flex-col gap-6">
              <p className=" text-gunmetal  font-semibold  px-3 py-4">Next of Kin Details</p>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 px-3  mt-4 pb-4">
                <FormControl
                  control="input"
                  type="text"
                  placeholder="Enter Next Of Kin Name"
                  label="Next Of Kin Name"
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
                <DateOfBirthInput
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="Select Date of Birth"
                  formik={formik}
                />
                <FormControl
                  control="input"
                  type="text"
                  placeholder="Enter CNIC / NICOP Number"
                  label="CNIC / NICOP Number"
                  name="cnic"
                  formik={formik}
                  autoComplete="new-cnic"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                <FormControl
                  control="input"
                  type="text"
                  placeholder="Enter Passport Number"
                  label="Passport Number"
                  name="passportNumber"
                  formik={formik}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                <FormControl
                  control="input"
                  type="text"
                  placeholder="Enter Phone Number"
                  label="Phone Number"
                  name="phoneNumber"
                  formik={formik}
                />
                <FormControl
                  control="input"
                  type="email"
                  placeholder="Enter Email"
                  label="Email"
                  name="email"
                  formik={formik}
                />
                <FormControl
                  control="multiple-option"
                  label="Relation Type"
                  placeholder="Select Relation"
                  name="relationType"
                  formik={formik}
                  options={CUSTOMER_RELATION_TYPES}
                />
              </div>

              <hr className="w-[98%] h-[1px]  mx-auto bg-[#9A9A9A]" />

              {/* Address Details */}
              <div className="flex flex-col gap-6 px-3">
                <p className="font-semibold text-base text-gunmetal py-4">Location/Address</p>
                <div className="w-full grid   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 border-b pb-4">
                  <FormControl
                    control="input"
                    type="text"
                    placeholder="Enter House/Flat Number"
                    label="House/Flat Number"
                    name="houseFlatNumber"
                    formik={formik}
                  />
                  <FormControl
                    control="input"
                    type="text"
                    placeholder="Enter Address"
                    label="Address"
                    name="address"
                    formik={formik}
                  />
                  <FormControl
                    control="input"
                    placeholder="Enter Address"
                    label="Address (Optional)"
                    type="text"
                    name="address2"
                    formik={formik}
                  />

                  <CountryInput name="country" formik={formik} />
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

              {/* Document Details */}
              <div className="flex flex-col gap-6 px-3">
                <p className="font-semibold text-base text-gunmetal py-4">Document</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 pb-4">
                  <FormControl
                    control="input"
                    type="text"
                    label="Document Name"
                    placeholder="Enter Document Name"
                    name="documentName"
                    formik={formik}
                  />

                  <FormControl
                    control="multiple-option"
                    label="Document Type"
                    placeholder="Select Document Type"
                    name="documentType"
                    formik={formik}
                    options={RECORD_TYPES}
                  />

                  <div className="sm:col-span-2">
                    {formik.values.documentType === "Other" && (
                      <FormControl
                        control="textarea"
                        label="Note"
                        name="otherNote"
                        formik={formik}
                      />
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    {formik.values.documentType === "Cnic" ? (
                      <FormControl
                        control="frontBack-file"
                        label="Front Back"
                        name="attachments"
                        formik={formik}
                      />
                    ) : (
                      formik.values.documentType && (
                        <FormControl
                          control="capture-image"
                          label="Document Image"
                          name="image"
                          formik={formik}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});

export default Nextkinfrom;