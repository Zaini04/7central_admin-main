import { useRef,useEffect } from "react";

import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

import { RxCross1 } from "react-icons/rx";
import useClickOutside from "utils/clickOutside";
import img from 'assets/images/The Prestige logo 1.png'
import {setPaymentId} from 'redux/slices/paymentReceiptSlice'
import { useDispatch, useSelector } from "react-redux";
import Axios from "config/api";
import { useQuery } from "react-query";
import { setDoc } from "redux/slices/paymentReceiptSlice";
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import { toWords } from "number-to-words";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";


const SharePayment = ({ setVerify }) => {
  const mainRef = useRef(null);
  const dispatch=useDispatch();
   const {paymentId,doc } = useSelector((state) => state.paymentReceipt);
  console.log(' this is a doc',doc)


  const downloadRef = useRef(null); 

useClickOutside(mainRef, () => {
  setVerify(false);
  dispatch(setPaymentId(null)); 
});

const navigate =useNavigate();



 const { data, isLoading, isError, error } = useQuery(
    ["single-Payment", paymentId],
    () => Axios(`/payment/${paymentId}`)
  );

  useEffect(() => {
    const d = data?.data?.data?.doc;
    if (!d) return;
    dispatch(setDoc(d));
  }, [data, dispatch]);


    const Id = doc?._id;

 console.log(' this is a Id',Id)

    const buyer = doc?.sale?.buyers?.[0];
    const buyerNames = doc?.sale?.buyers?.length
  ? doc.sale.buyers.map(b => b?.name).filter(Boolean).join(", ")
  : "N/A";
 
  const buyerFatherNames = doc?.sale?.buyers?.length
  ? doc.sale.buyers.map(b => b?.fatherName).filter(Boolean).join(", ")
  : "N/A";
  const buyercnics = doc?.sale?.buyers?.length
  ? doc.sale.buyers.map(b => b?.cnic).filter(Boolean).join(", ")
  : "N/A";
  const buyerPhoneNumbers = doc?.sale?.buyers?.length
  ? doc.sale.buyers.map(b => b?.phoneNumber).filter(Boolean).join(", ")
  : "N/A";


  const installment = doc?.installment;
  const inventory = doc?.inventory;
  const parts = doc?.parts || [];

  const totalPaid = parts.reduce((t, p) => t + p.amount, 0);
  const receiptDate = doc?.paidAt
    ? new Date(doc.paidAt).toLocaleDateString()
    : "N/A";
  // ---------------



   const qurl = `https://wcosoftware.cloud/digital-receipt/${Id}`;


const downloadImage = async () => {
  if (!downloadRef.current) return;

  const dataUrl = await toPng(downloadRef.current, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#ffffff",
  });

  const pdf = new jsPDF("p", "mm", "a4");

  // A4 in mm
  const pageW = pdf.internal.pageSize.getWidth();   // 210
  const pageH = pdf.internal.pageSize.getHeight();  // 297

  // ✅ Letterhead margins (edit these)
  const marginTop = 60;
  const marginLeft = 15;
  const marginRight = 15;
  const marginBottom = 20;

  const maxW = pageW - marginLeft - marginRight;
  const maxH = pageH - marginTop - marginBottom;

  const imgProps = pdf.getImageProperties(dataUrl);
  const imgW = imgProps.width;
  const imgH = imgProps.height;

  // scale to fit inside printable area (keep aspect ratio)
  const scale = Math.min(maxW / imgW, maxH / imgH);
  const renderW = imgW * scale;
  const renderH = imgH * scale;

  // position (top-left aligned inside margins)
  const x = marginLeft;
  const y = marginTop;

  // If you want it horizontally centered inside margins, use:
  // const x = marginLeft + (maxW - renderW) / 2;

  pdf.addImage(dataUrl, "PNG", x, y, renderW, renderH);
  pdf.save(`DigitalReceipt_${Id}.pdf`);
};

  return (
    <div className="fixed top-0 left-0 w-full bg-black/25 flex pt-7 items-center justify-center px-3 h-screen z-[9999]">


           <div
       ref={mainRef}
        className="bg-white w-[90%] sm:w-[70%]  lg:w-[70%] 2xl:w-[50%] rounded-lg py-3 relative overflow-y-auto max-h-[90vh] flex flex-col gap-2 popup"
      >

               <div  className=" absolute   right-0  top-[-4px]">
           <button
            onClick={downloadImage}
            className="mx-auto bg-primary px-4 py-2 rounded text-white"
          >
            Download PDF
          </button>
            </div>
        {/* Header */}

         {isLoading ? (
          <Loader />
        ) : isError ? (
          <DisplayError message={error?.message || "Failed to load data"} />
        ) : doc ? (

          <div>
            <div className="flex justify-between items-center w-full py-3  border-black/10 px-5">

        <img src={img}
        className="w-[69px] h-[72px]"

        />
        <h2
  onClick={() => navigate(`/digital-receipt/${Id}`)}
  className="text-md md:text-base font-semibold"
>
  Digital Payment Receipt
</h2>
    
             
        </div>
        <div ref={downloadRef} className="pt-2 bg-white"  style={{ boxShadow: "none" }}>
     
        <div className="flex flex-row  justify-between gap-2  pb-5 pt-4  border-b px-5">
            <div className="flex flex-row gap-1">
               <span className="text-[13px] xs:text-base font-medium">Receipt No:</span>
               <span className="text-[13px] xs:text-base font-normal   border-black  border-b-2">   {doc?.receiptNo || "N/A"}</span> 


   
            </div>

            <div className="flex flex-row gap-1">
                                       <span className="text-[13px] xs:text-base font-medium">Date:</span>
               <span className="text-[13px] xs:text-base font-normal   border-black  border-b-2"> {receiptDate}</span> 
               </div>
        </div>
        {/* Form */}
        <div className="w-full flex flex-col gap-3 px-5 pt-8 pb-5 border-b">
     <div className="w-full flex items-center gap-2">
  
  {/* Left Label */}
  <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
    Mr./Mrs./Ms.:
  </div>

  {/* Right Value with underline filling full remaining width */}
  <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal">
       {buyerNames || "N/A"}
  </div>

</div>
 <div className="w-full flex items-center gap-2">
  
  {/* Left Label */}
  <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
    S/o, D/o, W/o:  
  </div>

  {/* Right Value with underline filling full remaining width */}
  <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal">
 {buyerFatherNames || "N/A"}  </div>

</div>

<div className="w-full flex items-center gap-2">
  
  <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
    CNIC Number:   
  </div>

  <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal">
                   {buyercnics || "N/A"}

  </div>

</div>

<div className="w-full flex items-center gap-2">
  
  <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
Phone Number:  
  </div>

  <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal">
                {buyerPhoneNumbers || "N/A"}
  </div>

</div>

<div className="w-full flex items-center gap-2">
  
  <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
A Sum of Rupees:  
  </div>

 <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal">
  {doc?.totalAmount
    ? `${new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(doc.totalAmount)} (${toWords(doc.totalAmount).replace(/\b\w/g, c => c.toUpperCase())} Only)`
    : "0.00 (Zero Only)"}
</div>

</div>


<div className="w-full flex items-center gap-2">
  
  <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
Pay By:  
  </div>

 <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal">
  {parts.map((p, i) => (
    <span key={i} className=" capitalize">
      {p.method.replace("_", " ")}
      {i < parts.length - 1 ? ", " : ""}
    </span>
  ))}
</div>


  </div>

  
        <div className="w-full flex items-center gap-2">
        
        <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
        Amount Paid Date: 
        </div>

        <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal">
        <div className="text-[13px] xs:text-base">
        {doc?.paidAt ? moment(doc.paidAt).format("DD-MM-YYYY") : ""}
        </div>
        </div>

        </div>



        <div className="w-full flex items-center gap-2">
        
        <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
        Amount Type: 
        </div>

        <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal capitalize">
                        {doc?.installment?.type !== null ? `${doc?.installment?.type} (Installment ${doc?.installment?.seq})` : "N/A"}

        </div>

        </div>

</div>


  
    <div  className=" flex flex-col gap-3   border-b py-4">
         <div className="flex flex-row  justify-between gap-2  px-5">
           
            {/* <div className="flex flex-row gap-1">
               <span className="text-[13px] xs:text-base font-medium">Installment ID:</span>
               <span className="text-[13px] xs:text-base font-normal   border-black  border-b-2"> IN-WAJ-001436765</span> 
            </div> */}

            <div className="flex flex-row gap-1">
              <span className="text-[13px] xs:text-base font-medium">Inventory No:</span>
               <span className="text-[13px] xs:text-base font-normal   border-black  border-b-2">{doc?.inventory?.autoIncrementId}</span> 
               </div>

                  <div className="flex flex-row gap-1">
              <span className="text-[13px] xs:text-base font-medium">Inventory Type:</span>
               <span className="text-[13px] xs:text-base font-normal   border-black  border-b-2">{doc?.inventory?.type}</span> 
               </div>

                  
        </div>
<div className="flex flex-row  justify-between gap-2      px-5">
 <div className="flex flex-row gap-1">
              <span className="text-[13px] xs:text-base font-medium">Inventory FullNumber:</span>
               <span className="text-[13px] xs:text-base font-normal   border-black  border-b-2">{doc?.inventory?.fullNumber}</span> 
               </div>

               
                   <div className="flex flex-row gap-1">
              <span className="text-[13px] xs:text-base font-medium">Inventory Size:</span>
               <span className="text-[13px] xs:text-base font-normal   border-black  border-b-2">{doc?.inventory?.approximateSize}</span> 
               </div>

</div>
<div className="flex flex-row  justify-between gap-2     px-5">
 <div className="flex flex-row gap-1">
              <span className="text-[13px] xs:text-base font-medium">Inventory Number:</span>
               <span className="text-[13px] xs:text-base font-normal   border-black  border-b-2">{doc?.inventory?.number}</span> 
               </div>

               
            

</div>
    </div>
    
        
                <div className="flex flex-row items-center gap-2  py-3  px-3">
             <div  className="w-[60%]  mx-auto">
  <div className="flex flex-col  py-4">
     <span className="text-[13px] xs:text-base font-medium">Received By:</span>
             
  <div className="flex flex-col items-start pt-8">
    <div className="bg-white p-3 rounded shadow">
      <QRCode value={qurl} size={130} /> 
    </div>
    <p className="text-xs mt-2 text-center">
      Scan to open digital receipt
    </p>
    </div>

    
  </div>
</div>
   <div className="w-[40%] flex flex-col gap-3">

              {parts.map((p, i) => (
                <div key={i} className="flex justify-between w-full">
                  <p className="text-[13px] xs:text-base uppercase">
                    {p.method.replace("_", " ")}
                  </p>
                  <p>{p.amount.toLocaleString()}</p>
                </div>
              ))}

              <div className="flex justify-between w-full">
                <p className="text-[13px] xs:text-base font-semibold uppercase">
                  Total amount paid
                </p>
                <p>{totalPaid.toLocaleString()}</p>
              </div>

            </div>

      
                </div>


                



            
           


                


                
        </div>
        </div>
        )
        : (
        <p className="text-center text-gray-500 text-sm py-2">Not available</p>
      )}
     


     


      </div>
     
   
     
    </div>
  );
};

export default SharePayment;