import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FiArrowUpRight, FiUsers } from 'react-icons/fi'; // Icon placeholder for the center

ChartJS.register(ArcElement, Tooltip);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '78%', // Inner hollow width
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
};

export default function InventoryBreakdownCard() {
  const chartData = {
    labels: ['Vacant', 'On Hold'],
    datasets: [{
      data: [12, 24],
      backgroundColor: ['#FFAA33', '#703EFF'], // Orange and Purple matching the image
      borderWidth: 0,
    }]
  };

  return (
    <div className="w-full h-full flex flex-col justify-between rounded-lg">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-2">
          <span className="text-[#626C70] text-xs font-medium">Inventory Breakdown</span>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold">36K</span>
            <div className="flex items-center gap-0.5 bg-[#E6F4EA] text-[#137333] px-1.5 py-0.5 rounded-full text-[11px] font-medium">
              <span>↑</span>
              <span>+17%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Split: Text List on Left, Chart on Right */}
      <div className="flex flex-row items-center justify-between mt-auto h-[100px]">
        {/* Custom Legend */}
        <div className="flex flex-col gap-3 text-xs text-[#626C70]  font-normal">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFAA33]" />
            <span>Vacant : 12K</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#703EFF]" />
            <span>On Hold : 24K</span>
          </div>
        </div>

        {/* Doughnut Wrapper with Center Absolute Icon */}
        <div className="relative w-[110px] h-[110px]">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex items-center justify-center text-[#0F2D3A]">
            <FiUsers size={20} className="opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
}