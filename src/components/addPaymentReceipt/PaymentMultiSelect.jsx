// components/addPaymentReceipt/PaymentMultiSelect.jsx
import { useState } from "react";
import Select from "react-select";
import { getIn } from "formik";

const PaymentMultiSelect = ({
  name = "paymentIds",
  label = "Select Approved Payments",
  formik,
  payments = [],
  isLoading = false,
  isDisabled = false,
}) => {
  const [focused, setFocused] = useState(false);

  const valueIds = getIn(formik.values, name) || [];
  const options = (payments || []).map((p) => ({
    value: p._id,
    label: `${p.receiptNo || "N/A"} — ${Number(p.totalAmount || 0).toLocaleString()}`,
  }));
  const selectedOptions = options.filter((o) => valueIds.includes(o.value));
  const error = getIn(formik.touched, name) && getIn(formik.errors, name);
  const isError = Boolean(error);
  const isActive = focused || selectedOptions.length > 0;

  return (
    <div className="relative form-row">
      <div
        className={`relative w-full rounded-lg border transition-all duration-300 ${
          isError
            ? "border-red-500"
            : focused
            ? "border-primary"
            : "border-lighter"
        }`}
      >
        <Select
          isMulti
          isClearable
          closeMenuOnSelect={false}
          isLoading={isLoading}
          isDisabled={isDisabled}
          options={options}
          styles={selectStyles(isError, focused)}
          value={selectedOptions}
          placeholder={isDisabled ? "Select inventory first" : "Select payments..."}
          onFocus={() => setFocused(true)}
          onChange={(vals) => {
            const ids = (vals || []).map((v) => v.value);
            formik.setFieldValue(name, ids);
          }}
          onBlur={() => {
            setFocused(false);
            formik.setFieldTouched(name, true);
          }}
        />

        <label
          htmlFor={name}
          className={`absolute left-0 px-1 transition-all duration-300  pointer-events-none ${
            isActive
              ? `top-[-10px] text-[12px] ${
                  isError
                    ? "text-red-500"
                    : focused
                    ? "text-primary"
                    : "text-gray3"
                }`
              : "top-3 text-gray3"
          }`}
        >
          {label}
        </label>
      </div>

      {error ? <p className="text-red-500 text-xs mt-1">{error}</p> : null}
    </div>
  );
};

const selectStyles = (isError, focused) => ({
  control: (base) => ({
    ...base,
    // height:40 ,
    border: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
    paddingLeft: 4,
    paddingRight: 4,
    cursor: "text",
  }),
  valueContainer: (base) => ({
    ...base,
    // padding: "10px 8px",
    gap: 6,
  }),
  placeholder: (base) => ({
    ...base,
    marginLeft: 2,
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    border: "1px solid #E5E7EB",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#111827",
    fontSize: 13,
    padding: "4px 6px",
  }),
  multiValueRemove: (base) => ({
    ...base,
    borderRadius: 8,
    ":hover": {
      backgroundColor: "#E5E7EB",
      color: "#111827",
    },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({
    ...base,
    paddingRight: 10,
    color: "#6B7280",
    ":hover": { color: "#111827" },
  }),
  clearIndicator: (base) => ({
    ...base,
    paddingRight: 6,
    color: "#6B7280",
    ":hover": { color: "#111827" },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 50,
    borderRadius: 10,
    overflow: "hidden",
    border: "1px solid #E5E7EB",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
  }),
  menuList: (base) => ({
    ...base,
    padding: 6,
    maxHeight: 240,
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: 8,
    fontSize: 14,
    padding: "10px 10px",
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? "rgba(59, 130, 246, 0.12)"
      : state.isFocused
      ? "#F3F4F6"
      : "white",
    color: "#111827",
    ":active": { backgroundColor: "#E5E7EB" },
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "#9CA3AF",
    fontSize: 13,
    padding: 12,
  }),
  loadingMessage: (base) => ({
    ...base,
    color: "#6B7280",
    fontSize: 13,
    padding: 12,
  }),
});

export default PaymentMultiSelect;