
import { useSelector } from 'react-redux';
import Customers from 'assets/svg/home/home/Customers';
import InventorySvg from 'assets/svg/home/home/InventorySvg';
import PendingReceiptSvg from 'assets/svg/home/home/PendingReceiptSvg';
import PaidReceiptSvg from 'assets/svg/home/home/PaidReceiptSvg';
import LeadSvg from 'assets/svg/home/home/LeadsSvg';
import ActiveVisitorsCard from './ActiveVisitorsCard';
import VisitorPerMinuteCard from './VisitorPerMinuteCard';
import ConversionRateCard from './ConversionRateCard';
import BounceRateCard from './BounceRateCard';
import AllLeadsCard from './AllLeadCard';
import TotalProspectChart from './TotalProspectChart';
import OpexChart from './OpexChart';
import CapexChart from './CapExChart';




const OverAllDashboardCard = () => {

 const dashboardCards = [
  {
    id: 1,
    title: "Total Leads",
    value: "157,367",
    percentage: "6.73%",
    trend: "increase",
    icon: <LeadSvg/>,
    bgIcon: "bg-[#F0F6FF]"
  },
  {
    id: 2,
    title: "Leads Contacted",
    value: "9,741",
    percentage: "13.5%",
    trend: "decrease",
    icon: <LeadSvg/>,
    bgIcon: "bg-[#FFFAC2]"
  },
  {
    id: 3,
    title: "Social Media Leads",
    value: "157,367",
    percentage: "6.73%",
    trend: "increase",
    icon: <LeadSvg/>,
    bgIcon: "bg-[#F0F6FF]"
  },
  {
    id: 4,
    title: "Dealer Leads",
    value: "9,741",
    percentage: "13.5%",
    trend: "decrease",
    icon: <LeadSvg/>,
    bgIcon: "bg-[#FFFAC2]"
  },
  {
    id: 5,
    title: "Total Income",
    value: "9.73%",
    percentage: "33%",
    trend: "increase",
    icon: <LeadSvg/>,
    bgIcon: "bg-[#E7F7EF]"
  },
  {
    id: 6,
    title: "Total Profit",
    value: "81.94%",
    percentage: "1.2%",
    trend: "increase",
    icon: <LeadSvg/>,
    bgIcon: "bg-[#FDEDED]"
  },
  {
    id: 7,
    title: "All Customers",
    value: "9.73%",
    percentage: "33%",
    trend: "increase",
    icon: <LeadSvg/>,
    bgIcon: "bg-[#E7F7EF]"
  },
  {
    id: 8,
    title: "All Dealers",
    value: "81.94%",
    percentage: "1.2%",
    trend: "increase",
    icon: <LeadSvg/>,
    bgIcon: "bg-[#FDEDED]"
  },
];
    


// const { statsDashboard } = useSelector(state => state.dashboard);

  return (
    <div className=' w-full flex flex-col gap-10'>
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full cursor-pointer">
<ActiveVisitorsCard/>
<VisitorPerMinuteCard/>
<ConversionRateCard/>
<BounceRateCard/>
</div>

   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full cursor-pointer">
      {dashboardCards.map((card, idx) => (
        <div key={idx} className="h-[110px] bg-white px-4 py-3 flex  justify-between shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out rounded-lg">
          <div className="flex flex-col justify-start items-start  gap-2">
           
            <p className="text-[#626C70] text-xs font-medium">{card.title}</p>
             <h2 className="text-lg font-semibold">{card.value}</h2>
            <div className={`flex items-center text-[11px]  font-medium  ${card.trend === "increase" ? "text-emerald-500" : "text-red-500"  }`}>
              <span className=''>{card.trend === 'increase' ? '↑' : '↓' }  {card.percentage} </span>
              <span className={`text-[10px]   ml-1 ${card.trend === "increase" ? "text-emerald-500" : "text-red-500"  }`}>{card.trend }</span>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
           
             <div className={`w-[42px] h-[42px] rounded-full p-1 ${card.bgIcon} flex justify-center items-center text-white`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
       <div className=" w-full grid grid-cols-1 sm:grid-cols-10  gap-4  cursor-pointer">
<div className="sm:col-span-7 ">
    <AllLeadsCard />
  </div>

  <div className="sm:col-span-3 bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col justify-between h-[320px]">
    <TotalProspectChart />
  </div>
</div>
<div className="w-full grid grid-cols-1 lg:grid-cols-10 gap-5">
  <div className="lg:col-span-5 bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-[340px]">
    <OpexChart />
  </div>

  <div className="lg:col-span-5 bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-[340px]">
    <CapexChart />
  </div>
</div>
        </div>



  )
}

export default OverAllDashboardCard