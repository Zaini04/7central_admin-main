import { useState,useEffect } from 'react';
import InventoryInstallmentTable from 'components/inventoryDetails/InventoryInstallmentTable';
import AllReceiptInstallmentTable from 'components/inventoryDetails/AllReceiptInstallmentTable';
import AllOwnershipTransferTable from 'components/inventoryDetails/AllOwnershipTransferTable';
import InventoryDetailsForm from 'components/inventoryDetails/InventoryDetailsForm';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setStats  as setInstallmentStats } from "redux/slices/installmentSlice";
import { setStats as setTransferStats } from "redux/slices/transferSlice";
import { setStats as setPaymentStats } from "redux/slices/paymentReceiptSlice";
import {setDocDetails, setInventoryStats,setDocInventoryDocument}  from 'redux/slices/inventorySlice';

import { useQuery,useQueryClient } from 'react-query';
import Axios from "config/api";

import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import { setStats } from 'redux/slices/provisionalReceiptSlice';

import AllPRInstallmentTable from 'components/inventoryDetails/AllPRInstallmentTable';
import ProvisnalReceiptDetail from 'components/provisnalReceipt/ProvisnalReceiptDetail';
import BounceProvisnal from 'components/provisnalReceipt/BounceProvisnal';
import InventoryCard from 'components/inventoryDetails/InventoryCard';
import InventoryUplaodDocumnet   from 'components/inventoryDetails/InventoryUplaodDocumnet';
import ViewDeatilPop   from 'components/inventoryDetails/viewDeatilPop';

const InventoryDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { docs: paymentDocs } = useSelector((state) => state.paymentReceipt);
  const { docs: pRDocs } = useSelector((state) => state.provisionalReceipt);
  const { docs: transferDocs } = useSelector((state) => state.transfer);
  const { docs: installmentDocs } = useSelector((state) => state.installment);
  const {docDetails,docInventoryDocument } = useSelector((state) => state.inventory);

  // console.log(' this is a docInventoryDocument',docInventoryDocument)

const [readOnly,setReadOnly]=useState(true);
  const [currentPaymentPage, setCurrentPaymentPage] = useState(1);
  const [limitPayment, setLimitPayment] = useState(10);

  const [currentPRPage, setCurrentPRPage] = useState(1);
  const [limitPR, setLimitPR] = useState(10);

  const [currentInstallmentPage, setCurrentInstallmentPage] = useState(1);
  const [limitInstallment, setLimitInstallment] = useState(10);

  const [addBounce,setAddBounce]=useState(false);
   const [provisionalDetail,setProvisionalDetail]=useState(false);

    const [currentTransferPage, setCurrentTransferPage] = useState(1);
  const [limitTransfer, setLimitTransfer] = useState(10);


   const [currentInventoryPage, setCurrenInventoryPage] = useState(1);
  const [limitInventory, setLimitInventory] = useState(10);
  const  [viewPopup,setViewPopup]=useState(false);




  const paymentQueryKey = [
    "fetch-all-PaymentReceipts",
    currentPaymentPage,
    limitPayment,
    id
  ];

  const {
    isLoading: paymentLoading,
    isError: isPaymentError,
    error: paymentError
  } = useQuery(
    paymentQueryKey,
    async () => {
      const url = `/payment?pageSize=${limitPayment}&page=${currentPaymentPage}&inventory=${id}`;
      return await Axios.get(url);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const {
          data: {
            data: { docs, pages, docsCount, page },
          },
        } = res;

        dispatch(setPaymentStats({ docs, pages, docsCount, page }));
      },
    }
  );
   const pRQueryKey = [
    "fetch-all-provisional-receipt-inventory",
    currentPRPage,
    limitPayment,
    id
  ];

  const {
    isLoading: pRLoading,
    isError: isPRError,
    error: pRError
  } = useQuery(
    pRQueryKey,
    async () => {
      const url = `/provisional-receipt?pageSize=${limitPayment}&page=${currentPaymentPage}&inventory=${id}`;
      return await Axios.get(url);
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

 
  const transferQueryKey = [
    "fetch-all-transfer",
    currentTransferPage,
    limitTransfer,
    id
  ];

  const {
    isLoading: transferLoading,
    isError: isTransferError,
    error: transferError
  } = useQuery(
    transferQueryKey,
    async () => {
      const url = `/sale/get-inventory-all-ownership-history?pageSize=${limitTransfer}&page=${currentTransferPage}&inventory=${id}`;
      return await Axios.get(url);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const {
          data: {
            data: { docs, pages, docsCount, page },
          },
        } = res;

        dispatch(setTransferStats({ docs, pages, docsCount, page }));
      },
    }
  );



 const queryKey = ["fetch-all-installments", currentInstallmentPage, limitInstallment];

const { 
  isLoading: installmentsLoading, 
  isError: installmentsError, 
  error 
} = useQuery(
  queryKey,
  () => {
    const url = `/sale/get-all-installments?pageSize=${limitInstallment}&page=${currentInstallmentPage}&inventory=${id}`;
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

      dispatch(setInstallmentStats({ docs, pages, docsCount, page }));
    },
  }
);

const inventoryStatsQueryKey = ["fetch-inventory-stats", ];

const {
  isLoading: inventoryStatsLoading,
  isError: inventoryStatsError,
} = useQuery(
  inventoryStatsQueryKey,
  async () => {

    let url = `/inventory/payment-stats?inventory=${id}`;
  

    return Axios.get(url);
  },
  {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      const doc = res?.data?.data;
      dispatch(setInventoryStats(doc));
    },
  }
);








  const { data, isLoadingInventory, isErrorInventory } = useQuery(
    ["single-inventory", id],
    () => Axios(`/inventory/${id}`)
  );

  useEffect(() => {
    const d = data?.data?.data?.doc;
    if (!d) return;
    dispatch(setDocDetails(d));
  }, [data, dispatch]);



const { data:InventoryDocumnetdata, isLoading:InventoryDocumnetLoading, isError:InventoryDocumnetErrror, } = useQuery(
    ["InventoryDocumnet", id,currentInventoryPage, limitInventory],
    () => Axios(`/document?inventory=${id}&pageSize=${limitInventory}&page=${currentInventoryPage}`)
  );
  const totalPages = InventoryDocumnetdata?.data?.data?.pages || 0;
const totalDocs = InventoryDocumnetdata?.data?.data?.docsCount || 0;



  useEffect(() => {
    if (!InventoryDocumnetdata?.data?.data?.docs) return;
    dispatch(setDocInventoryDocument(InventoryDocumnetdata.data.data.docs));
  }, [InventoryDocumnetdata, dispatch]);

  return (
    <>

      {viewPopup   &&  <ViewDeatilPop   setViewPopup={setViewPopup}/>}
          {provisionalDetail  &&    <ProvisnalReceiptDetail     setProvisionalDetail={setProvisionalDetail}/>} 
   {addBounce  &&<BounceProvisnal  setAddBounce={setAddBounce}/>}
    
    <div className="flex flex-col gap-5 w-full">

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row gap-2 xl:items-center xl:justify-between w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">Inventory: {docDetails?.fullNumber}</h2>
        </div>


        <div className="flex flex-wrap items-center gap-2">
          <button 
        onClick={() => navigate(`/app/inventory/${id}/update-purchase-plan`)}
        type="button"
        className="btn-primary py-2 px-4 w-fit"
      >
        Edit Purchase Plan
      </button>
        </div>
      </div>

      <div className="w-full bg-white flex flex-col gap-2 pb-4 rounded-xl shadow-sm">
{isLoadingInventory ? (
  <Loader />

) : isErrorInventory ? (
  <DisplayError message={error?.message || "Failed to load data"} />

) : !docDetails ? (
  <ItemNotFound message="No Detail is available / Found" />

) : (
  <InventoryCard  />
)}
{isLoadingInventory ? (
  <Loader />

) : isErrorInventory ? (
  <DisplayError message={error?.message || "Failed to load data"} />

) : !docDetails ? (
  <ItemNotFound message="No Detail is available / Found" />

) : (
  <InventoryDetailsForm readOnly={readOnly} />
)}




    {installmentsLoading ? (
          <Loader />
        ) : installmentsError ? (
          <DisplayError message={paymentError?.message || "Failed to load data"} />
        ) : installmentDocs?.length > 0 ? (
    
        <InventoryInstallmentTable 
      currentInstallmentPage={currentInstallmentPage} 
      setCurrentInstallmentPage={setCurrentInstallmentPage}
       limitInstallment={limitInstallment} 
       setLimitInstallment={setLimitInstallment}

        />
        ):(
<ItemNotFound message="No  Installment Found" />
        )}



        {paymentLoading ? (
          <Loader />
        ) : isPaymentError ? (
          <DisplayError message={paymentError?.message || "Failed to load data"} />
        ) : paymentDocs?.length > 0 ? (
          <AllReceiptInstallmentTable
            currentPaymentPage={currentPaymentPage}
            setCurrentPaymentPage={setCurrentPaymentPage}
            limitPayment={limitPayment}
            setLimitPayment={setLimitPayment}
          />
        ) : (
          <ItemNotFound message="No Receipts Found" />
        )}




  {InventoryDocumnetLoading ? (
          <Loader />
        ) : InventoryDocumnetErrror ? (
          <DisplayError message={paymentError?.message || "Failed to load data"} />
        ) :
         docInventoryDocument?.length > 0 ? (
            <InventoryUplaodDocumnet
                 setViewPopup={setViewPopup}
                 totalPages = {totalPages}
             totalDocs = {totalDocs}
             currentInventoryPage={currentInventoryPage}
            setCurrenInventoryPage={setCurrenInventoryPage}
            limitInventory={limitInventory}
            setLimitInventory={setLimitInventory}
           />
        ) : (
          <div>
<div className="flex flex-col sm:flex-row sm:justify-between w-full px-3 pt-3">
        <p className="form-title">All Inventory Documents</p>
         <button
              
              onClick={() => navigate(`/app/inventory/${docDetails._id}/newDocument`)}
              className=" py-3 cursor-pointer px-2 bg-primary text-white rounded-lg hover:bg-primary/70 transition"
            >
               Add New Document
            </button>
      </div>
<ItemNotFound message="No Inventory Document Found" />
          </div>
          
        )}



       

   {pRLoading ? (
        <Loader />
      ) : isPRError ? (
        <DisplayError message={error?.message || "Failed to load data"} />
      ) : pRDocs?.length > 0 ? (
        <AllPRInstallmentTable  
          setProvisionalDetail={setProvisionalDetail}
        setAddBounce={setAddBounce}
                  currentPage={currentPRPage}
               setCurrentPage={setCurrentPRPage}
               setLimit={setLimitPR}
               limit={limitPR} />
      ) : (
        <ItemNotFound message="No Provisional Receipts Found" />
      )}
        {transferLoading ? (
          <Loader />
        ) : isTransferError ? (
          <DisplayError message={transferError?.message || "Failed to load ownership history"} />
        ) : transferDocs?.length > 0 ? (
          <AllOwnershipTransferTable
            currentTransferPage={currentTransferPage}
            setCurrentTransferPage={setCurrentTransferPage}
            limitTransfer={limitTransfer}
            setLimitTransfer={setLimitTransfer}
          />
        ) : (
          <ItemNotFound message="No Ownership Records Found" />
        )}

      </div>

    </div>
    </>
    
  );
};

export default InventoryDetails;
