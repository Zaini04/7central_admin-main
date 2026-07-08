import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "utils/clickOutside";
import { Formik, Form, FieldArray } from "formik";
import FormControl from "components/global/form/FormControl";
import { setCustomerReceiptsDetail } from "redux/slices/customerSlice";

const CustomerReciptDetail = ({ setReciptDetail }) => {
  const mainRef = useRef(null);
  const dispatch = useDispatch();

  const { customerReceiptsDetail } = useSelector(
    (state) => state.customer
  );

  // console.log("Receipt Detail: ", customerReceiptsDetail);


  const initValues = {
    _id: customerReceiptsDetail?._id || "",
    receiptNo: customerReceiptsDetail?.receiptNo || "",
    totalAmount: customerReceiptsDetail?.totalAmount || "",
    paidAt: customerReceiptsDetail?.paidAt?.slice(0, 10) || "",
    status: customerReceiptsDetail?.status || "",
    autoAssign: customerReceiptsDetail?.autoAssign || false,

    // SALE
    saleSellingPrice: customerReceiptsDetail?.sale?.sellingPrice || "",
    saleActualPrice: customerReceiptsDetail?.sale?.actualPrice || "",
    salePaymentType: customerReceiptsDetail?.sale?.paymentType || "",
    saleStatus: customerReceiptsDetail?.sale?.status || "",

    // BUYER
    buyerName: customerReceiptsDetail?.sale?.buyers?.[0]?.name || "",
    buyerFatherName:
      customerReceiptsDetail?.sale?.buyers?.[0]?.fatherName || "",
    buyerEmail: customerReceiptsDetail?.sale?.buyers?.[0]?.email || "",
    buyerPhone:
      customerReceiptsDetail?.sale?.buyers?.[0]?.phoneNumber || "",
    buyerCnic: customerReceiptsDetail?.sale?.buyers?.[0]?.cnic || "",

    parts: Array.isArray(customerReceiptsDetail?.parts) && customerReceiptsDetail.parts.length > 0
    ? customerReceiptsDetail.parts.map((p) => ({
        method: p?.method || "",
        amount: p?.amount?.toString() || "",
        paidAt: p?.paidAt ? p.paidAt.split('T')[0] : "",
        reference: p?.reference?.toString() || "", 
      }))
    : [],
  };

  useClickOutside(mainRef, () => {
    setReciptDetail(false);
    dispatch(setCustomerReceiptsDetail(null));
  });

  return (
    <div className="fixed top-0 left-0 w-full bg-black/25 flex pt-7 items-center justify-center px-3 h-screen z-[9999]">
      <div
        ref={mainRef}
        className="bg-white w-[95%] sm:w-[70%] rounded-lg py-3 relative overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center w-full py-3 border-b px-5">
          <h2 className="text-lg font-semibold">Receipt Details</h2>

          <button
            onClick={() => {
              setReciptDetail(false);
              dispatch(setCustomerReceiptsDetail(null));
            }}
            className="text-gray-500 h-[30px] w-[30px] rounded-md 
                     hover:text-black hover:bg-primary/20 flex 
                     items-center justify-center"
          >
            <RxCross1 size={16} />
          </button>
        </div>

        {/* FORM */}
        <div className="p-4">
        <div className="p-4">
  <Formik initialValues={initValues} enableReinitialize={true}>
    {(formik) => {
      console.log("Formik Initial Values:", formik.initialValues);
      console.log("Formik Current Values:", formik.values);

      return (
        <Form className="flex flex-col gap-6">

          {/* Receipt Info */}
          <h3 className="font-semibold text-lg">Receipt Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormControl control="input" label="Receipt No" name="receiptNo" disabled formik={formik} />
            <FormControl control="input" label="Total Amount" name="totalAmount" disabled formik={formik} />
            <FormControl control="input" type="date" label="Paid At" name="paidAt" disabled formik={formik} />
            <FormControl control="input" label="Status" name="status" disabled formik={formik} />
          </div>

          {/* Sale Info */}
          <h3 className="font-semibold text-[17px]">Sale Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormControl control="input" label="Selling Price" name="saleSellingPrice" disabled formik={formik} />
            <FormControl control="input" label="Actual Price" name="saleActualPrice" disabled formik={formik} />
            <FormControl control="input" label="Payment Type" name="salePaymentType" disabled formik={formik} />
            <FormControl control="input" label="Sale Status" name="saleStatus" disabled formik={formik} />
          </div>

        

        </Form>
      );
    }}
  </Formik>
</div>

        </div>
      </div>
    </div>
  );
};

export default CustomerReciptDetail;
