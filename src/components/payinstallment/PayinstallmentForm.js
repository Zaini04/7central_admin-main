import { useState } from "react";
import { Formik, Form, FieldArray, getIn } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import Paymethodform from './Paymethodform';
import { create_installments } from 'redux/actions/installmentActions';
import MultiSelect from './inputinstallment/MultiSelect';
import InputDate from 'components/payinstallment/inputinstallment/inputDate';
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import InstallmentCard   from './inputinstallment/InstallmentCard';
import Input from "./inputinstallment/Input";
import ClearButton from "components/global/form/ClearButton";
import NextButton from "components/global/form/NextButton";

const validationSchema = Yup.object().shape({
  mainAmount: Yup.number()
    .required("Total Amount is required")
    .min(1, "Total Amount must be greater than 0"),

  // receiptNo: Yup.number()
  //   .required("Receipt No is required"),

  parts: Yup.array()
    .of(
      Yup.object().shape({
        amount: Yup.number()
          .required("Amount is required")
          .min(1, "Amount must be greater than 0"),

        paidAt: Yup.date()
          .required("Paid date is required"),
        reference: Yup.string().nullable()
      })
    )
    .min(1, "At least one payment method is required"),

  notes: Yup.string().nullable(),
  files: Yup.array()
});



const PayInstallmentForm = () => {
  const { id } = useParams();


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createLoading,doc } = useSelector((state) => state.installment);






const initValues = {
  mainAmount: doc?.amount || '',
  receiptNo: '',
  parts: [],
  notes: "",
  files: [],
};



  const validateForm = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      const errors = {};

      err.inner.forEach((e) => {
        errors[e.path] = e.message;
        toast.error(e.message);
      });

      return errors;
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const pad = (n) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };


  // const distributeAmounts = (selectedMethods, mainAmount, currentParts = []) => {
  //   if (!mainAmount || selectedMethods.length === 0) return [];

  //   const amountPerMethod = (parseFloat(mainAmount) / selectedMethods.length).toFixed(2);

  //   return selectedMethods.map(method => {
  //     const existingPart = currentParts.find(part => part.method === method);

  //     return {
  //       method: method,
  //       amount: amountPerMethod, 
  //       paidAt: existingPart ? existingPart.paidAt : "",
  //       reference: existingPart ? existingPart.reference : "",
  //     };
  //   });
  // };


const handleMethodSelect = (selectedMethod, formik) => {
  const exists = formik.values.parts.some(
    (p) => p.method === selectedMethod.value
  );

  if (!exists) {
    const newPart = {
      method: selectedMethod.value,
      amount: "",
      paidAt: "",
      reference: "",
    };
    formik.setFieldValue("parts", [...formik.values.parts, newPart]);
  }
};

const handleMethodRemove = (removedMethod, formik) => {
  const filteredParts = formik.values.parts.filter(
    (p) => p.method !== removedMethod.value
  );
  formik.setFieldValue("parts", filteredParts);
};

const handleMainAmountChange = (e, formik) => {
  formik.handleChange(e);
};

  const handleSubmit = async (values, { resetForm }) => {
    const errors = await validateForm(values);

    if (Object.keys(errors).length > 0) {
      return; 
    }

    try {
      const formattedValues = {
        installment: id,
        receiptNo: values?.receiptNo?.toString() || "",
        totalAmount: Number(values?.mainAmount),
        parts: values.parts.map(p => ({
          method: p.method,
          amount: Number(p.amount),
          paidAt: formatDate(p.paidAt),
          reference: p.reference || "",
        })),
        notes: values.notes || "",
        files: values.files || []
      };

      console.log("Submitted Values:", formattedValues);
      dispatch(create_installments(formattedValues, navigate));
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong while submitting");
    }
  };

  const paymentOptions = [
    { label: "Online Transfer", value: "online_transfer" },
    { label: "Cheque", value: "cheque" },
    { label: "Cheque1", value: "cheque1" },
    { label: "Cheque2", value: "cheque2" },
    { label: "Cheque3", value: "cheque3" },
    { label: "Pay Order", value: "pay_order" },
    { label: "Cash", value: "cash" },
    { label: "Other", value: "other" },
  ];
const parseNumber = (value = "") =>
  value.replace(/,/g, "").replace(/[^\d.]/g, "");

const formatNumber = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const raw = String(value).replace(/,/g, "");
  if (raw === "" || raw === ".") return raw;

  const [intPart, decPart] = raw.split(".");
  const intFormatted = Number(intPart || 0).toLocaleString("en-US");
  return decPart !== undefined ? `${intFormatted}.${decPart}` : intFormatted;
};
  return (
    <div className="w-full flex flex-col gap-6 px-3 pb-4">
      <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
          enableReinitialize={true}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <div className="flex flex-col gap-5 px-3 w-full">
                            <p className="form-title pt-4">Pay Installment </p>
              <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]" />

              <div className=" mb-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10  pt-8">
                <FormControl
                  control="input"
                  type="text"
                  label="Installment Payment"
                  PulseLoader="Enter Installment Payment"
                  name="mainAmount"
                  formik={formik}
                  value={formatNumber(formik.values.mainAmount)}
                  autoComplete="off"
                  autoCapitalize="off"
                  readOnly={true}
                  spellCheck={false}

                                    onChange={(e) => handleMainAmountChange(e, formik)}

                />
                <FormControl control="input" type="text" placeholder="Enter Receipt No" label="Receipt No" name="receiptNo" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />

                <MultiSelect
                  label="Payment Method"
                  placeholder="Select Payment Method"
                  name="parts"
                  formik={formik}
                  options={paymentOptions}
                  onSelect={(selectedMethod) => handleMethodSelect(selectedMethod, formik)}
                  onRemove={(removedMethod) => handleMethodRemove(removedMethod, formik)}
                />
              </div>
              <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]" />


              {formik.values.parts?.map((part, index) => (
                <div key={index} className="  w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
                  <FormControl
                    control="input"
                    type="text"
                    label="Paid By"
                    name={`parts[${index}].method`}
                    formik={formik}
                    value={getIn(formik.values, `parts[${index}].method`)}
                    onChange={formik.handleChange}
                    readOnly
                  />
                  <FormControl
                    control="input"
                    type="text"
                    label="Reference #"
                    placeholder="Enter Reference #"
                    name={`parts[${index}].reference`}
                    formik={formik}
                    value={getIn(formik.values, `parts[${index}].reference`)}
                    onChange={formik.handleChange}
                  />
                   <FormControl
                      control="input"
                      type="text" 
                      inputMode="decimal"
                      label="Paid Amount"
                      placeholder="Enter Paid Amount"
                      name={`parts[${index}].amount`}
                      formik={formik}
                      value={formatNumber(getIn(formik.values, `parts[${index}].amount`))}
                      onChange={(e) =>
                        formik.setFieldValue(
                          `parts[${index}].amount`,
                          parseNumber(e.target.value)
                        )
                      }
                      onBlur={formik.handleBlur}
                      step="0.01"
                    />
                  {/* <FormControl
                    control="input"
                    type="number"
                    label="Paid Amount"
                    name={`parts[${index}].amount`}
                    formik={formik}
                    value={getIn(formik.values, `parts[${index}].amount`)}
                    onChange={formik.handleChange}
                    step="0.01"
                  /> */}
                  <InputDate
                    label="Paid Date"
                    placeholder="Select Paid Date"
                    name={`parts[${index}].paidAt`}
                    formik={formik}
                    // value={getIn(formik.values, `parts[${index}].paidAt`)}
                    onChange={formik.handleChange}
                  />
                </div>
              ))}
                            <InstallmentCard  doc={doc}/>



              <FormControl
              control="textarea"
              type="text"
              label="Notes"
              name="notes"
              formik={formik}
            />
            <FormControl
              control="multi-file-base64"
              label="Add Files (Optional)"
              name="files"
              formik={formik}
              minWidth={800}
              minHeight={600}
            />

            </div>

            
            {/* Buttons */}
            <div className="px-3 w-full flex justify-end">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => formik.resetForm()}>
                  <ClearButton/>
                </button>
                <button 
  type="submit" 
  disabled={createLoading}
>
  {/* {createLoading ? (
    <PulseLoader size={12} color='white' />
  ) : (
    "Submit"
  )} */}

  <NextButton label="Submit" createLoading={createLoading} isIcon={false}/>
</button>

              
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PayInstallmentForm;