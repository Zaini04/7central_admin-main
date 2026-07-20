import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export default function CollectionOverviewCard() {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Trend',
        data: [1.5, 4.0, 4.1, 5.2, 6.8, 6.6, 9.2, 9.0], // Mapped array nodes to match plot elevations
        borderColor: '#703EFF',
        backgroundColor: 'rgba(112, 62, 255, 0.06)', // Dynamic bottom soft transparent fade
        fill: true,
        tension: 0.4, // Perfect smooth spline bending arcs
        pointRadius: (context) => (context.dataIndex === 5 ? 6 : 0), // June point indicator marker node
        pointBackgroundColor: '#703EFF',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
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
        grid: { display: true, color: '#F4F7FE', drawBorder: false, borderDash: [3, 3] }, // Dotted vertical separators
        ticks: {
          callback: function (val, index) {
            return this.getLabelForValue(index);
          },
          font: { size: 11, weight: '500' },
          color: (context) => (context.tick && context.tick.label === 'July' ? '#703EFF' : '#A3AED0'), // Accentuated indicator text tracking color
        },
      },
      y: {
        grid: { display: false, drawBorder: false },
        min: 1,
        max: 12,
        ticks: {
          stepSize: 3,
          color: '#A3AED0',
          font: { size: 11, weight: '500' },
          callback: (value) => `${value}k`,
        },
      },
    },
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-full flex flex-col justify-between">
      {/* Section Header component meta */}
      <span className="text-[#626C70] text-xs font-medium block mb-4">Collection Overview</span>

      {/* Mini Summary Banners metrics split layout */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Banner 1: Total Collected */}
        <div className="bg-[#703EFF] text-white p-3 rounded-lg flex flex-col justify-center min-h-[70px]">
          <span className="text-white/70 text-[10px] font-medium block leading-tight">Total Collected</span>
          <span className="text-white text-lg font-semibold mt-0.5">$5.000</span>
        </div>

        {/* Banner 2: Outstanding Installments */}
        <div className="bg-white border border-gray-100 p-3 rounded-lg flex flex-col justify-center min-h-[70px]">
          <span className="text-[#A3AED0] text-[10px] font-medium block leading-tight">Outstanding Installments</span>
          <span className="text-gray-900 text-lg font-semibold mt-0.5">$3.500</span>
        </div>
      </div>

      {/* Chart core container box */}
      <div className="relative h-[180px] w-full mt-auto">
        {/* Custom Line Indicator targeting June x-axis intersection */}
        <div className="absolute top-0 bottom-[22px] left-[78.5%] w-[1px] bg-[#703EFF]/40 pointer-events-none z-0" />
        
        <div className="relative z-10 w-full h-full">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}