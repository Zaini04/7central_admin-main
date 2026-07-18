import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FiChevronDown } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { display: false }, 
    tooltip: { enabled: true } 
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false, // Vertical lines ko hide kiya
        drawBorder: false
      },
      ticks: {
        color: '#D1D5DB', // Faint gray text jaise image me hai
        font: {
          size: 10,
          family: 'sans-serif'
        },
        // Har data point par text na dikhe, sirf smooth labels dikhane k liye:
        callback: function(val, index) {
          const labels = {
            0: 'November 01',
            8: 'November 10',
            16: 'November 20',
            24: 'November 30'
          };
          return labels[index] || '';
        },
        maxRotation: 0,
        autoSkip: false
      }
    },
    y: {
      display: true,
      min: 0,
      max: 50, // Map dynamic high numbers safely
      grid: {
        color: '#F3F4F6', // Horizontal light dashed or faint grid lines
        borderDash: [5, 5],
        drawBorder: false
      },
      ticks: {
        color: '#D1D5DB',
        font: {
          size: 10,
          family: 'sans-serif'
        },
        // Image k numbers ko logic me adjust kiya: 0->00, 10->100, 20->500, 30->1K, 40->10K, 50->50K
        callback: function(value) {
          const yMapping = {
            0: '00',
            10: '100',
            20: '500',
            30: '1K',
            40: '10K',
            50: '50K'
          };
          return yMapping[value] !== undefined ? yMapping[value] : '';
        },
        stepSize: 10
      }
    }
  },
  elements: {
    point: { radius: 0 },
    line: { borderWidth: 3 }
  }
};

export default function AllLeadsCard() {
  // Line values mapping matching perfectly to custom Y bounds
  const lineData = {
    labels: Array(25).fill(''),
    datasets: [{
      data: [42, 40, 32, 22, 28, 36, 30, 22, 16, 12, 14, 16, 18, 25, 34, 32, 28, 20, 32, 38, 34, 28, 30, 36, 26],
      borderColor: '#0E5FD9', 
      backgroundColor: 'rgba(14, 95, 217, 0.06)', // Smooth matching background gradient
      fill: true,
      tension: 0.4, 
    }]
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg h-full flex flex-col justify-between ">
      <div className="flex justify-between items-center">
        <span className='text-[#626C70] text-xs font-medium'>ALL LEADS</span>
        <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1 rounded-md text-xs cursor-pointer">
          <span>This Month</span>
          <FiChevronDown />
        </div>
      </div>
      
      {/* Chart wrapper adjusts to display accurate axes labels */}
      <div className="h-[230px] w-full mt-auto">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}