"use client";

import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
}

const BarChart: React.FC<BarChartProps> = ({
  labels,
  data,
  backgroundColor,
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Vehicle Count",
        data: Object.values(data),
        backgroundColor: backgroundColor || ["#0073E6", "#004B8D", "#66BB6A"],
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
