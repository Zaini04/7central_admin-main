import PeopleSvg  from 'assets/svgs/homesvg/PeopleSvg';
import StatusupSvg  from 'assets/svgs/homesvg/StatusupSvg';
import ReceiptsSvg  from 'assets/svgs/homesvg/ReceiptsSvg'
import MoneySvg  from 'assets/svgs/homesvg/MoneySvg'

import { useSelector } from 'react-redux';
import Customers from 'assets/svg/home/home/Customers';
import InventorySvg from 'assets/svg/home/home/InventorySvg';
import PendingReceiptSvg from 'assets/svg/home/home/PendingReceiptSvg';
import PaidReceiptSvg from 'assets/svg/home/home/PaidReceiptSvg';



const HomeCard = () => {


const { statsDashboard } = useSelector(state => state.dashboard);

  return (
 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full cursor-pointer">

  {/* Total Customers */}
  <div className="h-[110px] bg-light2 px-4 py-3  flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <div className="flex justify-start items-center gap-1.5">
       <div className="w-[22px] h-[22px] rounded-full p-1 bg-[#246BFD] flex justify-center items-center">
      <Customers />
    </div>
      <p className="text-[#1F2020] text-sm font-medium">Total Customers</p>
    </div>
    <div>

      <h2 className="text-xl font-bold">{statsDashboard?.headline?.totalCustomers}</h2>
    </div>
  </div>

  {/* Total Active Inventory */}
  <div className="h-[110px] bg-light2 px-4 py-3  flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <div className="flex justify-start items-center gap-1.5">
       <div className="w-[22px] h-[22px] p-1 rounded-full bg-[#08B839] flex justify-center items-center">
      <InventorySvg />
    </div>
      <p className="text-[#1F2020]   text-sm font-medium">Total Active Inventory</p>
    </div>
    {/* <div className="w-[33px] h-[33px] rounded-md bg-[#FFFAE1] flex justify-center items-center">
      <StatusupSvg />
    </div> */}
    <div>
            <h2 className="text-xl font-bold">{statsDashboard?.headline?.totalActiveInventory}</h2>

    </div>
  </div>
  {/* Total Active Inventory */}
  {/* <div className="h-[100px] bg-light2 px-4 py-3 border-b-[3px] border-[#FFD66B] flex justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-md">
    <div className="flex flex-col gap-1.5">
      <p className="text-dark1 font-semibold">On Installments Inventories</p>
      <h2 className="text-[26px] font-bold">{statsDashboard?.headline?.onInstallmentsInventories}</h2>
    </div>
    <div className="w-[33px] h-[33px] rounded-md bg-[#FFFAE1] flex justify-center items-center">
      <StatusupSvg />
    </div>
  </div> */}

  {/* Paid Receipts */}
  <div className="h-[110px] bg-light2 px-4 py-3 flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <div className="flex justify-start items-center gap-1.5">
      <div className="w-[22px] h-[22px] p-1 rounded-full bg-[#FD0000] flex justify-center items-center">
      <PaidReceiptSvg />
    </div>
      <p className="text-[#1F2020] text-sm font-medium">Paid Receipts</p>
    </div>
    <div>

      <h2 className="text-xl font-bold">{statsDashboard?.headline?.paidInstallments}</h2>
    </div>
  </div>

  {/* Pending Receipts */}
  {/* <div className="h-[100px] bg-light2 px-4 py-3 border-b-[3px] border-[#7EC2FF] flex justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-md">
    <div className="flex flex-col gap-1.5">
      <p className="text-dark1 font-semibold">Pending Installments</p>
      <h2 className="text-[26px] font-bold">{statsDashboard?.headline?.pendingInstallments}</h2>
    </div>
    <div className="w-[33px] h-[33px] rounded-md bg-[#7EC2FF] bg-opacity-40 flex justify-center items-center">
      <MoneySvg />
    </div>
  </div> */}

  <div className="h-[110px] bg-light2 px-4 py-3  flex flex-col justify-between shadow-md 
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out rounded-xl">
    <div className="flex  justify-start items-center gap-1.5">
       <div className="w-[22px] h-[22px] p-1 rounded-full bg-[#8A3EFA] flex justify-center items-center">
      <PendingReceiptSvg />
    </div>
      <p className="text-[#1F2020] text-sm font-medium">Pending Reciepts</p>
    </div>
   <div>
      <h2 className="text-xl font-bold">{statsDashboard?.headline?.pendingPaymentsForApproval}</h2>

   </div>
  </div>

</div>


  )
}

export default HomeCard