import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "components/global/form/FormControl";
import StateInput from "components/global/form/StateInput";
import CountryInput from "components/global/form/CountryInput";
import CityInput from "components/global/form/CityInput";
import ImageUpload from "components/global/form/ImageUpload";
import customerValidations from "validations/customerGeneralValidations";
import Axios, { baseURL } from "config/api";
import toast from "react-hot-toast";
import { customer_update } from "redux/actions/customerActions";
import { useQuery } from "react-query";
import { setDoc } from "redux/slices/customerSlice";
import convertImageUrlToBase64 from "utils/convertImageUrlToBase64 ";
import Loader from "components/global/Loader";
import {getStateCodeFromName}   from 'utils/getStateCodeFromName';

const GeneralForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { doc } = useSelector((state) => state.customer);
  console.log(' this is a   doc',doc)


  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(false);

  let submitFormFn = null;
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (submitFormFn) submitFormFn();
    },
  }));

  const { data } = useQuery(["single-customer", id], () => Axios(`/customer/${id}`));

 
  useEffect(() => {
    dispatch(setDoc(null));
  }, [id, dispatch]);


  useEffect(() => {
    const d = data?.data?.data?.doc;
    if (!d) return;

    const fetchImageAndSet = async () => {
      let imageBase64 = "";
      if (d.customer?.image) {
        const imageUrl = d.customer.image.startsWith("http")
          ? d.customer.image
          : `${baseURL}/${d.customer.image}`;
        imageBase64 = await convertImageUrlToBase64(imageUrl);
      }

      const customerData = {
        ...d.customer,
        image: imageBase64 || "",
      };

      dispatch(setDoc({ ...d, customer: customerData }));

      setInitialValues({
        image: customerData.image,
        name: customerData.name || "",
        fatherName: customerData.fatherName || "",
        email: customerData.email || "",
        cnic: customerData.cnic || "",
        passportName: customerData.passportName || "",
        phoneNumber: customerData.phoneNumber || "",
        phoneNumber2: customerData.phoneNumber2 || "",
        whatsappNumber: customerData.whatsappNumber || "",
        whatsappNumber2: customerData.whatsappNumber2 || "",
        houseFlatNumber: customerData.houseFlatNumber || "",
        address: customerData.address || "",
        address2: customerData.address2 || "",
        countryName: customerData.countryName || "",
        countryCode: customerData.countryCode || "",
        stateCode: getStateCodeFromName(
            customerData.countryCode,
            customerData.province
          ),
        province: customerData.province || "",
        city: customerData.city || "",
      });
    };

    fetchImageAndSet();
  }, [data, dispatch]);

  if (!initialValues) return <p><Loader/></p>; 

const handleSubmit = async (values, { resetForm }) => {
  setLoading(true);
  const formData = new FormData();



  const isChanged = Object.keys(values).some(
    key => values[key] !== initialValues[key]
  );


  
  if (!isChanged) {
    navigate(`/app/Customer-detail/${id}/next-of-kin`);
    return;
  }

  if (values.image && values.image.startsWith("data:image")) {
    // const base64Response = await fetch(values.image);
    // const blob = await base64Response.blob();
    // const file = new File([blob], "profile.jpg", { type: blob.type });
    formData.append("image", values.image );
  }

  Object.keys(values).forEach((key) => {
    if (key !== "image") formData.append(key, values[key] || "");
  });


  console.log("FormData contents:");
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }


  const payload = {
    ...(values.image && { image: values.image }),
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
  console.log("Payload object:", payload);

  try {
    await dispatch(customer_update(id, payload, navigate));
    resetForm({ values });
  } catch (err) {
    console.error(err);
    toast.error("Failed to update customer");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5 w-full py-3  px-3">
        <h3 className="text-lg font-semibold py-2">General</h3>
                        <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

      </div>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={customerValidations}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          submitFormFn = formik.submitForm;
          return (
            <Form className="flex flex-col gap-6">
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
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});

export default GeneralForm;
