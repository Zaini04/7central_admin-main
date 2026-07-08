import React, { forwardRef,useState, useImperativeHandle,useEffect} from "react";
import { Formik, Form } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import FormControl from "components/global/form/FormControl";
import StateInput from "components/global/form/StateInput";
import CountryInput from "components/global/form/CountryInput";
import CityInput from "components/global/form/CityInput";

import nextkinValidations from "validations/nextkinValidations";
import { CUSTOMER_RELATION_TYPES } from "constants/addcustomer.constants";
import Axios from "config/api";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { setDoc } from "redux/slices/customerSlice";
import {getStateCodeFromName}   from 'utils/getStateCodeFromName';

const Nextkinfrom = forwardRef((props, ref,   
   ) => {
      const { loading, setLoading } = props;

          const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let submitFormFn = null;
  const { doc } = useSelector((state) => state.customer);

 console.log('nextOfKin doc ',doc)


  const kinId =doc?.nextOfKin?._id;
     

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (submitFormFn) submitFormFn();
    },
  }));




const { data } = useQuery(["single-customer", id], async () => {
  const res = await Axios(`/customer/${id}`);
  return res.data; 
});


useEffect(() => {
  if (!data?.data?.doc) return;
  const d = data.data.doc;
  console.log("d", d);

  dispatch(setDoc(d));
}, [data, dispatch]);


  





const initialValues = {
  customer: doc?.nextOfKin?.customer || "",
  name: doc?.nextOfKin?.name || "",
  fatherName: doc?.nextOfKin?.fatherName || "",
  cnic: doc?.nextOfKin?.cnic || "",
  passportNumber: doc?.nextOfKin?.passportName || "",
  phoneNumber: doc?.nextOfKin?.phoneNumber || "",
  email: doc?.nextOfKin?.email || "",
  relationType: doc?.nextOfKin?.relationType || "",

  houseFlatNumber: doc?.nextOfKin?.houseFlatNumber || "",
  address: doc?.nextOfKin?.address || "",
  address2: doc?.nextOfKin?.address2 || "",

 countryCode:doc?.nextOfKin?.countryCode || "",
  countryName: doc?.nextOfKin?.countryName || "",
  province: doc?.nextOfKin?.province || "",
  stateCode: getStateCodeFromName(
    doc?.nextOfKin?.countryCode,
    doc?.nextOfKin?.province
  ),
  city: doc?.nextOfKin?.city || "",
};




  const handleSubmit = async (values, { resetForm }) => {


      const isChanged = Object.keys(values).some(
    key => values[key] !== initialValues[key]
  );


  
  if (!isChanged) {
    navigate(`/app/Customer-detail/${id}/notifications`);
    return;
  }
  try {
    setLoading(true);
    values.customer = id;

    delete values.stateCode;

    console.log("Submitted Values:", values);

    const {
      data: {
        data: { doc, message },
      },
    } = await Axios.put(`/customer/update-next-of-kin/${kinId}`, values);
    toast.success(message);
    const customerId = doc._id;
    resetForm();
          navigate(`/app/Customer-detail/${id}/notifications`);

    setLoading(false);

  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Failed to submit Next of Kin details.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex flex-col gap-0.5 w-full py-3  px-3">
        <h3 className="text-lg font-semibold py-2">Next of Kin</h3>
                        <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

      </div>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={nextkinValidations}
        enableReinitialize={true}

        onSubmit={handleSubmit}
      >
        {(formik) => {
          submitFormFn = formik.submitForm;
          return  (
          <Form className="flex flex-col gap-6 py-6">
            <p className=" text-gunmetal  font-semibold  px-3 pb-4">Next of Kin Details</p>
         
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10 px-3  mt-4 pb-4">
              <FormControl
                control="input"
                type="text"
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
                label="Father’s/Husband Name"
                name="fatherName"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <FormControl
                control="input"
                type="text"
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
                label="Phone Number"
                name="phoneNumber"
                formik={formik}
              />
              <FormControl
                control="input"
                type="email"
                label="Email"
                name="email"
                formik={formik}
              />
              <FormControl
                control="select"
                type="email"
                label="Email"
                name="email"
                formik={formik}
              />
              <FormControl
                  control="multiple-option"
                  label="Relation Type"
                  name="relationType"
                  formik={formik}
                  options={CUSTOMER_RELATION_TYPES}
                />

            </div>
                            <hr className="w-[98%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>


            {/* Address Details */}
            <div className="flex flex-col gap-6 px-3">
              <p className="font-semibold text-base text-gunmetal pb-6">Location / Address</p>
              <div className="w-full grid   grid-cols-1 sm:grid-cols-2 gap-10 pb-4">
                <FormControl
                  control="input"
                  type="text"
                  label="House/Flat Number"
                  name="houseFlatNumber"
                  formik={formik}
                />
                <FormControl
                  control="input"
                  type="text"
                  label="Address"
                  name="address"
                  formik={formik}
                />
                <FormControl
                  control="input"
                  type="text"
                  label="Address (Optional)"
                  name="address2"
                  formik={formik}
                />

                {/* Location Inputs */}
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
        )
        }
       }
      </Formik>
    </div>
  );
});

export default Nextkinfrom;
