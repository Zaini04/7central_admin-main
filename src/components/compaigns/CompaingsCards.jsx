import Customers from 'assets/svg/home/home/Customers';
import InventorySvg from 'assets/svg/home/home/InventorySvg';
import PaidReceiptSvg from 'assets/svg/home/home/PaidReceiptSvg';
import PendingReceiptSvg from 'assets/svg/home/home/PendingReceiptSvg';

const CampaignsCards = () => {
  const cardData = [
    { title: "Total Campaigns", value: "11", percentage: "20%", icon: <Customers />, bgIcon: "bg-[#246BFD]" },
    { title: "Active Campaigns", value: "11", percentage: "20%", icon: <InventorySvg />, bgIcon: "bg-[#08B839]" },
    { title: "Ended Campaigns", value: "11", percentage: "20%", icon: <PaidReceiptSvg />, bgIcon: "bg-[#FD0000]" },
    // { title: "Completed", value: "11", percentage: "20%", icon: <PendingReceiptSvg />, bgIcon: "bg-[#8A3EFA]" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full cursor-pointer">
      {cardData.map((card, idx) => (
        <div key={idx} className="h-[110px] bg-white px-4 py-3 flex flex-col justify-between shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out rounded-xl">
          <div className="flex justify-start items-center gap-2">
            <div className={`w-[22px] h-[22px] rounded-full p-1 ${card.bgIcon} flex justify-center items-center text-white`}>
              {card.icon}
            </div>
            <p className="text-[#1F2020] text-sm font-medium">{card.title}</p>
          </div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-bold">{card.value}</h2>
            {/* <div className="flex items-center text-[11px] font-semibold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">
              <span>↑ {card.percentage}</span>
              <span className="text-[9px] text-gray-400 font-normal ml-1">Up from yesterday</span>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignsCards;