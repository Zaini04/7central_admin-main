import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FiArrowDownRight } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const sparklineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 } },
};

export default function VisitorPerMinuteCard() {
  const data = {
    labels: Array(12).fill(''),
    datasets: [
      {
        data: [60, 55, 65, 62, 58, 66, 55, 68, 62, 69, 58, 48],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.06)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      },
      {
        data: [35, 20, 22, 18, 26, 20, 32, 25, 20, 34, 28, 20],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.04)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="w-full h-[200px] p-4 bg-white rounded-lg shadow-sm border border-gray-100  flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className='text-[#626C70] text-xs font-medium'>VISITOR PER MINUTE</span>
          <span className="text-red-500 flex items-center gap-0.5 text-[11px] font-medium">
            <FiArrowDownRight className="stroke-[3]" /> 13.5% decrease
          </span>
        </div>
        <div className="text-lg font-semibold  mt-1">9,741</div>
      </div>
      <div className="h-[100px] w-full mt-auto">
        <Line data={data} options={sparklineOptions} />
      </div>
    </div>
  );
}