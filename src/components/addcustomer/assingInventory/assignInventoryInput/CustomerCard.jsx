import React from "react";
import { baseURL } from 'config/api';
import img from 'assets/images/img2.jpg';
import { useDispatch } from "react-redux";
import { removeDocMultipleDetails } from "redux/slices/customerSlice";
import { RxCross1 } from "react-icons/rx";

const CustomerCard = ({ data,onRemove }) => {

  const dispatch = useDispatch();

  const profileImage = data?.image
    ? `${baseURL}/${data?.image}`
    : img;

  return (
    <div className="w-full mx-auto bg-white  rounded-xl p-5 border relative">
      <button
        className="absolute top-3 right-3 text-red-600 hover:text-red-800"
        onClick={() => onRemove(data?._id)}
      >
        <RxCross1 size={20} />
      </button>

      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={profileImage}
          alt="Customer"
          className="w-20 h-20 rounded-full border object-cover"
        />

        <div>
          <h2 className="text-lg sm:text-xl font-semibold capitalize">
            {data?.name}
          </h2>
          <p className="text-gray-500 text-xs  sm:text-sm">
            Customer ID: {data?.longAutoIncrementId}
          </p>
        </div>
      </div>

      {/* Information */}
      <div className="mt-4 space-y-2 text-xs md:text-sm">
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
          <span>{data?.phoneNumber}</span>
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
