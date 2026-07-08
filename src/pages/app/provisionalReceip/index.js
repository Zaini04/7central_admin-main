import { useState,useEffect } from 'react';
import ExportButton from 'components/global/exportbutton/ExportButton';
import PaymentFilter from 'components/provisnalReceipt/PaymentFilter';
import PaymentTable from 'components/provisnalReceipt/PaymentTable';
import Titlebtn from 'components/global/Titlebtn';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import Axios from "config/api";
import { setStats } from "redux/slices/provisionalReceiptSlice.js";
import BounceProvisnal  from 'components/provisnalReceipt/BounceProvisnal';
import { setProvisionalId, setProvisionalData } from "redux/slices/provisionalReceiptSlice";
import ProvisnalReceiptDetail   from 'components/provisnalReceipt/ProvisnalReceiptDetail';
import moment from 'moment';
import formatLabel from "utils/formatLabel";


const PaymentReceipt = () => {
  const dispatch = useDispatch();
  const { docs, } = useSelector((state) => state.provisionalReceipt);
const [keyword, setKeyword] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);
 const [customer,setCustomer]=useState('');
  const [inventory,setInventory]=useState('');
  const [addBounce,setAddBounce]=useState(false);
   const [provisionalDetail,setProvisionalDetail]=useState(false);



  const [status, setStatus] = useState(''); 


  const statusMap = {
  "Pending Clearance": "pending_clearance",
  "Cleared": "cleared",
  "Bounced": "bounced",
  "Cancelled": "cancelled",
};

  
  const queryKey = ["fetch-all-ProvisionalReceipt", currentPage, keyword, limit,customer,status,inventory];

  const { isLoading, isError, error } = useQuery(
    queryKey,
    () => {
      let url = `/provisional-receipt?pageSize=${limit}&page=${currentPage}`;
      if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
           if (customer) url += `&customer=${customer}`;
               if (inventory) url += `&inventory=${inventory}`;
             if (status) {
      const apiStatus = statusMap[status]; 
      if (apiStatus) {
        url += `&status=${encodeURIComponent(apiStatus)}`;
      }
    }
      return Axios.get(url);
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


  useEffect(() => {
    dispatch(setProvisionalId(null));
    dispatch(setProvisionalData(null));
  }, [dispatch]);

  return (

    <>


      {provisionalDetail  &&    <ProvisnalReceiptDetail     setProvisionalDetail={setProvisionalDetail}/>} 
   {addBounce  &&<BounceProvisnal  setAddBounce={setAddBounce}/>}
    <div className="flex flex-col gap-5 w-full">

      <div className="flex flex-col xs:flex-row gap-2 xs:items-center xs:justify-between w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">Provisional Receipt</h2>
        </div>

        <div className="flex items-center gap-2">

<ExportButton
  title="Provisional Receipt"
  tableData={(docs || []).map((item, index) => ({
    No: index + 1,
    "Inventory ID": item?.inventory?.fullNumber ?? "",
    "Bank Name": item?.bankName ?? "",
    "Cheque No": item?.chequeNo ?? "",
    Amount: item?.amount ?? 0, // Ensure 0 is shown
    "Cheque Date": item?.chequeDate
      ? moment(item?.chequeDate).format("DD-MM-YYYY")
      : "-",
    Status: formatLabel(item?.status) ?? "",
  }))}
  columns={[
    "No",
    "Inventory ID",
    "Bank Name",
    "Cheque No",
    "Amount",
    "Cheque Date",
    "Status",
  ]}
  fileName="Provisional Receipt"
  bgcolor="bg-white"
  colortext="#2D3748"
  textColor="text-primary"
/>



          <Titlebtn
            label="Add Provisional Receipt"
            url="/app/provisional-receipt/add"
          />
        </div>
      </div>

      <PaymentFilter
      customer={customer}
      setCustomer={setCustomer}
       keyword={keyword}
              setKeyword={setKeyword} 
setStatus={setStatus}
setInventory={setInventory}

              />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <DisplayError message={error?.message || "Failed to load data"} />
      ) : docs?.length > 0 ? (
        <PaymentTable  
          setProvisionalDetail={setProvisionalDetail}
        setAddBounce={setAddBounce}
                  currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               setLimit={setLimit}
               limit={limit} />
      ) : (
        <ItemNotFound message="No Provisional Receipts Found" />
      )}

    </div>

    </>
   
  );
};

export default PaymentReceipt;
