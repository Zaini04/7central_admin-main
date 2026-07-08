import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import FormControl from "components/global/form/FormControl";
import InventoriesDetailValidations from "validations/InventoriesDetailValidations";
import img from "assets/images/img2.jpg";

import StateInput from "components/global/form/StateInput";
import CountryInput from "components/global/form/CountryInput";
import CityInput from "components/global/form/CityInput";

const initValues = {
  profileimg: "",
  customerName: "John",
  LastName: "Doe",
  CNIC: "00000-0000000-0",
  passportNumber: "A00000000",
  phonenumber: "+0000000000",
  phoneNumber1: "+0000000001",
  phoneNumber2: "+0000000002",
  houseFlatNumber: "",
  address1: "",
  address2: "",
  country: "",
  state: "",
  city: "",
  applicantCustomerName: "",
  applicantLastName: "",
  applicantCNIC: "",
  applicantPassportNumber: "",
  applicantPhonenumber: "",
  applicantEmail: "",
  applicantHouseFlatNumber: "",
  applicantAddress1: "",
  applicantAddress2: "",
  applicantCountry: "",
  applicantState: "",
  applicantCity: "",
  applicantCountryCode: "",
  nextOfKinCustomerName: "",
  nextOfKinLastName: "",
  nextOfKinCNIC: "",
  nextOfKinPassportNumber: "",
  nextOfKinPhonenumber: "",
  nextOfKinEmail: "",
  nextOfKinHouseFlatNumber: "",
  nextOfKinAddress1: "",
  nextOfKinAddress2: "",
  nextOfKinCountry: "",
  nextOfKinState: "",
  nextOfKinCity: "",
  nextOfKinCountryCode: "",
};

const CustomerDetailForm = ({ readOnly }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log("readOnly", readOnly);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log("Submitted Values:", values);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 px-3 pb-4">
      <Formik
        initialValues={initValues}
        validationSchema={InventoriesDetailValidations}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <>
            <Form className="flex flex-col gap-6">
              
              {/* Personal Details */}
              <div className="flex flex-col gap-5 pt-4 px-3 w-full">
                <p className="form-title">Personal Details</p>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-fit flex-shrink-0">
                    <img
                      src={img}
                      alt="Customer"
                      className="w-[120px] h-[120px] object-cover rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
                    <FormControl
                      control="input"
                      type="text"
                      label="Customer Name"
                      name="customerName"
                      formik={formik}
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                          readOnly={readOnly}
                    />
                    <FormControl
                      control="input"
                      type="text"
                      label="Father’s/Husband Name"
                      name="LastName"
                      formik={formik}
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                          readOnly={readOnly}
                    />
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 border-b pb-4">
                  <FormControl
                    control="input"
                    type="text"
                    label="CNIC / NICOP Number"
                    name="CNIC"
                    formik={formik}
                    autoComplete="new-cnic"
                    autoCapitalize="off"
                    spellCheck={false}
                        readOnly={readOnly}
                  />
                  <FormControl
                    control="input"
                    type="text"
                    label="Passport Number"
                    name="passportNumber"
                    formik={formik}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                        readOnly={readOnly}
                  />
                  <FormControl
                    control="input"
                    type="text"
                    label="Phone Number"
                    name="phonenumber"
                    formik={formik}
                    autoComplete=""
                    autoCapitalize=""
                    spellCheck={false}
                        readOnly={readOnly}
                  />
                  <FormControl
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
                    formik={formik}
                    autoComplete=""
                    autoCapitalize=""
                    spellCheck={false}
                        readOnly={readOnly}
                  />
                  <FormControl
                    control="input"
                    type="text"
                    label="Phone Number 1"
                    name="phoneNumber1"
                    formik={formik}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                        readOnly={readOnly}
                  />
                  <FormControl
                    control="input"
                    type="text"
                    label="Phone Number 2 (Optional)"
                    name="phoneNumber2"
                    formik={formik}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                        readOnly={readOnly}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-5 px-3 w-full">
                <p className="form-title">Address</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 border-b pb-4">
                  <FormControl
                    control="input"
                    type="text"
                    label="House/Flat Number"
                    name="houseFlatNumber"
                    formik={formik}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                        readOnly={readOnly}
                  />
                  <FormControl
                    control="input"
                    type="text"
                    label="Address"
                    name="address1"
                    formik={formik}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                        readOnly={readOnly}
                  />
                  <FormControl
                    control="input"
                    type="text"
                    label="Address (Optional)"
                    name="address2"
                    formik={formik}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                        readOnly={readOnly}
                  />
                  <CountryInput name="country" formik={formik} />
                  <StateInput
                    name="state"
                    formik={formik}
                    countryCode={formik.values.countryCode}
                  />
                  <CityInput
                    name="city"
                    formik={formik}
                    countryCode={formik.values.countryCode}
                    stateCode={formik.values.state}
                  />
                </div>
              </div>

              {/* Joint Application */}
              <div>
                <p className="text-xl lg:text-2xl font-semibold text-gunmetal">
                  Joint Application
                </p>
              </div>

              {/* Applicant Details */}
              <div className="flex flex-col gap-5 px-3 w-full">
                <p className="form-title">Applicant Details</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 border-b pb-4">
                  <FormControl control="input" type="text" label="Customer Name" name="applicantCustomerName" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="Father’s/Husband Name" name="applicantLastName" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="CNIC / NICOP Number" name="applicantCNIC" formik={formik} autoComplete="new-cnic" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="Passport Number" name="applicantPassportNumber" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="Phone Number" name="applicantPhonenumber" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="email" label="Email" name="applicantEmail" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                </div>
              </div>

              {/* Applicant Address */}
              <div className="flex flex-col gap-5 px-3 w-full">
                <p className="form-title">Address</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 border-b pb-4">
                  <FormControl control="input" type="text" label="House/Flat Number" name="applicantHouseFlatNumber" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="Address" name="applicantAddress1" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="Address (Optional)" name="applicantAddress2" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <CountryInput name="applicantCountry" formik={formik} />
                  <StateInput name="applicantState" formik={formik} countryCode={formik.values.applicantCountryCode} />
                  <CityInput name="applicantCity" formik={formik} countryCode={formik.values.applicantCountryCode} stateCode={formik.values.applicantState} />
                </div>
              </div>

              {/* Next of Kin */}
              <div>
                <p className="text-xl lg:text-2xl font-semibold text-gunmetal">Next of Kin</p>
              </div>

              {/* Next of Kin Details */}
              <div className="flex flex-col gap-5 px-3 w-full">
                <p className="form-title">Next of Kin Details</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 border-b pb-4">
                  <FormControl control="input" type="text" label="Customer Name" name="nextOfKinCustomerName" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="Father’s/Husband Name" name="nextOfKinLastName" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="CNIC / NICOP Number" name="nextOfKinCNIC" formik={formik} autoComplete="new-cnic" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="Passport Number" name="nextOfKinPassportNumber" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="Phone Number" name="nextOfKinPhonenumber" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="email" label="Email" name="nextOfKinEmail" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                </div>
              </div>

              {/* Next of Kin Address */}
              <div className="flex flex-col gap-5 px-3 w-full">
                <p className="form-title">Address</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 border-b pb-4">
                  <FormControl control="input" type="text" label="House/Flat Number" name="nextOfKinHouseFlatNumber" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="Address" name="nextOfKinAddress1" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <FormControl control="input" type="text" label="Address (Optional)" name="nextOfKinAddress2" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                  <CountryInput name="nextOfKinCountry" formik={formik} />
                  <StateInput name="nextOfKinState" formik={formik} countryCode={formik.values.nextOfKinCountryCode} />
                  <CityInput name="nextOfKinCity" formik={formik} countryCode={formik.values.nextOfKinCountryCode} stateCode={formik.values.nextOfKinState} />
                </div>
              </div>

              {/* Submit */}
              <div className="px-3 w-full flex justify-center">
                <div className="flex items-center gap-2 hidden">
                  <button
                    type="submit"
                    className="btn-primary py-2 xl:px-12 px-6 text-sm xs:text-base w-fit"
                    disabled={loading}
                  >
                    {loading ? <ClipLoader size={20} /> : "Update Inventory"}
                  </button>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CustomerDetailForm;
