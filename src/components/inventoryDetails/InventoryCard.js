import { useSelector } from 'react-redux';

const InventoryCard = () => {
const { inventoryStats} = useSelector(state => state.inventory);

const formatNumber = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const raw = String(value).replace(/,/g, "");
  if (raw === "" || raw === ".") return raw;
  const [intPart, decPart] = raw.split(".");
  const intFormatted = Number(intPart || 0).toLocaleString("en-US");
  return decPart !== undefined ? `${intFormatted}.${decPart}` : intFormatted;
};

  return (
 <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 py-3 w-full cursor-pointer">

  {/* Total Payment */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <div className="flex justify-start items-center gap-1.5">
      <p className="text-[#1F2020] text-sm font-medium">Total Payment</p>
    </div>
    <div>
      <h2 className="text-xl font-bold">{formatNumber(inventoryStats?.totalAmount)}</h2>
    </div>
  </div>

  {/* Paid Amount */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <div className="flex justify-start items-center gap-1.5">
      <p className="text-[#1F2020] text-sm font-medium">Paid Amount</p>
    </div>
    <div>
      <h2 className="text-xl font-bold">{formatNumber(inventoryStats?.installments?.paid?.amount)}</h2>
    </div>
  </div>

  {/* Remaining Amount */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <div className="flex justify-start items-center gap-1.5">
      <p className="text-[#1F2020] text-sm font-medium">Remainging Amount</p>
    </div>
    <div>
      <h2 className="text-xl font-bold">{formatNumber((inventoryStats?.totalAmount) - (inventoryStats?.installments?.paid?.amount??0))}</h2>
    </div>
  </div>

  {/* Unpaid Amount */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <div className="flex justify-start items-center gap-1.5">
      <p className="text-[#1F2020] text-sm font-medium">Unpaid Amount</p>
    </div>
    <div>
      <h2 className="text-xl font-bold">{formatNumber(inventoryStats?.installments?.unpaid?.amount??0)}</h2>
    </div>
  </div>

  {/* Over Due Amount */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <div className="flex justify-start items-center gap-1.5">
      <p className="text-[#1F2020] text-sm font-medium">Over Due Amount</p>
    </div>
    <div>
      <h2 className="text-xl font-bold">{formatNumber(inventoryStats?.installments?.overdue?.amount??0)}</h2>
    </div>
  </div>

</div>
  )
}

export default InventoryCard