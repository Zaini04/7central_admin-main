import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({statsDashboard}) => {
  const data = {
    labels: ["Total Paid", "Total Overdue", "Total Unpaid"],
    datasets: [
      {
        label: "Receipts",
data: [
  statsDashboard?.installments?.paid?.amount,
  statsDashboard?.installments?.overdue?.amount,
  statsDashboard?.installments?.unpaid?.amount
],
        backgroundColor: ["#2D3748", "#2B7F75", "#E4E9F1"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
  };

  return (
    <div

    className=" w-full"
      style={{
        position: "relative",
        height: "250px",
        zIndex:5,
      }}
    >
      {/* Doughnut chart */}
      <Doughnut data={data} options={options} />

      {/* Center label overlay */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          boxShadow: "0px 14px 64px -10px rgba(0, 0, 0, 0.25)",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "50%",
          width: "120px",
          height: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: -10, // ✅ Make sure this is ABOVE the chart
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>{statsDashboard?.installments?.totalInstallmentsAmount}</div>
        <div style={{ fontSize: "12px", color: "#6B7280" }}>Installments</div>
      </div>
    </div>
  );
};

export default DoughnutChart;
