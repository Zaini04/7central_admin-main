// components/addPaymentReceipt/PaymentMultiSelect.jsx
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
  const valueIds = getIn(formik.values, name) || [];

  const options = (payments || []).map((p) => ({
    value: p._id,
    label: `${p.receiptNo || "N/A"} — ${Number(p.totalAmount || 0).toLocaleString()}`,
  }));

  const selectedOptions = options.filter((o) => valueIds.includes(o.value));

  const error = getIn(formik.touched, name) && getIn(formik.errors, name);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      <Select
      // className="px-2 py-1 border rounded-md text-sm"
        isMulti
        isClearable
        closeMenuOnSelect={false}
        isLoading={isLoading}
        isDisabled={isDisabled}
        options={options}
        styles={selectStyles}
        value={selectedOptions}
        placeholder={isDisabled ? "Select inventory first" : "Select payments..."}
        onChange={(vals) => {
          const ids = (vals || []).map((v) => v.value);
          formik.setFieldValue(name, ids);
        }}
        onBlur={() => formik.setFieldTouched(name, true)}
      />

      {error ? <p className="text-red-500 text-xs mt-1">{error}</p> : null}
    </div>
  );
};
 const selectStyles = {
    control: (base, state) => ({
      ...base,
      // minHeight: 56,
      // height: "auto",
      // border: "none",
      boxShadow: "none",
      // backgroundColor: "transparent",
      paddingLeft: 4,
      // paddingRight: 40,
      // cursor: isDisabled ? "not-allowed" : "text",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "4px 4px",
      gap: 6,
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9CA3AF", // gray-400
      marginLeft: 2,
    }),
    multiValue: (base) => ({
      ...base,
      borderRadius: 8,
      backgroundColor: "#F3F4F6", // gray-100
      border: "1px solid #E5E7EB", // gray-200
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#111827", // gray-900
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
      color: "#6B7280", // gray-500
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
        ? "rgba(59, 130, 246, 0.12)" // primary-ish tint
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
  };
export default PaymentMultiSelect;