import PeopleSvg  from 'assets/svgs/homesvg/PeopleSvg';
import StatusupSvg  from 'assets/svgs/homesvg/StatusupSvg';
import ReceiptsSvg  from 'assets/svgs/homesvg/ReceiptsSvg'
import MoneySvg  from 'assets/svgs/homesvg/MoneySvg'

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
 <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 px-3 pt-3 w-full cursor-pointer">

  {/* Total Customers */}
  <div className="h-[99px] bg-light2 px-4 py-3 border-b-[3px] border-[#59B29F] flex justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-md">
    <div className="flex flex-col gap-1.5">
      <p className="text-dark1 font-semibold">Total Payment</p>
      <h2 className="text-[18px] font-bold">{formatNumber(inventoryStats?.totalAmount)}</h2>
    </div>
  </div>
 
  <div className="h-[99px] bg-light2 px-4 py-3 border-b-[3px] border-[#59B29F] flex justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-md">
    <div className="flex flex-col gap-1.5">
      <p className="text-dark1 font-semibold">Paid Amount</p>
      <h2 className="text-[18px] font-bold">{formatNumber(inventoryStats?.installments?.paid?.amount)}</h2>
    </div>
  </div>

  <div className="h-[99px] bg-light2 px-4 py-3 border-b-[3px] border-[#59B29F] flex justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-md">
    <div className="flex flex-col gap-1.5">
      <p className="text-dark1 font-semibold">Remainging Amount</p>
      <h2 className="text-[18px] font-bold">{formatNumber((inventoryStats?.totalAmount) - (inventoryStats?.installments?.paid?.amount??0))}</h2>
    </div>
  </div>
 
  <div className="h-[99px] bg-light2 px-4 py-3 border-b-[3px] border-[#59B29F] flex justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-md">
    <div className="flex flex-col gap-1.5">
      <p className="text-dark1 font-semibold">Unpaid Amount</p>
      <h2 className="text-[18px] font-bold">{formatNumber(inventoryStats?.installments?.unpaid?.amount??0)}</h2>
    </div>
  </div>

  <div className="h-[99px] bg-light2 px-4 py-3 border-b-[3px] border-[#59B29F] flex justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-md">
    <div className="flex flex-col gap-1.5">
      <p className="text-dark1 font-semibold">Over Due Amount</p>
      <h2 className="text-[18px] font-bold">{formatNumber(inventoryStats?.installments?.overdue?.amount??0)}</h2>
    </div>
  </div>



</div>


  )
}

export default InventoryCard