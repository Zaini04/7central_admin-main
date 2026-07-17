import React from "react";
import { numberToWords } from "../../../utils/numberToWords";
import formatAmount from "utils/formatAmount";
import Input from "components/assignInventory/assignInventoryInput/Input";


const parseAmount = (str) => {
  if (str === null || str === undefined) return "";
  // sirf digits aur ek dot allow karo, commas/other chars hata do
  const cleaned = str.toString().replace(/[^0-9.]/g, "");
  // agar multiple dots aa jayen (edge case) to sirf pehla rakho
  const parts = cleaned.split(".");
  return parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned;
};
const AmountInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  ...rest
}) => {
  const words = numberToWords(value);

  

  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <Input
        label={label}
        name={name}
        placeholder={placeholder}
        type="text"
        value={formatAmount(value)}
        onChange={(e) => onChange(name, parseAmount(e.target.value))}
        error={error}
        {...rest}
      />

      {value ? (
        <p className="text-xs font-medium text-gray-500 px-1 capitalize break-words">
          {words}
        </p>
      ) : null}
    </div>
  );
};

export default AmountInput;