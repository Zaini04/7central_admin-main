
import { useState,useEffect } from 'react';
// import ExportButton from 'components/global/exportbutton/ExportButton';
import PaymentFilter  from 'components/paymentReceipt/PaymentFilter';
import PaymentTable   from 'components/paymentReceipt/PaymentTable';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import Axios from "config/api";
import { setStats,setPaymentId } from "redux/slices/paymentReceiptSlice";
import SharePayment   from 'components/paymentReceipt/SharePayment';
import ExportButton from 'components/global/exportbutton/ExportButton';
import moment from 'moment';
import formatLabel from "utils/formatLabel";
import Titlebtn from 'components/global/Titlebtn';
import { useNavigate } from 'react-router-dom';


const PaymentReceipt = () => {
   const { docs } = useSelector((state) => state.paymentReceipt);

   const [verify,setVerify]=useState(false);

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState(''); 
    const [inventory,setInventory]=useState('');
       const [installment,setInstallment]=useState('');



const queryKey = ["fetch-all-PaymentReceipts",currentPage,keyword,limit,status, inventory,installment];

const { isLoading, isError, error } = useQuery(
  queryKey,
  async () => {
    let url = `/payment?pageSize=${limit}&page=${currentPage}`;

    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }
 if (installment) url += `&installment=${installment}`;
  if (inventory) url += `&inventory=${inventory}`;
    if (status) {
      url += `&status=${encodeURIComponent(status.toLocaleLowerCase())}`;
    }

    const res = await Axios.get(url);
    return res;
  },
  {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      const {
        data: {
          data: { docs, pages, docsCount, page },
        },
      } = res;

      dispatch(setStats({ docs, pages, docsCount, page }));
    },
  }
);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(setPaymentId(null));
  }, [dispatch]);

  return (
    <>
    {verify  &&   <SharePayment
      setVerify={setVerify}
    />} 
       <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-wrap xs:flex-wrap  gap-2  xs:items-center xs:justify-between  w-full">
                <div className="flex flex-col gap-1.5">
                    <h2 className="page-heading">Payment/Receipt</h2>
                </div>

                            <div className=' flex flex-wrap gap-3'>


          <Titlebtn 
          isIcon={false}
          label="Merge Pending"
            url="/app/payment/merge-pending"
          />
        <Titlebtn
          isIcon={false}
            label="Merge Approved"
            url="/app/payment/merge"
          />
<ExportButton
  title="Payment Receipt"
  tableData={(docs || []).map((row, index) => ({
    No: index + 1,
    Receipt_No: row?.receiptNo ?? "-",
    Customer_Name: row?.sale?.buyers?.map(b => b?.name).join(", ") || "-",
    Inventory_No: row?.inventory?.fullNumber ?? "-",
    Installment: row?.installment?.type ?? "-",
    Receipt_Amount: row?.totalAmount ?? 0,
    Method: row?.parts?.map(p => formatLabel(p?.method)).join(", ") ?? "-",
    Created_By: row?.createdBy?.username ?? "-",
    Verified_By: row?.verifiedBy?.username ?? "-",
    Paid_Date: row?.paidAt ? moment(row?.paidAt).format("DD-MM-YYYY") : "-",
  }))}
  columns={[
    "No",
    "Receipt_No",
    "Customer_Name",
    "Inventory_No",
    "Installment",
    "Receipt_Amount",
    "Method",
    "Created_By",
    "Verified_By",
    "Paid_Date"
  ]}
  fileName="Payment Receipt"
 bgcolor={'bg-white'} colortext={'white'} textColor={'text-primary'}

/>




               </div>

                          

          
            </div>
               <PaymentFilter
                  keyword={keyword}
              setKeyword={setKeyword} 
              setStatus={setStatus}
              setInventory={setInventory}
              setInstallment={setInstallment}
               />

                  {isLoading ? (
              <Loader />
                    ) : isError ? (
                      <DisplayError message={error?.message || "Failed to load data"} />
                    ) : docs?.length > 0 ? (
                      <PaymentTable  
                              currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               setLimit={setLimit}
               limit={limit}
               setVerify={setVerify}
                />
                    ) : (
                      <ItemNotFound message="No Payment Receipts Found" />
                    )}




        </div>
    </>

  )
}

export default PaymentReceipt;