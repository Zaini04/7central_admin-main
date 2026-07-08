import React from "react";
import { baseURL } from "config/api";
import img from "assets/images/img2.jpg";
import Status from "components/global/Status";

const SingleInventoryCard = ({ data }) => {


  return (
    <div className="w-full mx-auto bg-white rounded-xl p-5 border">
      {/* Header */}
      <div className="flex items-center gap-4">
    
        <div>
          <h2 className="text-xl font-semibold capitalize">
            {data?.project?.title} – {data?.sector?.title}
          </h2>

          <p className="text-gray-500 text-sm">
            Inventory ID: {data?.longAutoIncrementId}
          </p>

          <p
            className={`text-sm mt-1 flex flex-row gap-1 items-center`}
          >
            <span> Status:</span>   <span><Status status={data?.status}/></span>  
          </p>
        </div>
      </div>

      {/* Information Grid */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="grid grid-cols-2">
          <span className="font-medium">Project:</span>
          <span>{data?.project?.title}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Sector:</span>
          <span>{data?.sector?.title}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Type:</span>
          <span className="capitalize">{data?.type}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Plot Number:</span>
          <span>{data?.plotNumber}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Street:</span>
          <span>{data?.street}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Full Number:</span>
          <span>{data?.fullNumber}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Approx Size:</span>
          <span>{data?.approximateSize}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Significance:</span>
          <span>{data?.significance}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-medium">Actual Price:</span>
          <span>{data?.actualPrice}</span>
        </div>

        {/* Current Sale Section */}
        {data?.currentSale && (
          <>
            <div className="border-t pt-3 font-semibold">Sale Details</div>

            <div className="grid grid-cols-2">
              <span className="font-medium">Selling Price:</span>
              <span>{data?.currentSale?.sellingPrice}</span>
            </div>

            <div className="grid grid-cols-2">
              <span className="font-medium">Payment Type:</span>
              <span className="capitalize">{data?.currentSale?.paymentType}</span>
            </div>

            <div className="grid grid-cols-2">
              <span className="font-medium">Ownership:</span>
              <span className="capitalize">{data?.currentSale?.onwershipType}</span>
            </div>

            <div className="grid grid-cols-2">
              <span className="font-medium">Sale Status:</span>
              <span className="capitalize">{data?.currentSale?.status}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleInventoryCard;
