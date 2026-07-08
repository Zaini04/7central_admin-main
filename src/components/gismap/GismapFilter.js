import SelectInput from "components/global/form/SelectInput";

const GismapFilter = () => {
  return (
    <div className="w-full rounded-lg py-4 bg-light2 flex flex-col gap-3 pb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3">
        <p className="text-dark1 font-semibold">Search Filters</p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-3">
        <SelectInput
          name="sector"
          placeholder="Select Sector"
          options={[
            "Sector A",
            "Sector B",
            "Sector C",
            "Sector D",
          ]}
        />

        <SelectInput
          name="inventoryType"
          placeholder="Select Inventory Type"
          options={[
            "Residential Plot",
            "Commercial Plot",
            "Apartment",
            "Shop",
          ]}
        />

        <SelectInput
          name="plotNumber"
          placeholder="Select Plot No."
          options={[
            "Plot 1",
            "Plot 2",
            "Plot 3",
            "Plot 4",
          ]}
        />
      </div>
    </div>
  );
};

export default GismapFilter;
