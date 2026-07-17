import React from "react";
import formatAmount from "../../../../utils/formatAmount";
import numberToWords from "../../../../utils/numberToWords";
import CancelButton from "components/global/form/CancelButton";
import NextButton from "components/global/form/NextButton";

function ConfirmPricePopup({ sellingPrice, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gunmetal">Confirm Selling Price</h3>

        <p className="text-sm text-gray-500">
          Please double-check the selling price before submitting.
        </p>

        <div className="bg-light2 rounded-xl px-4 py-3 flex flex-col gap-1">
          <span className="text-2xl font-semibold text-gunmetal">
            Rs. {formatAmount(sellingPrice)}
          </span>
          <span className="text-xs text-gray-500 capitalize">
            {numberToWords(sellingPrice)}
          </span>
        </div>

        <div className="flex items-center gap-2 justify-end mt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
          >
        <CancelButton/>
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
          >
            <NextButton label={loading ? "Submitting":"Submit"} createLoading={loading} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPricePopup;