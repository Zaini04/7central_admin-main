
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SiderbarCustomer from "./SiderbarCustomer";
import { useParams } from "react-router-dom";
import Axios from "config/api";
import { setDocDetails, setDocSteps,setDocCustomerDocumnet,setCustomerInstallments,setCustomerReceipts,setCustomerInventories,setDoc } from "redux/slices/customerSlice";
import { useQuery } from "react-query";
import CustomerInstallmentTable  from 'components/customerdetail/customerInstallmentTable';
import CustomerReceiptInstallmentTable   from 'components/customerdetail/CustomerReceiptInstallmentTable'
import CustomerUplaodDocumnet   from 'components/customerdetail/CustomerUplaodDocumnet';
import CustomerAssignInvestor   from 'components/customerdetail/CustomerAssignInvestor';
import CustomerInsatllmentFilter   from 'components/customerdetail/CustomerInsatllmentFilter'
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import ViewDeatilPop  from 'components/editcustomer/documnet/viewDeatilPop';
import CustomerInstallmentDetail   from 'components/customerdetail/customerpopup/CustomerInstallmentDetail';
import CustomerReciptDetail   from 'components/customerdetail/customerpopup/CustomerReciptDetail';
import  {setDocInventoryDocument}   from 'redux/slices/inventorySlice';
import InventoryUploadedTable    from 'components/customerdetail/InventoryUploadedTable';
import ViewDetail   from 'components/addcustomer/inventorydocumnet/viewDeatilPop';


const AddCustomerLayout = ({ children,dynamicName, dynmicbutton }) => {
      const { id } = useParams();
          const dispatch = useDispatch();



const [currentDocumentPage, setCurrentDocumentPage] = useState(1);
const [limitDocument, setLimitDocument] = useState(10);






const [currentInventoryDocumentPage, setCurrentInventoryDocumentPage] = useState(1);
const [limitInventoryDocument, setLimitInventoryDocument] = useState(10);


// 
const [currentInstallmentPage, setCurrentInstallmentPage] = useState(1);
const [limitInstallment, setLimitInstallment] = useState(10);



const [currentReceiptsPage, setCurrentReceiptsPage] = useState(1);
const [limitReceipts, setLimitReceipts] = useState(10);



const [currentInventoriesPage, setCurrentInventoriesPage] = useState(1);
const [limitInventories, setLimitInventories] = useState(10);

 const [viewDetail,setVeiwDetail]=useState(false);
//  
 const [viewDocumnetDetail,setViewDocumnetDetail]=useState(false);

 
  const [installmentsDetail,setInstallmentsDetail]=useState(false);
  const [reciptDetail,setReciptDetail]=useState(false);

const { docDetails : doc , updateLoading,docCustomerDocumnet,customerInstallments,customerReceipts,customerInventories ,doc:singleCustomer} = useSelector(state => state.customer);
    const {docInventoryDocument} = useSelector((state) => state.inventory);
  // console.log('docInventoryDocument  this is a',docInventoryDocument)

 const inventoryId = singleCustomer?.sales?.[0]?.inventory?._id;    

//  console.log(' this is a inventoryId',inventoryId)


// console.log(' this is doc',doc);
   const { isLoading: contentLoading, isError: isContentError, error: contentError , isFetching : contentFetching } = useQuery({
        queryKey: ['fetch-content-details', id],
        queryFn: () => Axios.post(`/customer/progress/${id}`),
        enabled: !!id,
        onSuccess: (data) => {
            const { data: { data: { doc } } } = data;
            dispatch(setDocDetails(doc.customer))
            dispatch(setDocSteps(doc.steps))
        },
        cacheTime: 0,
        refetchOnWindowFocus:false
    });




//  single customer 
const { data:singleData } = useQuery(["single-customer", id], async () => {
  const res = await Axios(`/customer/${id}`);
  return res.data; 
});

useEffect(() => {
  if (!singleData?.data?.doc) return;
  const d = singleData.data.doc;
  // console.log("d", d);

  dispatch(setDoc(d));
}, [singleData, dispatch]);





// document inventoryis

const { 
  data: InventoryDocumnetData, 
  isLoading: InventoryDocumnetLoading, 
  isError: InventoryDocumnetError, 

} = useQuery(
  ["InventoryDocumnet", inventoryId, currentInventoryDocumentPage, limitInventoryDocument],
  () => Axios.get(`/document?inventory=${inventoryId}&pageSize=${limitInventoryDocument}&page=${currentInventoryDocumentPage}`),
  {
    enabled: !!inventoryId 
  }
);

const totalInventoryPages = InventoryDocumnetData?.data?.data?.pages || 0;
const totalInventoryDocs = InventoryDocumnetData?.data?.data?.docsCount || 0;

useEffect(() => {
  if (!InventoryDocumnetData?.data?.data?.docs) return;
  dispatch(setDocInventoryDocument(InventoryDocumnetData.data.data.docs));
}, [InventoryDocumnetData, dispatch]);




// cutomer  documnet
const { 
  data, 
  isLoading: documentLoading, 
  isError: documentError, 
  error 
} = useQuery(
  ["customerDocument", id, limitDocument, currentDocumentPage, ],
  () => {
    let url = `/document?customer=${id}&pageSize=${limitDocument}&page=${currentDocumentPage}`;


    return Axios(url);
  }
);

const totalCustomerPages = data?.data?.data?.pages || 0;
const totalCustomerDocs = data?.data?.data?.docsCount || 0;





useEffect(() => {
  const docs = data?.data?.data?.docs;
  if (!docs) return;
  dispatch(setDocCustomerDocumnet(docs));
}, [data, dispatch]);



















//  customer installement 
const { 
  data: installmentsdata, 
  isLoading: installmentsLoading, 
  isError: installmentsError,
} = useQuery(
  ["customerInstallments", id, limitInstallment, currentInstallmentPage],
  () => {
    let url = `/customer/${id}/installments?pageSize=${limitInstallment}&page=${currentInstallmentPage}`;
    return Axios(url);
  }
);

const totalInstallmentsPages = installmentsdata?.data?.data?.pages || 0;
const totalInstallmentsDocs = installmentsdata?.data?.data?.docsCount || 0;

useEffect(() => {
  const docs = installmentsdata?.data?.data?.docs;
  if (!docs) return;
  dispatch(setCustomerInstallments(docs));
}, [installmentsdata, dispatch]);



//customer recipt 


const { 
  data: receiptdata, 
  isLoading:  receiptLoading, 
  isError:  receiptError,
} = useQuery(
  ["customer-receipt", id, limitReceipts, currentReceiptsPage],
  () => {
    let url = `/customer/${id}/payments?pageSize=${limitReceipts}&page=${currentReceiptsPage}`;
    return Axios(url);
  }
);

const totalReceiptPages = receiptdata?.data?.data?.pages || 0;
const totalReceiptDocs = receiptdata?.data?.data?.docsCount || 0;

useEffect(() => {
  const docs = receiptdata?.data?.data?.docs;
  if (!docs) return;
  dispatch(setCustomerReceipts(docs));
}, [receiptdata, dispatch]);



// customer   inventories



const { 
  data: inventoriesdata, 
  isLoading:  inventoriesLoading, 
  isError:  inventoriesError,
} = useQuery(
  ["customer-inventories", id, limitInventories, currentInventoriesPage],
  () => {
    let url = `/customer/${id}/inventories?pageSize=${limitInventories}&page=${currentInventoriesPage}`;
    return Axios(url);
  }
);

const totalInventoriesPages = inventoriesdata?.data?.data?.pages || 0;
const totalInventoriesDocs = inventoriesdata?.data?.data?.docsCount || 0;

useEffect(() => {
  const docs = inventoriesdata?.data?.data?.docs;
  if (!docs) return;
  dispatch(setCustomerInventories(docs));
}, [inventoriesdata, dispatch]);





  return (


    <>
 
        <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between w-full">
      <div className="text-gunmetal  font-semibold  text-xl md:text-[24px] capitalize">
          {doc?.name??dynamicName}
      </div>
      
          {dynmicbutton}
   
      </div>

      <div className="w-full  flex flex-col gap-1 rounded-lg">
        <SiderbarCustomer />
        <div className="w-full bg-white rounded-xl  h-fit ">
          {children}
        </div>
      </div>


     {viewDocumnetDetail   &&   <ViewDetail    setVeiwDetail={setViewDocumnetDetail}/>}  

   {viewDetail && <ViewDeatilPop    setVeiwDetail={setVeiwDetail}/>}

     {viewDetail && <ViewDeatilPop    setVeiwDetail={setVeiwDetail}/>}
   {installmentsDetail    && <CustomerInstallmentDetail    setInstallmentsDetail={setInstallmentsDetail}/>}
  {reciptDetail &&   <CustomerReciptDetail   setReciptDetail={setReciptDetail}/> }
 

        <div className="w-full  flex flex-col gap-5 pb-4 rounded-xl">


                         {installmentsLoading ? (
          <Loader />
        ) : installmentsError ? (
          <DisplayError message={error?.message || "Failed to load data"} />
        ) : customerInstallments.length > 0 ? (
                 <CustomerInstallmentTable

                     currentInstallmentPage={currentInstallmentPage}
         setCurrentInstallmentPage={setCurrentInstallmentPage}
totalInstallmentsDocs={totalInstallmentsDocs}
totalInstallmentsPages={totalInstallmentsPages}
limitInstallment={limitInstallment}
          setLimitInstallment={setLimitInstallment}
          setInstallmentsDetail={setInstallmentsDetail}

                 />
        ):(
          <ItemNotFound message="No Customer Installment  found" />
        )}




                       {InventoryDocumnetLoading ? (
          <Loader />
        ) : InventoryDocumnetError ? (
          <DisplayError message={error?.message || "Failed to load data"} />
        ) : docInventoryDocument.length > 0 ? (
                   <InventoryUploadedTable
                   setVeiwDetail={setViewDocumnetDetail}
                   docs={docInventoryDocument}
               totalInventoryPages = {totalInventoryPages}
            totalInventoryDocs = {totalInventoryDocs}
            currentInventoryDocumentPage={currentInventoryDocumentPage}
            setCurrentInventoryDocumentPage={currentInventoryDocumentPage}
      limitInventoryDocument={limitInventoryDocument} 
   setLimitInventoryDocument={setLimitInventoryDocument}

                   />
        ):(
          <ItemNotFound message="No  Inventory Documents  found" />
        )} 


   


               {receiptLoading ? (
          <Loader />
        ) : receiptError ? (
          <DisplayError message={error?.message || "Failed to load data"} />
        ) : customerReceipts.length > 0 ? (
                 <CustomerReceiptInstallmentTable
    currentReceiptsPage={currentReceiptsPage}
         setCurrentReceiptsPage={setCurrentReceiptsPage} 
totalReceiptDocs={totalReceiptDocs}
totalReceiptPages={totalReceiptPages}
limitReceipts={limitReceipts}
          setLimitReceipts={setLimitReceipts}
          setReciptDetail={setReciptDetail}


                 />
        ): (
          <ItemNotFound message="No  Customer Receipts found" />
        )}

                        {documentLoading ? (
          <Loader />
        ) : documentError ? (
          <DisplayError message={error?.message || "Failed to load data"} />
        ) : docCustomerDocumnet.length > 0 ? (
          <CustomerUplaodDocumnet 
          docs={docCustomerDocumnet} 
          currentDocumentPage={currentDocumentPage}
         setCurrentDocumentPage={setCurrentDocumentPage}
totalCustomerDocs={totalCustomerDocs}
totalCustomerPages={totalCustomerPages}
limitDocument={limitDocument}
          setLimitDocument={setLimitDocument}
          setVeiwDetail={setVeiwDetail}
           

          />
        ) : (
          <ItemNotFound message="No documents found" />
        )}


        
                        {inventoriesLoading ? (
          <Loader />
        ) : inventoriesError ? (
          <DisplayError message={error?.message || "Failed to load data"} />
        ) : customerInventories.length > 0 ? (
                 <CustomerAssignInvestor

              currentInventoriesPage={currentInventoriesPage}
              setCurrentInventoriesPage={setCurrentInventoriesPage}
              limitInventories={limitInventories} 
              setLimitInventories={setLimitInventories}
              totalInventoriesPages={totalInventoriesPages}
              totalInventoriesDocs={totalInventoriesDocs}
                 />
        ):(
          <ItemNotFound message="No Customer's Investor documents found" />
        )}
                
              </div>
    </div>
    </>
  
  );
};

export default AddCustomerLayout;
