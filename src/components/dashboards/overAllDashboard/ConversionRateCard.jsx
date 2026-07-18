import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FiArrowUpRight } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const sparklineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  scales: { x: { display: false }, y: { display: false } },
};

export default function ConversionRateCard() {
  const data = {
    labels: ['', '', '', '', '', ''],
    datasets: [{
      data: [15, 30, 65, 55, 35, 45],
      backgroundColor: '#FFD596', 
      borderRadius: 4,
      barPercentage: 0.6
    }]
  };

  return (
    <div className="w-full h-[200px] p-4 bg-white rounded-lg shadow-sm border border-gray-100  flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className='text-[#626C70] text-xs font-medium'>CONVERSION RATE</span>
          <span className="text-emerald-500 flex items-center gap-0.5 text-[11px] font-medium">
            <FiArrowUpRight className="stroke-[3]" /> 3.5% Increase
          </span>
        </div>
        <div className="text-lg font-semibold mt-1">9.73%</div>
      </div>
      <div className="h-[100px] w-full mt-auto">
        <Bar data={data} options={sparklineOptions} />
      </div>
    </div>
  );
}