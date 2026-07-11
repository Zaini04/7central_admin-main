import React from "react";
import { baseURL } from 'config/api';
import img from 'assets/images/img2.jpg';
import Status from "components/global/Status";

const InstallmentCard = ({ doc }) => {
  // Choose the primary buyer (first one in array)
  const buyer = doc?.sale?.buyers?.[0];

  // Customer profile image (optional)
  // const profileImage = buyer?.image ? `${baseURL}/${buyer.image}` : img;

  return (
    <div className="w-full mx-auto bg-white rounded-xl p-5 border mb-4 ">
      {/* Header */}
      <div className="flex items-center gap-4">
 

        <div>
          <h2 className=" text-lg sm:text-xl font-semibold capitalize">
            {buyer?.name || "N/A"}
          </h2>
          <p className="text-gray-500 text-xs  sm:text-sm">
            Customer ID: {doc?.inventory?.longAutoIncrementId || "N/A"}
          </p>
        </div>
      </div>

      {/* Information */}
      <div className="mt-4 space-y-2 text-xs md:text-sm">
        <div className="grid grid-cols-2">
          <span className="font-medium">Father Name:</span>
          <span>{buyer?.fatherName || "N/A"}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Email:</span>
          <span>{buyer?.email || "N/A"}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Phone:</span>
          <span>{buyer?.phoneNumber || "N/A"}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">CNIC:</span>
          <span>{buyer?.cnic || "N/A"}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Plot Number:</span>
          <span>{doc?.inventory?.plotNumber || "N/A"}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Full Number:</span>
          <span>{doc?.inventory?.fullNumber || "N/A"}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Approx. Size:</span>
          <span>{doc?.inventory?.approximateSize || "N/A"}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Facing:</span>
          <span>{doc?.inventory?.significance || "N/A"}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Installment Amount:</span>
          <span>{doc?.amount ? `PKR ${doc.amount}` : "N/A"}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Due Date:</span>
          <span>{doc?.dueDate ? new Date(doc.dueDate).toLocaleDateString() : "N/A"}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Status:</span>
          <span>  <Status  status={doc?.status || "N/A"}/></span>
        </div>
      </div>
    </div>
  );
};

export default InstallmentCard;
