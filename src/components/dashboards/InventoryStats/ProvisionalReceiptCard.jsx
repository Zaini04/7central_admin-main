import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: {
      grid: { display: false, drawBorder: false },
      ticks: { color: '#5F6368', font: { size: 10, weight: '500' } }
    },
    y: { display: false }
  }
};

export default function ProvisionalReceiptsCard() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      data: [35, 15, 25, 35, 15, 25, 35],
      // Dynamic color check: alternate indexing to match active vs passive heights
      backgroundColor: [
        '#E06666', // Jan - Active
        '#FCE4D6', // Feb - Light Tint
        '#FCE4D6', // Mar - Light Tint
        '#E06666', // Apr - Active
        '#FCE4D6', // May - Light Tint
        '#FCE4D6', // Jun - Light Tint
        '#E06666'  // Jul - Active
      ],
      borderRadius: 6, // Pill-shape rounded caps
      borderSkipped: false,
      barPercentage: 0.45 // Clean sleek width spacing
    }]
  };

  return (
    <div className="w-full h-full flex flex-col justify-between rounded-lg bg-white ">
      <span className="text-[#626C70] text-xs font-medium">Provisional Receipts Issued</span>
      
      <div className="h-[160px] w-full mt-auto">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}