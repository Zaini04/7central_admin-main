import { useState } from "react";
import { Formik, Form, getIn, } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import InventoriesDetailValidations from "validations/InventoriesDetailValidations";

const PaymentDetailsForm = ({ readOnly }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { doc } = useSelector((state) => state.paymentReceipt);

  const initialValues = {
    project: doc?.inventory?.project?.title || "",
    sector: doc?.inventory?.sector?.title || "",
    plotNumber: doc?.inventory?.plotNumber || "",
    number: doc?.inventory?.number || "",
    fullNumber: doc?.inventory?.fullNumber || "",
    street: doc?.inventory?.street || "",
    approximate: doc?.inventory?.approximateSize || "",
    significance: doc?.inventory?.significance || "",
    actualPrice: doc?.inventory?.actualPrice || "",
    sellingPrice: doc?.sale?.sellingPrice || "",
    customerName: doc?.sale?.buyers?.[0]?.name || "",
    phoneNumber: doc?.sale?.buyers?.[0]?.phoneNumber || "",
    Cnic: doc?.sale?.buyers?.[0]?.cnic || "",
    email: doc?.sale?.buyers?.[0]?.email || "",
    downPayment: doc?.sale?.downPayment || "",
    allocation: doc?.sale?.allocation || "",
    confirmation: doc?.sale?.confirmation || "",
    onPossession: doc?.sale?.onPossession || "",

    // Installment fields
    installmentSeq: doc?.installment?.seq || "",
    installmentType: doc?.installment?.type || "",
    installmentDueDate: doc?.installment?.dueDate || "",
    installmentAmount: doc?.installment?.amount || "",

      totalAmount: doc?.totalAmount || "",
    receiptNo: doc?.receiptNo || "",
    paymentMethod: doc?.parts?.[0]?.method || "",
    paymentAmount: doc?.parts?.[0]?.amount || "",
    paymentDate: doc?.parts?.[0]?.paidAt?.split("T")[0] || "",
    paymentReference: doc?.parts?.[0]?.reference || "",
    paymentStatus: doc?.status || "",
    notes: doc?.notes || "",
    verifyNotes: doc?.verifyNotes || "",

       
      
           
  };
const formatNumber = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const raw = String(value).replace(/,/g, "");
  if (raw === "" || raw === ".") return raw;

  const [intPart, decPart] = raw.split(".");
  const intFormatted = Number(intPart || 0).toLocaleString("en-US");
  return decPart !== undefined ? `${intFormatted}.${decPart}` : intFormatted;
};

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
        initialValues={initialValues}
        enableReinitialize
        validationSchema={InventoriesDetailValidations}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">

            {/* Buyer Details */}
            <div className="flex flex-col gap-5 pt-4 px-3 w-full">
              <p className="  text-gunmetal font-semibold text-[17px] md:text-xl">Buyer Details</p>

              <div className=" mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-10 pb-4">
                <FormControl control="input" type="text" label="Buyer Name" name="customerName" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Phone Number" name="phoneNumber" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Cnic" name="Cnic" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Email" name="email" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Actual Price" name="actualPrice"  value={formatNumber(getIn(formik.values, "actualPrice"))} formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Selling Price" name="sellingPrice" value={formatNumber(getIn(formik.values, "sellingPrice"))} formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Down Payment" name="downPayment" value={formatNumber(getIn(formik.values, "downPayment"))} formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Allocation" name="allocation" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Confirmation" name="confirmation" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="On Possession" name="onPossession" value={formatNumber(getIn(formik.values, "onPossession"))} formik={formik} readOnly={readOnly} />
              </div>
            </div>

            {/* Inventory Details */}
            <div className="flex flex-col gap-5 pt-4 px-3 w-full">
              <p className="  text-gunmetal font-semibold text-[17px] md:text-xl">Inventory Details</p>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-10  pb-4 mt-4">
                <FormControl control="input" type="text" label="Project" name="project" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Sector" name="sector" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Plot Number" name="plotNumber" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Number" name="number" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Full Number" name="fullNumber" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Street" name="street" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Approximate Size" name="approximate" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Significance" name="significance" formik={formik} readOnly={readOnly} />
              </div>
            </div>

            {/* Installment Details */}
            <div className="flex flex-col gap-5 pt-4 px-3 w-full">
              <p className="  text-gunmetal font-semibold text-[17px] md:text-xl">Installment Details</p>

              <div className=" mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-10 ">
                <FormControl control="input" type="text" label="Sequence" name="installmentSeq" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Type" name="installmentType" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="date" label="Due Date" name="installmentDueDate" formik={formik} readOnly={readOnly} />
                <FormControl control="input" type="text" label="Amount" name="installmentAmount" value={formatNumber(getIn(formik.values, "installmentAmount"))} formik={formik} readOnly={readOnly} />
              </div>
            </div>

                 <div className="flex flex-col gap-5 pt-4 px-3 w-full">
              <p className="  text-gunmetal font-semibold text-[17px] md:text-xl">Payment Details</p>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-10 mt-4 pb-4">
                <FormControl control="input" label="Total Amount" name="totalAmount" formik={formik} readOnly={readOnly} />
                <FormControl control="input" label="Receipt No" name="receiptNo" formik={formik} readOnly={readOnly} />
                <FormControl control="input" label="Notes" name="notes" formik={formik} readOnly={readOnly} />                  
 
                <FormControl control="input" label="Payment Status" name="paymentStatus" formik={formik}  readOnly={readOnly} />
                <FormControl control="input" label="Verify Notes" name="verifyNotes" formik={formik} readOnly={readOnly} />

              </div>
                <div className=" sm:col-span-2">
                 <p className="  text-gunmetal font-semibold text-[17px] md:text-xl">Payment </p>

                </div>

              {doc?.parts?.map((part, index) => (
      <div key={index} className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-10 mt-4 pb-4">
     

        <FormControl
          control="input"
          label="Payment Method"
          name={`parts[${index}].method`}
          formik={formik}
          readOnly={readOnly}
          value={part.method}
        />
        <FormControl
          control="input"
          label="Paid Amount"
          name={`parts[${index}].amount`}
          formik={formik}
          readOnly={readOnly}
          // value={part.amount}
          value={formatNumber(part.amount)}
        />
        <FormControl
          control="input"
          type="date"
          label="Paid At"
          name={`parts[${index}].paidAt`}
          formik={formik}
          readOnly={readOnly}
          value={part.paidAt?.split("T")[0]}
        />
        <FormControl
          control="input"
          label="Reference"
          name={`parts[${index}].reference`}
          formik={formik}
          readOnly={readOnly}
          value={part.reference}
        />
      </div>
    ))}
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentDetailsForm;
