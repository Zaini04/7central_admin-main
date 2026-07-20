import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FiChevronDown } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function InventoryStatusCard() {
  const labels = ['RP', 'CP', 'VS', 'AP', 'Ad4'];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Primary',
        data: [6.5, 4.2, 7.8, 6.2, 4.4],
        backgroundColor: '#703EFF', // Purple bars
        borderRadius: 2,
        barPercentage: 0.35,
        categoryPercentage: 0.7,
      },
      {
        label: 'Secondary',
        data: [1.2, 0.9, 1.2, 2.5, 0.8],
        backgroundColor: '#FFAA33', // Orange bars
        borderRadius: 2,
        barPercentage: 0.35,
        categoryPercentage: 0.7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#626C70', font: { size: 11, weight: '500' } },
      },
      y: {
        grid: { display: false, drawBorder: false },
        min: 0,
        max: 10,
        ticks: {
          color: '#626C70',
          font: { size: 11, weight: '500' },
          stepSize: 2,
          callback: (value) => (value === 2 ? '' : value), // 2 hidden to replicate spacing
        },
      },
    },
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-full flex flex-col justify-between">
      {/* Header element row */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-0.5">
          <span className="text-[#626C70] text-xs font-medium">Inventory Status</span>
          <span className="text-[10px] text-[#A3AED0] tracking-wide">
            Residential Plots, Commercial Plots, Villas, Apartments.
          </span>
        </div>

        {/* Dropdown Selector pill */}
        <button className="flex items-center gap-1.5 px-2 py-1 border border-gray-100 rounded-md text-[10px] font-medium text-[#626C70] hover:bg-gray-50">
          <span>Monthly</span>
          <FiChevronDown size={12} />
        </button>
      </div>

      {/* Main Aggregations metrics layer */}
      <div className="flex flex-col gap-1 mt-3">
        <div className="flex items-baseline gap-1">
          <span className="text-gray-900 text-lg font-semibold">20,245</span>
          <span className="text-xs text-[#A3AED0] font-medium">.500</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="bg-[#E6F4EA] text-[#137333] px-1.5 py-0.5 rounded-full font-bold">
            ↑12%
          </span>
          <span className="text-[#A3AED0]">vs last years</span>
        </div>
      </div>

      {/* Chart engine with absolute underlying background boxes */}
      <div className="relative h-[180px] w-full mt-4">
        {/* Underlying Highlight Blocks for CP and AP slots matching the chart grid space */}
        <div className="absolute inset-x-0 top-0 bottom-[24px] flex pointer-events-none z-0 pl-[28px]">
          <div className="w-1/5 h-full" /> {/* RP Empty */}
          <div className="w-1/5 h-full px-1">
            <div className="w-full h-full bg-[#703EFF]/[0.03] rounded-t-md" /> {/* CP Highlight */}
          </div>
          <div className="w-1/5 h-full" /> {/* VS Empty */}
          <div className="w-1/5 h-full px-1">
            <div className="w-full h-full bg-[#703EFF]/[0.03] rounded-t-md" /> {/* AP Highlight */}
          </div>
          <div className="w-1/5 h-full" /> {/* Ad4 Empty */}
        </div>

        {/* Chart Instance layer */}
        <div className="relative z-10 w-full h-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}