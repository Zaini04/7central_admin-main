import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FiChevronDown } from 'react-icons/fi';

ChartJS.register(ArcElement, Tooltip);

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%', // Doughnut hole size
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
};

export default function TotalProspectChart() {
  const doughnutData = {
    labels: ['Request a Quote', 'Career', 'Work'],
    datasets: [{
      data: [70, 20, 10], // Dummy splits
      backgroundColor: ['#1E40AF', '#F97316', '#DC2626'], // Blue, Orange, Red
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const prospects = [
    { name: 'Request a Quote', iconColor: '#1E40AF', totalUsers: '547,914', bounceRate: '81.94%' },
    { name: 'Career', iconColor: '#F97316', totalUsers: '547,914', bounceRate: '81.94%' },
    { name: 'Work', iconColor: '#DC2626', totalUsers: '547,914', bounceRate: '81.94%' }
  ];

  return (
    <div className="h-full  flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className='text-[#626C70] text-xs font-medium'>TOTAL PROSPECT</span>
          <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1 rounded-md text-xs cursor-pointer">
            <span>This Month</span>
            <FiChevronDown />
          </div>
        </div>
        <div className="h-[120px] w-full flex items-center justify-center">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          {/* Centered label can be added here with absolute positioning if needed */}
        </div>
      </div>
      
      {/* Legend / Table Area */}
      <div className="mt-4 space-y-2 text-[11px]">
        {prospects.map((prospect, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-2/3">
              <div style={{ backgroundColor: prospect.iconColor }} className="w-2.5 h-2.5 rounded-full" />
              <span className="text-[#1F2937] text-xs font-medium">{prospect.name}</span>
            </div>
            <span className="text-[#8A94A6] w-1/3 text-center">{prospect.totalUsers}</span>
            <span className="text-emerald-500 font-semibold w-1/3 text-right">{prospect.bounceRate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}