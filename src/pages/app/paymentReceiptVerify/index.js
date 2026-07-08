
import { useState, useEffect } from "react";
import Titlebtn from "components/global/Titlebtn";
import { useNavigate } from "react-router-dom";
import PaymentDetailsForm from "components/paymentReceiptdetails/PaymentDetailsForm";
import { setDoc } from "redux/slices/paymentReceiptSlice";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import Axios from "config/api";
import { useParams } from "react-router-dom";
import AddPaymentReceipt from "components/paymentReceipt/AddPaymentReceipt";


const PaymentReceiptVerify = () => {
  const navigate = useNavigate();
  const [readOnly, setReadOnly] = useState(true);
  const { doc } = useSelector((state) => state.paymentReceipt);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery(
    ["single-Payment", id],
    () => Axios(`/payment/${id}`)
  );

  useEffect(() => {
    const d = data?.data?.data?.doc;
    if (!d) return;
    dispatch(setDoc(d));
  }, [data, dispatch]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col xs:flex-row gap-2 xs:items-center xs:justify-between w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">Payment Receipt Details</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/app/payment")}
            className="w-fit px-4 h-[50px] flex items-center justify-center gap-2 bg-primary text-white rounded-[10px] hover:bg-primary/90 transition-all duration-200"
          >
            <i className="uil uil-arrow-left text-lg"></i>
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="w-full bg-white flex flex-col gap-2 pb-4 rounded-xl shadow-sm">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <DisplayError message={error?.message || "Failed to load data"} />
        ) : doc ? (
          <PaymentDetailsForm readOnly={readOnly} />
        ) : (
          <ItemNotFound message="No Payment Receipts Details Found" />
        )}
      </div>
      <AddPaymentReceipt/>
    </div>
  );
};

export default PaymentReceiptVerify;
