import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FiArrowUpRight } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const sparklineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 } },
};

export default function BounceRateCard() {
  const data = {
    labels: Array(9).fill(''),
    datasets: [{
      data: [65, 58, 70, 75, 68, 72, 58, 66, 68],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.08)',
      fill: true,
      tension: 0.3,
      borderWidth: 2
    }]
  };

  return (
    <div className="w-full h-[200px] p-5 bg-white rounded-lg shadow-sm border border-gray-100  flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className='text-[#626C70] text-xs font-medium'>BOUNCE RATE</span>
          <span className="text-emerald-500 flex items-center gap-0.5 text-[11px] font-medium">
            <FiArrowUpRight className="stroke-[3]" /> 1.1% Increase
          </span>
        </div>
        <div className="text-lg font-semibold  mt-1">81.94%</div>
      </div>
      <div className="h-[100px] w-full mt-auto">
        <Line data={data} options={sparklineOptions} />
      </div>
    </div>
  );
}