import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: {
      grid: { display: false, drawBorder: false },
      ticks: { color: '#5F6368', font: { size: 11, weight: '500' } }
    },
    y: { display: false } // Hidden vertical scale to match image
  }
};

export default function CustomerOnboardingCard() {
  const chartData = {
    labels: ['03', '04', '05', '06', '07'],
    datasets: [{
      data: [35, 20, 28, 55, 38],
      borderColor: '#703EFF', // Bright purple line
      backgroundColor: 'rgba(112, 62, 255, 0.05)', // Super faint purple bottom fade
      fill: true,
      tension: 0, // Linear joints matching image points
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#703EFF',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  return (
    <div className="w-full h-full flex flex-col justify-between rounded-lg bg-white">
      <span className="text-[#626C70] text-xs font-medium">New Customer Onboarding</span>
      
      <div className="h-[160px] w-full mt-auto">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}