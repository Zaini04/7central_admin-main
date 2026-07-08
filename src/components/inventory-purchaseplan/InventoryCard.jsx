import React from "react";
import img from "assets/images/img2.jpg";
import FormControl from "components/global/form/FormControl";

const InventoryCard = () => {

  const inventory = {
    project: "The Prestige",
    sector: "B",
    inventoryId: "INV-WAJ-001",
    status: "Not Assigned",
    plotNumber: "12",
    street: "1",
    fullNumber: "11 DHA",
    type: "Residential",
    approximateSize: "54546546",
    significance: "11wewe",
    actualPrice: "Not Set",
    currentSale: "No Sale Assigned",
    createdAt: "14 Nov 2025",
  };

  return (
    <div className="w-ful p-4">

      {/* Header */}
      <div className="flex items-center gap-4">
   

        <div>
          <h2 className="text-xl font-semibold capitalize">
            {inventory.project} - {inventory.sector}
          </h2>

          <p className="text-gray-500 text-sm">
            Inventory ID: {inventory.inventoryId}
          </p>

          <p className="text-sm mt-1 text-red-500">
            Status: {inventory.status}
          </p>
        </div>
      </div>

      {/* Information */}
      <div className="mt-4 space-y-2 text-sm">

        <div className="grid grid-cols-2">
          <span className="font-medium">Project:</span>
          <span>{inventory.project}</span>
        </div>



        {/* Static Price */}
        <div className="grid grid-cols-2">
          <span className="font-medium">Actual Price:</span>
          <span>{inventory.actualPrice}</span>
        </div>

        {/* Static Sale */}
        <div className="grid grid-cols-2">
          <span className="font-medium">Current Sale:</span>
          <span>{inventory.currentSale}</span>
        </div>

    

      </div>
    </div>
  );
};

export default InventoryCard;
