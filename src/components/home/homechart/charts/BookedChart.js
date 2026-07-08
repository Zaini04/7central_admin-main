import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const BookedChart = ({inventoryDashboard}) => {

console.log(' this is a inventoryDashboard',inventoryDashboard?.buckets)
  const apiBuckets = inventoryDashboard?.buckets ?? [];


  const chartData = apiBuckets.map((item) => item.totalSold); 

  const chartLabels = apiBuckets.map((item) =>
    moment(`${item.year}-${item.month}-01`).format("MMM")
  );


  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Pending Receipts',
        data: chartData,
        fill: true,


        backgroundColor: (context) => {
  const chart = context.chart;
  const { ctx, chartArea } = chart;
  if (!chartArea) return null;
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, 'rgba(52, 211, 153, 0)');    // #34d399 with 0 alpha
  gradient.addColorStop(0.5, 'rgba(52, 211, 153, 0.5)'); // 50% alpha
  gradient.addColorStop(1, 'rgba(52, 211, 153, 0.7)');   // 70% alpha
  return gradient;
},
borderColor: '#34d399',
pointBackgroundColor: '#fff',
pointBorderColor: '#34d399',

       
        tension: 0.4,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#34d399',
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#10b981',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          title: (context) => context[0].formattedValue,
          label: () => null,
        },
        yAlign: 'bottom',
        caretPadding: 10,
        caretSize: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#374151',
          font: { size: 14, weight: 'bold' },
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax:
          Math.max(...chartData) === 0
            ? 10
            : Math.pow(10, Math.floor(Math.log10(Math.max(...chartData)))) *
              Math.ceil(Math.max(...chartData) / Math.pow(10, Math.floor(Math.log10(Math.max(...chartData))))) *
              1.2,
        ticks: {
          stepSize: Math.ceil(Math.max(...chartData) / 5) || 1,
          callback: (value) => {
            if (value === 0) return '';
            if (value >= 1000000) return (value / 1000000).toFixed(1).replace('.0', '') + 'M';
            if (value >= 1000) return (value / 1000).toFixed(1).replace('.0', '') + 'k';
            return value;
          },
          color: '#9ca3af',
        },
        grid: {
          color: '#e5e7eb',
          borderDash: [5, 5],
        },
      },
    },
    elements: {
      line: { borderWidth: 2 },
    },
  };

  return (
    <div className="w-full h-[250px] lg:h-[290px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default BookedChart;
