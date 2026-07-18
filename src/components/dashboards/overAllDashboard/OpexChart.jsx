import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const opexOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      alignment: 'end',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 8,
        boxHeight: 8,
        font: { size: 11, weight: '500' },
        color: '#1F2937'
      }
    },
    tooltip: { enabled: true }
  },
  scales: {
    x: {
      stacked: true, // Multi-layer stacking enabled
      grid: { display: false },
      ticks: { color: '#8A94A6', font: { size: 10 } }
    },
    y: {
      stacked: true,
      min: 0,
      max: 100,
      grid: { color: '#F3F4F6', drawBorder: false },
      ticks: { color: '#8A94A6', font: { size: 10 }, stepSize: 20 }
    }
  }
};

export default function OpexChart() {
  const data = {
    labels: ['03.24', '03.25', '03.26', '03.27', '03.28', '03.29', '03.30', '03.31', '03.01'],
    datasets: [
      {
        label: 'Temp',
        data: [16, 15, 10, 24, 46, 10, 15, 31, 10],
        backgroundColor: '#FF7676', // Light Red
        borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10 },
        borderSkipped: false,
        barPercentage: 0.25 // Thin sleek columns
      },
      {
        label: 'Wet',
        data: [65, 18, 28, 7, 12, 12, 40, 10, 12],
        backgroundColor: '#4AD3C4', // Cyan/Teal
        borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10 },
        borderSkipped: false,
        barPercentage: 0.25
      },
      {
        label: 'Door',
        data: [14, 16, 18, 7, 18, 12, 28, 12, 12],
        backgroundColor: '#0F767E', // Dark Teal
        borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10 },
        borderSkipped: false,
        barPercentage: 0.25
      }
    ]
  };

  return (
    <div className="w-full h-full flex flex-col justify-between ">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#626C70] text-xs font-medium">OPEX</span>
      </div>
      <div className="h-[220px] w-full mt-auto">
        <Bar data={data} options={opexOptions} />
      </div>
    </div>
  );
}