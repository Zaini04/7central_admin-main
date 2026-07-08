
import { useState } from "react";

import { Formik, Form, getIn } from "formik";
import FormControl from "components/global/form/FormControl";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import InputDate    from 'components/addPaymentReceipt/inputDate';
import InventoryInput   from 'components/addPaymentReceipt/inventorySelect';
import addProvisionalValidation   from 'validations/addProvisionalValidation'
import moment from "moment";
import {add_Inventory}  from 'redux/actions/provisionalReceiptActions'



const initValues = {
  inventory:"",
  bankName: "",
  chequeNo: "",
  chequeDate: "",
  amount: 0, 
  notes: "",
  files: []
};





const AddProvisionalReceipt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

     const {createLoading } = useSelector((state) => state.provisionalReceipt);

  
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formattedValues = {
        ...values,
        chequeDate: values.chequeDate
          ? moment(values.chequeDate).format("YYYY-MM-DD")
          : "",
        ...(values.amount && { amount: values.amount }),
        ...(values.files && { files: values.files })
      };

      console.log("Submitted Values:", formattedValues);

      dispatch(add_Inventory(formattedValues, navigate));

      // Reset form
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
      <div className="flex flex-col gap-5 w-full   bg-white  pb-4 rounded-xl shadow-sm">
            <div className="w-full flex flex-col gap-6 px-3 pb-4">
      <Formik
        initialValues={initValues}
        validationSchema={addProvisionalValidation}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <div className="flex flex-col gap-5 pt-4 px-3 w-full">
          <p className="form-title">Provisional Receipt Details</p>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
               <InventoryInput   name="inventory" formik={formik}/>
                <FormControl control="input" type="text" label="Bank Name" name="bankName" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                <FormControl control="input" type="text" label="Cheque No" name="chequeNo" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                <InputDate  type="text" label="Cheque Date" name="chequeDate" formik={formik}  />

                  <FormControl
                      control="input"
                      type="text" 
                      inputMode="decimal"
                      label="Amount"
                      name="amount"
                      formik={formik}
                      value={formatNumber(getIn(formik.values, "amount"))}
                      onChange={(e) =>
                        formik.setFieldValue(
                          `amount`,
                          parseNumber(e.target.value)
                        )
                      }
                      onBlur={formik.handleBlur}
                      step="0.01"
                    />

                {/* <FormControl control="input" type="text" label="Amount" name="amount" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} /> */}


                <div className="  sm:col-span-2">
                      <FormControl control="textarea" type="text" label="Notes" name="notes" formik={formik} autoComplete="off" autoCapitalize="off" spellCheck={false} />
                </div>
                <div className="  sm:col-span-2">
                      <FormControl control="multi-file-base64"  label="Add Files (Optioanl)" name="files" formik={formik} 
                     minWidth={800}
             minHeight={600}
                       />
                </div>


              </div>
            </div>
            <div className="px-3 w-full flex justify-center">
              <div className="flex items-center gap-2">
                <button type="button" className="btn-secondary text-sm xs:text-base w-fit md:w-[148px]" onClick={() => formik.resetForm()}>
                  Clear
                </button>
                <button type="submit" className="btn-primary py-2 xl:px-12 px-6 text-sm xs:text-base w-fit" disabled={createLoading}>
                  {createLoading ? <PulseLoader size={12} color='white' /> : "Add"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>





                          
    



        </div>
  )
}

export default AddProvisionalReceipt;