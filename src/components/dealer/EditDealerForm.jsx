import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import FormControl from "components/global/form/FormControl";
import StateInput from "components/global/form/StateInput";
import CountryInput from "components/global/form/CountryInput";
import CityInput from "components/global/form/CityInput";
import ImageUpload from "components/global/form/ImageUpload";
import customerValidations from "validations/customerGeneralValidations";
import ClearButton from "components/global/form/ClearButton";
import EditButton from "components/global/form/EditButton";
import DateOfBirthInput from "components/global/form/AgeInput";
import GenderInput from "components/global/form/GenderInput";
import EducationInput from "components/global/form/EducationInput";
import BackButton from "components/global/form/BackButton";

const blankValues = {
  image: "",
  name: "",
  fatherName: "",
  dateOfBirth: "",
  gender: "",
  education: "",
  profession: "",
  email: "",
  cnic: "",
  CentralRegistered: "",
  DHARegistered: "",
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
  stateCode: "",
  province: "",
  city: "",
};

// Map whatever overlaps into the full form shape and leave the rest blank
const mapDummyRowToFormValues = (row) => {
  if (!row) return blankValues;
  return {
    ...blankValues,
    name: row.name || "",
    fatherName: row.fatherName || "",
    dateOfBirth: row.dateOfBirth || row.age || "",
    gender: row.gender || "",
    education: row.education || "",
    profession: row.profession || "",
    email: row.email || "",
    cnic: row.cnic || "",
    CentralRegistered: row.CentralRegistered || "",
    DHARegistered: row.DHARegistered || "",
    passportName: row.passportName || "",
    phoneNumber: row.phoneNumber || row.phone || "",
    phoneNumber2: row.phoneNumber2 || "",
    whatsappNumber: row.whatsappNumber || "",
    whatsappNumber2: row.whatsappNumber2 || "",
    houseFlatNumber: row.houseFlatNumber || "",
    address: row.address || "",
    address2: row.address2 || "",
    countryName: row.countryName || "",
    countryCode: row.countryCode || "",
    stateCode: row.stateCode || "",
    province: row.province || "",
    city: row.city || row.location || "",
    image: row.image || "",
  };
};

const EditDealerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const initialValues = mapDummyRowToFormValues(location.state);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      // Backend not ready yet — payload log karke check kar sakte hain
      console.log("Updated values payload:", values);
      navigate("/app/dealer");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={customerValidations}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <>
              <Form className="flex flex-col gap-6">
                {/* Top Action Control Bar */}
                <div className="flex justify-between items-center w-full">
                  <h2 className="page-heading">
                    Edit Dealer: {initialValues.name || "Details"}
                  </h2>
                  <div className="px-3 flex justify-end mt-4">
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => navigate("/app/dealer")}>
                        <BackButton />
                      </button>

                      <button
                        type="button"
                        className="w-fit"
                        onClick={() => formik.resetForm()}
                      >
                        <ClearButton />
                      </button>

                      <button
                        type="submit"
                        className="w-fit"
                        disabled={loading}
                      >
                        <EditButton
                          label="Edit Dealer"
                          createLoading={loading}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl">
                  {/* Basic Information Section */}
                  <div className="flex flex-col gap-6 mt-4">
                    <p className="font-semibold text-base px-3 text-gunmetal">
                      Basic Information
                    </p>
                    <div className="mt-4 flex flex-col-reverse gap-y-8 items-start md:flex-row md:items-end pb-4 px-3">
                      <div className="w-full md:w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-10">
                        <FormControl
                          control="input"
                          type="text"
                          placeholder="Enter Full Name"
                          label="Full Name"
                          name="name"
                          formik={formik}
                        />

                        <FormControl
                          control="input"
                          type="text"
                          placeholder="Enter Father/Husband Name"
                          label="Father/Husband Name"
                          name="fatherName"
                          formik={formik}
                        />

                        <FormControl
                          control="input"
                          type="text"
                          placeholder="Enter CNIC / NICOP Number"
                          label="CNIC / NICOP Number"
                          name="cnic"
                          formik={formik}
                        />

                        <FormControl
                          control="input"
                          type="text"
                          placeholder="Enter DHA Registration Number"
                          label="DHA Registration Number"
                          name="DHARegistered"
                          formik={formik}
                        />

                        <FormControl
                          control="input"
                          type="text"
                          placeholder="Enter 7Central Registration Number"
                          label="7Central Registration Number"
                          name="CentralRegistered"
                          formik={formik}
                        />

                        <FormControl
                          control="input"
                          type="text"
                          placeholder="Enter Passport Name"
                          label="Passport Name (Optional)"
                          name="passportName"
                          formik={formik}
                        />

                        <FormControl
                          control="input"
                          type="text"
                          placeholder="Enter Profession"
                          label="Profession"
                          name="profession"
                          formik={formik}
                        />

                        <DateOfBirthInput
                          name="dateOfBirth"
                          label="Date of Birth"
                          placeholder="Select Date of Birth"
                          formik={formik}
                        />

                        <GenderInput
                          name="gender"
                          label="Gender"
                          placeholder="Select Gender"
                          formik={formik}
                        />

                        <EducationInput
                          name="education"
                          label="Education"
                          placeholder="Select Education"
                          formik={formik}
                        />
                      </div>
                      <ImageUpload name="image" formik={formik} />
                    </div>
                    <hr className="w-[98%] h-[1.5px] mx-auto bg-[#9A9A9A]" />
                  </div>

                  {/* Contact Details Section */}
                  <div className="flex flex-col gap-6 px-3">
                    <p className="font-semibold text-base text-gunmetal py-6">
                      Contact Details
                    </p>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 pb-4">
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
                        control="input"
                        type="text"
                        placeholder="Enter Phone Number 2"
                        label="Phone Number 2"
                        name="phoneNumber2"
                        formik={formik}
                      />

                      <FormControl
                        control="input"
                        type="text"
                        placeholder="Enter WhatsApp Number"
                        label="WhatsApp Number"
                        name="whatsappNumber"
                        formik={formik}
                      />

                      <FormControl
                        control="input"
                        type="text"
                        placeholder="WhatsApp Number 2 (Optional)"
                        label="WhatsApp Number 2 (Optional)"
                        name="whatsappNumber2"
                        formik={formik}
                      />
                    </div>
                    <hr className="w-[100%] h-[1.5px] mx-auto bg-[#9A9A9A]" />
                  </div>

                  {/* Address Section */}
                  <div className="flex flex-col gap-6 px-3">
                    <p className="font-semibold text-base text-gunmetal py-6">
                      Address
                    </p>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 pb-4">
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
                        type="text"
                        placeholder="Enter Address 2"
                        label="Address 2 (Optional)"
                        name="address2"
                        formik={formik}
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
                    <hr className="w-[100%] h-[1.5px] mx-auto bg-[#9A9A9A]" />
                  </div>
                </div>

                {/* Bottom Action Control Bar */}
                <div className="px-3 w-full flex justify-end mt-4 mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="w-fit"
                      onClick={() => formik.resetForm()}
                    >
                      <ClearButton name />
                    </button>

                    <button type="submit" className="w-fit" disabled={loading}>
                      <EditButton
                        label="Edit Dealer"
                        createLoading={loading}
                      />
                    </button>
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditDealerForm;