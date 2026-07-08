import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import FormControl from "components/global/form/FormControl";
import StateInput from "components/global/form/StateInput";
import CountryInput from "components/global/form/CountryInput";
import CityInput from "components/global/form/CityInput";
import jointValidations from "validations/jointValidations";

const initialValues = {
  customers: [
    {
      ApplicantName: "",
      LastName: "",
      CNIC: "",
      passportNumber: "",
      phonenumber: "",
      email: "",
      houseFlatNumber: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
    },
  ],
};

const JointForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      console.log("Submitted Values:", values);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex flex-col gap-0.5 w-full py-3 border-b px-3">
        <h3 className="text-lg font-semibold">Joint Application</h3>
        <p className="text-sm text-gray-600">Add Joint Applicant Details</p>
      </div>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={jointValidations}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form   id="jointApplicant" className="flex flex-col gap-6">
            <FieldArray name="customers">
              {({ push, remove }) => (
                <>
                  {formik.values.customers.map((customer, index) => (
                    <div
                      key={index}
                      className="border rounded-lg mb-5 shadow-sm overflow-hidden"
                    >
                      <div className="flex justify-between items-center bg-gray-100 py-2 px-4">
                        <h4 className="font-semibold text-gray-700">
                          Applicant {index + 1}
                        </h4>
                        {formik.values.customers.length > 1 && (
                          <button
                            type="button"
                            className="text-red-600 text-sm hover:underline"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {/* Personal Details */}
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 px-4 border-b mt-4 pb-4">
                        <FormControl
                          control="input"
                          type="text"
                          label="Customer Name"
                          name={`customers[${index}].ApplicantName`}
                          formik={formik}
                        />
                        <FormControl
                          control="input"
                          type="text"
                          label="Father’s/Husband Name"
                          name={`customers[${index}].LastName`}
                          formik={formik}
                        />
                        <FormControl
                          control="input"
                          type="text"
                          label="CNIC / NICOP Number"
                          name={`customers[${index}].CNIC`}
                          formik={formik}
                        />
                        <FormControl
                          control="input"
                          type="text"
                          label="Passport Number"
                          name={`customers[${index}].passportNumber`}
                          formik={formik}
                        />
                        <FormControl
                          control="input"
                          type="text"
                          label="Phone Number"
                          name={`customers[${index}].phonenumber`}
                          formik={formik}
                        />
                        <FormControl
                          control="input"
                          type="email"
                          label="Email"
                          name={`customers[${index}].email`}
                          formik={formik}
                        />
                      </div>

                      {/* Address Details */}
                      <div className="flex flex-col gap-6 px-4">
                        <p className="font-semibold text-base text-gunmetal">
                          Address
                        </p>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 border-b pb-4">
                          <FormControl
                            control="input"
                            type="text"
                            label="House/Flat Number"
                            name={`customers[${index}].houseFlatNumber`}
                            formik={formik}
                          />
                          <FormControl
                            control="input"
                            type="text"
                            label="Address"
                            name={`customers[${index}].address1`}
                            formik={formik}
                          />
                          <FormControl
                            control="input"
                            type="text"
                            label="Address (Optional)"
                            name={`customers[${index}].address2`}
                            formik={formik}
                          />
                          <CountryInput
                            name={`customers[${index}].country`}
                            formik={formik}
                          />
                          <StateInput
                            name={`customers[${index}].state`}
                            formik={formik}
                            countryCode={formik.values.customers[index].country}
                          />
                          <CityInput
                            name={`customers[${index}].city`}
                            formik={formik}
                            countryCode={formik.values.customers[index].country}
                            stateCode={formik.values.customers[index].state}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end w-full px-3">
                    <button
                      type="button"
                      className="btn-primary py-2 sm:px-6 px-6 w-fit flex items-center gap-2"
                      onClick={() =>
                        push({
                          ApplicantName: "",
                          LastName: "",
                          CNIC: "",
                          passportNumber: "",
                          phonenumber: "",
                          email: "",
                          houseFlatNumber: "",
                          address1: "",
                          address2: "",
                          country: "",
                          state: "",
                          city: "",
                        })
                      }
                    >
                      <i className="uil uil-plus text-sm sm:text-base md:text-lg"></i>
                      Add More
                    </button>
                  </div>
                </>
              )}
            </FieldArray>

            {/* Submit Button */}
            <div className="px-3">
              <button
                type="submit"
                className="btn-primary py-3 sm:px-12 px-6 w-fit"
                disabled={loading}
              >
                {loading ? <ClipLoader size={20} /> : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JointForm;
