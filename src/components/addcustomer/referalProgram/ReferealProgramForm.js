import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "components/global/form/FormControl";

import StateInput from 'components/global/form/StateInput';
import CountryInput from "components/global/form/CountryInput";
import CityInput from "components/global/form/CityInput";
import ImageUpload from 'components/global/form/ImageUpload';
import EducationInput from "components/global/form/EducationInput";
import GenderInput from "components/global/form/GenderInput";
import DateOfBirthInput from "components/global/form/AgeInput";
import originalBuyerBValidation from "validations/originalBuyerValidations";
import ReferralCustomerCard from "./ReferralCustomerCard";
import NextButton from "components/global/form/NextButton";
import CancelButton from "components/global/form/CancelButton";

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
  stateCode: '',
  province: "",
  city: "",
  customerType: "",
  filer: "",
  nttnumber: "",
  gender: "",
  education: "",
  profession: "",
  age: "",
};

const ReferalProgramForm = forwardRef((props, ref) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [referrals, setReferrals] = useState([]);
  const [editingId, setEditingId] = useState(null);

  let submitFormFn = null;

  // "Next" button (parent layout) calls this — navigate forward
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      navigate(`/app/Customer/${id}/notifications`);
    },
  }));

  const handleSubmit = (values, { resetForm }) => {
    const payload = {
      ...(values.image && { image: values.image }),
      name: values.name,
      fatherName: values.fatherName,
      email: values.email,
      cnic: values.cnic,
      phoneNumber: values.phoneNumber,
      whatsappNumber: values.whatsappNumber,
      customerType: values.customerType,
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
      ...(values.filer && { filer: values.filer }),
      ...(values.nttnumber && { nttnumber: values.nttnumber }),
      ...(values.gender && { gender: values.gender }),
      ...(values.education && { education: values.education }),
      ...(values.profession && { profession: values.profession }),
      ...(values.age && { age: values.age }),
    };

    if (editingId) {
      setReferrals((prev) =>
        prev.map((item) =>
          item._localId === editingId ? { ...payload, _localId: editingId } : item
        )
      );
      setEditingId(null);
    } else {
      setReferrals((prev) => [...prev, { ...payload, _localId: Date.now().toString() }]);
    }

    resetForm();
  };

  const handleDelete = (localId) => {
    setReferrals((prev) => prev.filter((item) => item._localId !== localId));
    if (editingId === localId) setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <Formik
        initialValues={initValues}
        validationSchema={originalBuyerBValidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          submitFormFn = formik.submitForm;

          return (
            <Form className="flex flex-col gap-6">

              <div className="flex flex-col gap-6 ">
                <p className="font-semibold text-base px-3 text-gunmetal pt-6">Basic Information</p>
                <div className="mt-4 flex flex-col-reverse gap-y-8 items-start md:flex-row md:items-end pb-4 px-3">
                  <div className="w-full md:w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-10">
                    <FormControl control="input" type="text" placeholder='Enter Full Name' label="Full Name" name="name" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                    <FormControl control="input" type="text" placeholder="Enter Father/Husband Name" label="Father/Husband Name" name="fatherName" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                    <FormControl control="input" type="text" placeholder='Enter CNIC / NICOP Number' label="CNIC / NICOP Number" name="cnic" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                    <FormControl control="input" type="text" placeholder='Enter Passport Name' label="Passport Name (Optional)" name="passportName" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                    <FormControl control="input" type="text" placeholder='Enter Profession' label="Profession" name="profession" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                    <DateOfBirthInput name="age" label="Date of Birth" placeholder="Select Date of Birth" formik={formik} />
                    <GenderInput name="gender" label="Gender" placeholder="Select Gender" formik={formik} />
                    <EducationInput name="education" label="Education" placeholder="Select Education" formik={formik} />
                  </div>
                  <ImageUpload name="image" formik={formik} />
                </div>
                <hr className="w-[98%] h-[1.5px] mx-auto bg-[#9A9A9A]" />
              </div>

              {/* Filer Section */}
              <div className="flex flex-col gap-6 px-3">
                <p className="font-semibold text-base text-gunmetal py-6">Filer Details</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 pb-4">
                  <FormControl control="multiple-option" name="filer" label="Select Filer" options={["Filer", "Non Filer"]} placeholder="Select Filer" formik={formik} />
                  {formik.values.filer === "Filer" && (
                    <div className="col-span-3">
                      <FormControl control="input" type="text" placeholder="Enter NTT Number" label="NTT Number" name="nttnumber" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                    </div>
                  )}
                </div>
                <hr className="w-[100%] h-[1.5px] mx-auto bg-[#9A9A9A]" />
              </div>

              {/* Contact Section */}
              <div className="flex flex-col gap-6 px-3">
                <p className="font-semibold text-base text-gunmetal py-6">Contact Details</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 pb-4">
                  <FormControl control="input" type="text" placeholder="Enter Phone Number" label="Phone Number" name="phoneNumber" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="email" placeholder='Enter Email' label="Email" name="email" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" placeholder='Enter Phone Number 2' label="Phone Number 2" name="phoneNumber2" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" placeholder="Enter WhatsApp Number" label="WhatsApp Number" name="whatsappNumber" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" placeholder="WhatsApp Number 2 (Optional)" label="WhatsApp Number 2 (Optional)" name="whatsappNumber2" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                </div>
                <hr className="w-[100%] h-[1.5px] mx-auto bg-[#9A9A9A]" />
              </div>

              {/* Address Section */}
              <div className="flex flex-col gap-6 px-3">
                <p className="font-semibold text-base text-gunmetal py-6">Address</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 border-b pb-4">
                  <FormControl control="input" type="text" placeholder="Enter House/Flat Number" label="House/Flat Number" name="houseFlatNumber" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" placeholder="Enter Address" label="Address" name="address" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" placeholder="Enter Address 2" label="Address 2 (Optional)" name="address2" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <CountryInput name="countryName" formik={formik} />
                  <StateInput name="province" formik={formik} countryCode={formik.values.countryCode} />
                  <CityInput name="city" formik={formik} countryCode={formik.values.countryCode} stateCode={formik.values.stateCode} />
                </div>
              </div>

              <div className="px-3 flex items-center gap-3">
                <button type="submit" className="">
                    <NextButton label= {editingId ? "Update Referral" : "Add Referral"} isIcon={false}
/>
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      formik.resetForm();
                    }}
                  >
                    <CancelButton/>
                  </button>
                )}
              </div>

              {/* Added referrals list — INSIDE Formik scope so setValues works */}
              {referrals.length > 0 && (
                <div className="flex flex-col gap-4 px-3 mt-4">
                  <p className="font-semibold text-base text-gunmetal">
                    Added Referrals ({referrals.length})
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {referrals.map((customer) => (
                      <ReferralCustomerCard
                        key={customer._localId}
                        data={customer}
                        onEdit={() => {
                          formik.setValues({ ...initValues, ...customer });
                          setEditingId(customer._localId);
                        }}
                        onDelete={() => handleDelete(customer._localId)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});

export default ReferalProgramForm;