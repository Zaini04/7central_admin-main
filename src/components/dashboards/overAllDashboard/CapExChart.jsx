import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FiMoreHorizontal } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const capexOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#8A94A6', font: { size: 10 } }
    },
    yLeft: {
      type: 'linear',
      position: 'left',
      min: -5,
      max: 30,
      grid: { color: '#F3F4F6', drawBorder: false },
      ticks: { color: '#8A94A6', font: { size: 10 }, stepSize: 5 }
    },
    yRight: {
      type: 'linear',
      position: 'right',
      min: 49,
      max: 56,
      grid: { display: false }, // Avoid grid overlap clash
      ticks: { color: '#0F767E', font: { size: 10 }, stepSize: 1 }
    }
  },
  elements: { point: { radius: 0 } }
};

export default function CapexChart() {
  const data = {
    labels: ['2022.01', '', '', '', '', '2022.02', '', '', '', '', '2022.03'],
    datasets: [
      {
        yAxisID: 'yLeft',
        data: [15, 10, 8, 12, 17, 19, 16, 11, 15, 27, 23, 14],
        borderColor: '#FF7676',
        backgroundColor: 'rgba(255, 118, 118, 0.06)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      },
      {
        yAxisID: 'yRight',
        data: [50, 52.5, 53, 51.5, 50.5, 52, 53.5, 52.5, 52, 54, 55, 53],
        borderColor: '#4AD3C4',
        backgroundColor: 'rgba(74, 211, 196, 0.05)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="w-full h-full flex flex-col justify-between ">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[#626C70] text-xs font-medium">CapEx</span>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors">
          <FiMoreHorizontal size={18} />
        </button>
      </div>
      <div className="h-[220px] w-full mt-auto">
        <Line data={data} options={capexOptions} />
      </div>
    </div>
  );
}