import React from "react";
import { baseURL } from 'config/api';
import img from 'assets/images/img2.jpg';



const CustomerCard = ({data}) => {


      const profileImage = data?.createdBy?.image ? `${baseURL}/${data?.createdBy?.image}` : img;
    


 

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-xl p-5 border">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={profileImage}
          alt="Customer"
          className="w-20 h-20 rounded-full border object-cover"
        />

        <div>
          <h2 className="text-xl font-semibold capitalize">
            {data?.name}
          </h2>
          <p className="text-gray-500 text-sm">
            Customer ID: {data?.longAutoIncrementId}
          </p>
      
        </div>
      </div>

      {/* Information */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="grid grid-cols-2">
          <span className="font-medium">Father Name:</span>
          <span>{data?.fatherName}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Email:</span>
          <span>{data?.email}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Phone:</span>
          <span>{data?.Phone}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">WhatsApp:</span>
          <span>{data?.whatsappNumber}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">CNIC:</span>
          <span>{data?.cnic}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Address:</span>
         <span>{data?.address}</span>
        </div>
      </div>

    </div>
  );
};

export default CustomerCard;
