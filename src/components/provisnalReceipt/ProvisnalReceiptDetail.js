import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "utils/clickOutside";
import { Formik, Form, getIn } from "formik";
import FormControl from "components/global/form/FormControl";
import { setProvisionalData } from "redux/slices/provisionalReceiptSlice";


const ProvisnalReceiptDetail = ({ setProvisionalDetail }) => {
  const mainRef = useRef(null);
  const dispatch = useDispatch();
  const { provisionalData } = useSelector((state) => state.provisionalReceipt);


  console.log(' this is  a   provisionalData',provisionalData)



  
  useClickOutside(mainRef, () => {
    setProvisionalDetail(false);
    dispatch(setProvisionalData(null));
  });



  const initValues = {
  buyerName: provisionalData?.buyers?.[0]?.name || "",
  buyerCnic: provisionalData?.buyers?.[0]?.cnic || "",
  buyerPhone: provisionalData?.buyers?.[0]?.phoneNumber || "",
  inventoryNumber: provisionalData?.inventory?.fullNumber || "",
  plotNumber: provisionalData?.inventory?.plotNumber || "",
  sellingPrice: provisionalData?.sale?.sellingPrice || "",
  actualPrice: provisionalData?.sale?.actualPrice || "",
  chequeNo: provisionalData?.chequeNo || "",
  chequeDate: provisionalData?.chequeDate?.slice(0, 10) || "",
  bankName: provisionalData?.bankName || "",
  amount: provisionalData?.amount || "",
  notes: provisionalData?.notes || "",
  status: provisionalData?.status || "",
};

const formatNumber = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const raw = String(value).replace(/,/g, "");
  if (raw === "" || raw === ".") return raw;

  const [intPart, decPart] = raw.split(".");
  const intFormatted = Number(intPart || 0).toLocaleString("en-US");
  return decPart !== undefined ? `${intFormatted}.${decPart}` : intFormatted;
};
  return (
    <div className="fixed top-0 left-0 w-full bg-black/25 flex pt-7 items-center justify-center px-3 h-screen z-[9999]">
      <div
        ref={mainRef}
        className="bg-white w-[90%] md:w-[60%] rounded-lg py-3 relative overflow-y-auto max-h-[90vh] flex flex-col gap-2 popup"
      >
        {/* Header */}
        <div className="flex  justify-between items-center w-full py-1  px-5">
          <h2 className="text-md md:text-lg xl:text-xl font-semibold">
           Provisional Receipt  Detail
          </h2>

          <button
            onClick={() => {
              setProvisionalDetail(false);
              dispatch(setProvisionalData(null));
            }}
            className="text-gray-500 h-[30px] w-[30px] rounded-md hover:text-black hover:bg-primary/20 flex items-center justify-center cursor-pointer"
          >
            <RxCross1 size={16} />
          </button>
        </div>
                                  <hr className="w-[98%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>


        {/* Form */}
        <div className="w-full flex flex-col gap-3 px-5 mt-8 pb-3">
          <Formik
          initialValues={initValues}
          >
            {(formik) => (
              <Form className="flex flex-col gap-6">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10">

  <FormControl
    control="input"
    type="text"
    label="Customer Name"
    name="buyerName"
    formik={formik}
    readOnly
  />

  <FormControl
    control="input"
    type="text"
    label="Customer CNIC"
    name="buyerCnic"
    formik={formik}
    readOnly
  />

  <FormControl
    control="input"
    type="text"
    label="Phone Number"
    name="buyerPhone"
    formik={formik}
    readOnly
  />

  <FormControl
    control="input"
    type="text"
    label="Inventory No"
    name="inventoryNumber"
    formik={formik}
    readOnly
  />

  <FormControl
    control="input"
    type="text"
    label="Plot Number"
    name="plotNumber"
    formik={formik}
    readOnly
  />

  <FormControl
    control="input"
    type="text"
    label="Selling Price"
    name="sellingPrice"
    formik={formik}
    value={formatNumber(getIn(formik.values, "sellingPrice"))}

    readOnly
  />

  <FormControl
    control="input"
    type="text"
    label="Actual Price"
    name="actualPrice"
    formik={formik}
    value={formatNumber(getIn(formik.values, "actualPrice"))}

    readOnly
  />

  <FormControl
    control="input"
    type="text"
    label="Cheque No"
    name="chequeNo"
    formik={formik}
    readOnly
  />

  <FormControl
    control="input"
    type="date"
    label="Cheque Date"
    name="chequeDate"
    formik={formik}
    readOnly
  />

  <FormControl
    control="input"
    type="text"
    label="Bank Name"
    name="bankName"
    formik={formik}
    readOnly
  />

  <FormControl
    control="input"
    type="text"
    label="Amount"
    name="amount"
    formik={formik}
    value={formatNumber(getIn(formik.values, "amount"))}
    readOnly
  />

  <FormControl
    control="input"
    type="text"
    label="Status"
    name="status"
    formik={formik}
    readOnly
  />
</div>

            

              </Form>
            )}
          </Formik>


          
                <div className="px-3 w-full flex justify-end">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setProvisionalDetail(false);
                        dispatch(setProvisionalData(null));
                      }}
                      type="button"
                      className="btn-secondary text-sm xs:text-base w-fit md:w-[148px]"
                    >
                      Cancel
                    </button>
    
                  </div>
                </div>
        </div>
      </div>
    </div>
  );
};

export default ProvisnalReceiptDetail;
