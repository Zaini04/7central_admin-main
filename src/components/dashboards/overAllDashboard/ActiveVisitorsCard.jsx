import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FiArrowUpRight } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const sparklineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  scales: { 
    x: { display: false }, 
    y: { display: false, max: 100 } // Max set kiya taake background sahi lage
  },
};

export default function ActiveVisitorsCard() {
  const data = {
    labels: ['', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        // Front main bars
        data: [30, 70, 20, 50, 40, 65, 45, 35, 25],
        backgroundColor: '#0052CC',
        borderRadius: 20,
        borderSkipped: false,
        barPercentage: 0.4, // Bars ko thin or sleek rakhne k liye
        order: 1
      },
      {
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
        backgroundColor: '#F0F5FF',
        borderRadius: 20,
        borderSkipped: false,
        barPercentage: 0.8,
        grouped: false, // Dono bars aik hi jagah overlap hongi
        order: 2,
        tooltip: { enabled: false }
      }
    ]
  };

  return (
    <div className="w-full h-[200px] p-4 bg-white rounded-lg shadow-sm border border-gray-100  flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className='text-[#626C70] text-xs font-medium'>ACTIVE VISITORS</span>
          <span className="text-emerald-500 flex items-center gap-0.5 text-[11px] font-medium">
            <FiArrowUpRight className="stroke-[3]" /> 6.7% Increase
          </span>
        </div>
        <div className="text-lg font-semibold mt-1">157,367</div>
      </div>
      {/* Chart container height flexible aur properly spaced ha */}
      <div className="h-[100px] w-full mt-auto">
        <Bar data={data} options={sparklineOptions} />
      </div>
    </div>
  );
}