const defaultPlaceholders = [
  { label: "Client Name", value: "[Client Name]" },
  { label: "Amount", value: "[Amount]" },
  { label: "Inventory #", value: "[Inventory #]" },
  { label: "Unit Type", value: "[Commercial/Residential]" },
  { label: "Receipt #", value: "[Receipt #]" },
  { label: "Date", value: "[Date]" },
  { label: "Due Date", value: "[Due Date]" },
  { label: "Project", value: "[Project]" },
  { label: "Payment Type", value: "[Installment/Down Payment]" },
];

const PlaceholderToolbar = ({
  onInsert,
  placeholders = defaultPlaceholders,
  title = "Available Variables",
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-dark1">{title}</p>
      <div className="flex flex-wrap gap-2">
        {placeholders.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onInsert(item.value)}
            className="px-3 py-1.5 rounded-full border text-xs bg-[#F3F4F5] hover:bg-gray-100"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlaceholderToolbar;