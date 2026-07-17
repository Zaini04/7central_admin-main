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
import NextButton from "components/global/form/NextButton";
import EditButton from "components/global/form/EditButton";

// NOTE: Dealer backend does not exist yet. This form is UI-only for now —
// no API calls, no redux fetch. The row data from DealerTable is passed via
// router `state` when navigating here (see DealerTable's goToDealer), and we
// use that + the `:id` param to pre-fill whatever fields are available.
// Once the backend is ready, replace the state-based pre-fill below with a
// real fetch-by-id (e.g. useQuery(["dealer", id], ...)).

const blankValues = {
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
  stateCode: "",
  province: "",
  city: "",
};

// Dummy dealer rows (from DealerTable/Dealer page) only have a handful of
// fields (name, phone, location, ...). Map whatever overlaps into the
// full form shape and leave the rest blank until real data exists.
const mapDummyRowToFormValues = (row) => {
  if (!row) return blankValues;
  return {
    ...blankValues,
    name: row.name || "",
    phoneNumber: row.phone || "",
    city: row.location || "",
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
      // Backend not ready yet — just validate and move on.
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
                 <div className="flex justify-between items-center w-full">
                  <h2 className="page-heading">{initialValues.name}</h2>
                  <div className="px-3 flex justify-end mt-4">
                    <div className="flex items-center gap-2">
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
                        //   isIcon={false}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                                <div className="bg-white rounded-xl">

                <div className="flex flex-col gap-6 ">

        <p className="font-semibold text-base px-3 text-gunmetal mt-4">Basic Information</p>

<div className="  flex flex-col-reverse gap-y-8 items-start md:flex-row md:items-end    pb-4 px-3">
                <div className="w-full md:w-[80%] grid grid-cols-1 sm:grid-cols-2  gap-x-5 gap-y-10  pb-4">
                <FormControl control="input" type="text" label="Full Name" name="name" formik={formik} />
                <FormControl control="input" type="text" label="Father/Husband Name" name="fatherName" formik={formik} />
                <FormControl control="input" type="text" label="CNIC / NICOP Number" name="cnic" formik={formik} />

                </div>
                       <div>

                             <ImageUpload  name="image" formik={formik} />
                       </div>
                       
              </div>
                <hr className="w-[98%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

              </div>

              <div className="flex flex-col gap-6 px-3">
                <p className="font-semibold text-base text-gunmetal py-6">Contact Details</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10  pb-4">
                   <FormControl control="input" type="text" label="Passport Name (Optional)" name="passportName" formik={formik} />
                <FormControl control="input" type="text" label="Phone Number" name="phoneNumber" formik={formik} />
                <FormControl control="input" type="email" label="Email" name="email" formik={formik} />
                <FormControl control="input" type="text" label="Phone Number 2" name="phoneNumber2" formik={formik} />
                <FormControl control="input" type="text" label="WhatsApp Number" name="whatsappNumber" formik={formik} />
                <FormControl control="input" type="text" label="WhatsApp Number 2 (Optional)" name="whatsappNumber2" formik={formik} />
                </div>
                              <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

              </div>
              <div className="flex flex-col gap-6 px-3">
                <p className="font-semibold text-base text-gunmetal py-6">Address</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 pb-4">
                  <FormControl control="input" type="text" label="House/Flat Number" name="houseFlatNumber" formik={formik} />
                  <FormControl control="input" type="text" label="Address" name="address" formik={formik} />
                  <FormControl control="input" type="text" label="Address 2 (Optional)" name="address2" formik={formik} />

                  <CountryInput name="countryName" formik={formik} />
                  <StateInput name="province" formik={formik} countryCode={formik.values.countryCode} />
                  <CityInput name="city" formik={formik} countryCode={formik.values.countryCode} stateCode={formik.values.stateCode} />
                </div>
                                <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

              </div>
              </div>

              <div className="px-3 w-full flex justify-end mt-4">
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