import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FiTrendingUp, FiUsers, FiAlertTriangle } from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true }
  },
  scales: {
    x: {
      grid: { display: false, drawBorder: false },
      ticks: { color: '#626C70', font: { size: 11, weight: '500' } }
    },
    y: {
      grid: { color: '#F0F2F5', drawBorder: false },
      ticks: {
        color: '#626C70',
        font: { size: 11, weight: '500' },
        stepSize: 500
      }
    }
  }
};

export default function InstallmentCollectionVsTargetCard() {
  const [activeTab, setActiveTab] = useState('1 Day');
  const tabs = ['1 Day', '1 Week', '1 Month', '1 Year', 'All'];

  // 1 se 24 tak ke labels (X-Axis)
  const labels = Array.from({ length: 24 }, (_, i) => String(i + 1));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Previous Month Trend',
        data: [200, 230, 300, 340, 420, 410, 450, 500, 600, 700, 750, 750, 760, 820, 900, 960, 1040, 1080, 1100, 1150, 1220, 1340, 1450, 1500, 1550, 1650],
        borderColor: '#FFAA33',
        backgroundColor: 'rgba(255, 170, 51, 0.08)', // Orange bottom translucent area fill
        fill: true,
        tension: 0.1,
        pointBackgroundColor: '#FFAA33',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 1,
        pointRadius: 4
      },
      {
        label: 'Monthly Target Goal',
        data: [150, 180, 220, 250, 310, 330, 340, 370, 480, 480, 550, 520, 540, 570, 620, 660, 710, 750, 760, 800, 850, 920, 980, 1040, 1060, 1100],
        borderColor: '#703EFF',
        fill: false,
        tension: 0.1,
        pointBackgroundColor: '#703EFF',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 1,
        pointRadius: 4
      }
    ]
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
      
      {/* Top Header Block: Title vs Time Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50 pb-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-[#626C70] text-xs font-medium">Installment Collection vs Target</span>
          <span className="text-[10px] text-[#929BB1]">Comparison between expected installment targets and actual payments received.</span>
        </div>
        
        {/* Pills Tabs Switcher */}
        <div className="flex bg-[#F4F7FE] gap-2 p-1 rounded-lg self-end sm:self-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-1 py-1 text-[10px] font-medium rounded transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-[#111827] text-white shadow-sm'
                  : 'text-[#A3AED0] hover:text-[#626C70]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Mid Metrics Grid Block */}
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-6 ">
        {/* Left Sub-Legends Custom Element */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#626C70]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#703EFF]" />
            <span className='text-[#626C70] text-[11px] font-medium'>Actual Collections</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              <div className="w-4 h-[2px] bg-[#FFAA33] relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#FFAA33]" />
              </div>
            </div>
            <span className='text-[#626C70] text-[11px] font-medium'>Previous Month Trend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              <div className="w-4 h-[2px] bg-[#703EFF] relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#111827]" />
              </div>
            </div>
            <span className='text-[#626C70] text-[11px] font-medium'>Monthly Target Goal</span>
          </div>
        </div>

        {/* Right Dynamic Analytical Counter Statistics badges */}
        <div className="flex flex-wrap items-center gap-6 ml-auto">
          {/* Total Booked */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-[#FFAA33] text-[11px] font-medium">
              <FiTrendingUp size={13} />
              <span>Total Booked Amount</span>
            </div>
            <div className="flex items-center gap-2">
              <span className=" text-sm font-semibold">10M</span>
              <span className="bg-[#E6F4EA] text-[#137333] px-1.5 py-0.5 rounded-full text-[9px] font-bold">↑ 1.25%</span>
            </div>
          </div>

          {/* Active Paying */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-[#703EFF] text-[11px] font-medium">
              <FiUsers size={13} />
              <span>Active Paying Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className=" text-sm font-semibold">80%</span>
              <span className="bg-[#E6F4EA] text-[#137333] px-1.5 py-0.5 rounded-full text-[9px] font-bold">↑ 1.25%</span>
            </div>
          </div>

          {/* Defaulters */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-[#A3AED0] text-[11px] font-medium">
              <FiAlertTriangle size={13} />
              <span>Defaulters</span>
            </div>
            <div className="flex items-center gap-2">
              <span className=" text-sm font-semibold">20%</span>
              <span className="bg-[#E6F4EA] text-[#137333] px-1.5 py-0.5 rounded-full text-[9px] font-bold">↑ 1.25%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Canvas Rendering Area */}
      <div className="h-[280px] w-full mt-2">
        <Line data={chartData} options={chartOptions} />
      </div>

    </div>
  );
}