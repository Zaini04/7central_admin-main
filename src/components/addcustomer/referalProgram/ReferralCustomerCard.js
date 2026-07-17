import React from "react";
import img from 'assets/images/img2.jpg';
import { FiEdit2 } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

const Row = ({ label, value }) => (
  <div className="grid grid-cols-2">
    <span className="font-medium">{label}:</span>
    <span className="text-gray-600">{value || "—"}</span>
  </div>
);

const ReferralCustomerCard = ({ data, onEdit, onDelete }) => {
  const profileImage = data?.image || img;

  return (
    <div className="w-full mx-auto bg-white rounded-xl p-5 border relative">
      <div className="absolute top-3 right-3 flex items-center gap-3">
        <button
          type="button"
          className="text-primary hover:opacity-70"
          onClick={onEdit}
        >
          <FiEdit2 size={18} />
        </button>
        <button
          type="button"
          className="text-red-600 hover:text-red-800"
          onClick={onDelete}
        >
          <RxCross1 size={20} />
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={profileImage}
          alt="Customer"
          className="w-20 h-20 rounded-full border object-cover"
        />
        <div>
          <h2 className="text-lg sm:text-xl font-semibold capitalize">
            {data?.name || "—"}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.customerType || "Referral"}
          </p>
        </div>
      </div>

      {/* Information */}
      <div className="mt-4 space-y-2 text-xs md:text-sm">
        <Row label="Father Name" value={data?.fatherName} />
        <Row label="Email" value={data?.email} />
        <Row label="Phone" value={data?.phoneNumber} />
        <Row label="Phone 2" value={data?.phoneNumber2} />
        <Row label="WhatsApp" value={data?.whatsappNumber} />
        <Row label="WhatsApp 2" value={data?.whatsappNumber2} />
        <Row label="CNIC" value={data?.cnic} />
        <Row label="Passport Name" value={data?.passportName} />
        <Row label="Profession" value={data?.profession} />
        <Row label="Gender" value={data?.gender} />
        <Row label="Education" value={data?.education} />
        <Row label="Filer" value={data?.filer} />
        {data?.filer === "Filer" && <Row label="NTT Number" value={data?.nttnumber} />}
        <Row label="House/Flat #" value={data?.houseFlatNumber} />
        <Row label="Address" value={data?.address} />
        <Row label="Address 2" value={data?.address2} />
        <Row label="Country" value={data?.countryName} />
        <Row label="Province" value={data?.province} />
        <Row label="City" value={data?.city} />
      </div>
    </div>
  );
};

export default ReferralCustomerCard;