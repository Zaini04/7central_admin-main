
import BookedChart  from './charts/BookedChart';
import DotSvg  from 'assets/svgs/homesvg/dotsvg';
import DoughnutChart  from './charts/DoughnutChart';
import { useSelector } from 'react-redux';
import Loader from 'components/global/Loader';
import DisplayError from 'components/global/DisplayError';

const HomeChart = ({
  dashboardInventoryError,
  dashboardInventoryLoading,
  dashboardLoading,
  dashboardLoadingError
}) => {
 const { statsDashboard,inventoryDashboard} = useSelector(state => state.dashboard);


  return (
    <div className="  w-full flex  flex-col lg:flex-row gap-3">

    <div className=" w-full lg:w-[60%] bg-light2 rounded-xl h-fit py-7 px-4">

     {
  dashboardInventoryLoading ? (
    <Loader />
  ) : dashboardInventoryError ? (
    <DisplayError message={dashboardInventoryError} />
  ) : inventoryDashboard === 0 ? (
    <p>No data available</p>
  ) : (
    <div className=' flex flex-col gap-3'>
    <div className=' flex justify-between items-center pb-6'>
       <p className="text-dark1 font-semibold">Inventory Booked</p>   
       <DotSvg/>
    </div>

      <BookedChart  inventoryDashboard={inventoryDashboard}/>

    </div>
  )}
  

    </div>

       <div className=" w-full lg:w-[40%] bg-light2 rounded-xl h-fit pt-7 px-4 xl:pb-16">


           {
  dashboardLoading ? (
    <Loader />
  ) : dashboardLoadingError ? (
    <DisplayError message={dashboardLoadingError} />
  ) : statsDashboard === 0 ? (
    <p>No data available</p>
  ) : (
    <div className=' flex flex-col gap-3'>
    <div className=' flex justify-between items-center pb-6'>
       <p className="text-dark1 font-semibold">Receipt Statistics</p>   
       <DotSvg/>
    </div>

    <div className=' flex flex-col xs:flex-row lg:flex-col xl:flex-row  xl:items-center  gap-6'>

    <div className='  w-full xs:w-[60%] lg:w-full xl:w-[60%] h-full'>
   <DoughnutChart  statsDashboard={statsDashboard}/>
    </div>


    {/* totla */}
    <div className=' w-full justify-center xs:justify-start  xs:w-[40%]  lg:w-full xl:w-[40%] flex flex-row xs:flex-col lg:flex-row xl:flex-col gap-5 px-1'>
    <div className='flex flex-col gap-1'>
    <p className='text-[#19203166]  text-xs xs:text-sm '>Total Paid</p>
    <div className='flex flex-row gap-2 justify-center  xs:justify-start lg:justify-center xl:justify-start items-center'>
    <div className=' bg-[#2D3748] w-[13px] h-[13px]   rounded-full'>

    </div>
    <p className=' font-semibold  text-xl'>{statsDashboard?.installments?.paid?.amount}</p>

    </div>

    </div>


       <div className='flex flex-col gap-1'>
    <p className='text-[#19203166]  text-xs xs:text-sm  md:text-base'>Total Overdue</p>
    <div className='flex flex-row gap-2 items-center  justify-center  xs:justify-start lg:justify-center xl:justify-start '>
    <div className=' bg-[#2B7F75] w-[13px] h-[13px]   rounded-full'>

    </div>
    <p className=' font-semibold  text-xl'>{statsDashboard?.installments?.overdue?.amount}</p>

    </div>

    </div>

       <div className='flex flex-col gap-1'>
    <p className='text-[#19203166]  text-xs xs:text-sm  md:text-base'>Total Unpaid</p>
    <div className='flex flex-row gap-2 items-center   justify-center  xs:justify-start lg:justify-center xl:justify-start '>
    <div className=' bg-[#E4E9F1] w-[13px] h-[13px]   rounded-full'>

    </div>
    <p className=' font-semibold  text-xl'>{statsDashboard?.installments?.unpaid?.amount}</p>

    </div>

    </div>

    </div>

    </div>

   

    </div>
  )}
  

    </div>


    </div>
  )
}

export default HomeChart