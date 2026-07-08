import { useRef,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setDoc } from "redux/slices/paymentReceiptSlice";
import useClickOutside from "utils/clickOutside";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "components/global/Loader";
import DisplayError from "components/global/DisplayError";
import ItemNotFound from "components/global/ItemNotFound";
import img from 'assets/images/The Prestige logo 1.png'
import moment from "moment";
import { toWords } from "number-to-words";

import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";





const DigitalReceipt = () => {
const  {id}=useParams();


 const mainRef = useRef(null);
  const dispatch=useDispatch();
   const {paymentId,doc } = useSelector((state) => state.paymentReceipt);
  console.log(' this is a doc',doc)





 const { data, isLoading, isError, error } = useQuery(
    ["single-Payment", id],
    () => axios(`https://api.wcosoftware.cloud/api/payment/${id}`)
  );

  useEffect(() => {
    const d = data?.data?.data?.doc;
    if (!d) return;
    dispatch(setDoc(d));
  }, [data, dispatch]);

  const downloadRef = useRef(null); 


    const buyer = doc?.sale?.buyers?.[0];
  const installment = doc?.installment;
  const inventory = doc?.inventory;
  const parts = doc?.parts || [];

  const totalPaid = parts.reduce((t, p) => t + p.amount, 0);
  const receiptDate = doc?.paidAt
    ? new Date(doc.paidAt).toLocaleDateString()
    : "N/A";
  // ---------------


  
     const qurl = `https://wcosoftware.cloud/digital-receipt/${id}`;
  
  
    const downloadImage = () => {
      if (!downloadRef.current) return;
  
      toPng(downloadRef.current, { cacheBust: true })
        .then((dataUrl) => {
          saveAs(dataUrl, `DigitalReceipt_${id}.png`);
        })
        .catch((err) => {
          console.error("Failed to capture QR code:", err);
        });
    };

  return (
           <div
       ref={mainRef}
        className="bg-white w-[90%] mx-auto sm:w-[60%]  lg:w-[50%] rounded-lg py-3 relative overflow-y-auto max-h-screen flex flex-col gap-2 popup"
      >
        {/* Header */}

         {isLoading ? (
          <Loader />
        ) : isError ? (
          <DisplayError message={error?.message || "Failed to load data"} />
        ) : doc ? (

        <>
     <div className="flex justify-between items-center w-full py-3  border-black/10 px-5">

        <img src={img}
        className="w-[69px] h-[72px]"

        />
          <h2 className="text-md md:text-base   font-semibold">
            Digital Payment Receipt 
          </h2>
        
        </div>
        <div className="flex flex-row  justify-between gap-2  pb-5  border-b px-5">
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
        <div className="w-full flex flex-col gap-3 px-5 ">
     <div className="w-full flex items-center gap-2">
  
  {/* Left Label */}
  <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
    Mr./Mrs./Ms.:
  </div>

  {/* Right Value with underline filling full remaining width */}
  <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal">
       {buyer?.name || "N/A"}
  </div>

</div>
 <div className="w-full flex items-center gap-2">
  
  {/* Left Label */}
  <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
    S/o, D/o, W/o:  
  </div>

  {/* Right Value with underline filling full remaining width */}
  <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal">
 {buyer?.fatherName || "N/A"}  </div>

</div>

<div className="w-full flex items-center gap-2">
  
  <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
    CNIC Number:   
  </div>

  <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal">
                   {buyer?.cnic || "N/A"}

  </div>

</div>

<div className="w-full flex items-center gap-2">
  
  <div className="text-[13px] xs:text-base font-semibold whitespace-nowrap">
Phone Number:  
  </div>

  <div className="flex-1 border-b-2 border-black text-[13px] xs:text-base font-normal">
                {buyer?.phoneNumber || "N/A"}
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
                        {doc?.installment?.type || "N/A"}

        </div>

        </div>

</div>


  

         <div  className=" flex flex-col gap-3">
         <div className="flex flex-row  justify-between gap-2    px-5">
           
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
<div className="flex flex-row  justify-between gap-2      border-b px-5">
 <div className="flex flex-row gap-1">
              <span className="text-[13px] xs:text-base font-medium">Inventory Number:</span>
               <span className="text-[13px] xs:text-base font-normal   border-black  border-b-2">{doc?.inventory?.number}</span> 
               </div>

               
            

</div>
    </div>
    
                <div className="flex flex-row gap-2  py-3  px-3">
                      <div   ref={downloadRef} className="w-[60%]  mx-auto">
  <div className="flex flex-col items-center py-4">
    <div className="bg-white p-3 rounded shadow">
      <QRCode value={qurl} size={150} /> 
    </div>
    <p className="text-xs mt-2 text-center">
      Scan to open digital receipt page
    </p>
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
        </>
        )
        : (
        <p className="text-center text-gray-500 text-sm py-2">Not available</p>
      )}
     


     


      </div>
  )
}

export default DigitalReceipt;