import React from 'react'
import { dashboardCards } from '../overAllDashboard/dashbordCards'
import DashboardCard from 'components/global/DashboardCard'
import InventoryBreakdownCard from './InventoryBreakDownCard'
import CustomerOnboardingCard from './CustomerOnboardingCard'
import ProvisionalReceiptsCard from './ProvisionalReceiptCard'
import InstallmentCollectionVsTargetCard from './InstallmentCollectionVsCard'
import InventoryStatusCard from './StatusCard'
import CollectionOverviewCard from './CollectionOverviewCard'

function InventoryStatsCards() {
  return (
    <div className='w-full flex flex-col gap-10'>
      {/* Top 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full cursor-pointer">
        {dashboardCards.slice(0, 4).map((card, index) => (
          <DashboardCard key={index} card={card} />
        ))}
      </div>

      <div className='flex flex-col lg:flex-row w-full gap-4 items-stretch'>
        
        <div className='w-full lg:w-[27%]  grid grid-cols-2 lg:grid-cols-1 gap-4'>
          <InventoryStatusCard/>
          <CollectionOverviewCard/>
        </div>
        <div className='w-full lg:w-[73%] flex flex-col gap-10'>

        
        <div className='w-full  grid grid-cols-1 md:grid-cols-3 gap-4'>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-[240px]">
            <InventoryBreakdownCard />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-[240px]">
            <CustomerOnboardingCard />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-[240px]">
            <ProvisionalReceiptsCard />
          </div>

        </div>

        <InstallmentCollectionVsTargetCard/>
                </div>

      </div>
    </div>
  )
}

export default InventoryStatsCards;