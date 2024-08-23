import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary chart types and components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
  options?: ChartOptions<"bar">;
}

const BarChart: React.FC<BarChartProps> = ({
  labels,
  data,
  backgroundColor,
  options,
}) => {
  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Data",
        data,
        backgroundColor: backgroundColor || ["#0073E6", "#004B8D", "#66BB6A"],
      },
    ],
  };

  return <Bar data={chartData} options={options} />;
};

interface PieChartProps {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
  options?: ChartOptions<"pie">;
}

const PieChart: React.FC<PieChartProps> = ({
  labels,
  data,
  backgroundColor,
  options,
}) => {
  const chartData: ChartData<"pie"> = {
    labels,
    datasets: [
      {
        label: "Data",
        data,
        backgroundColor: backgroundColor || ["#0073E6", "#004B8D", "#66BB6A"],
      },
    ],
  };

  return <Pie data={chartData} options={options} />;
};

interface LineChartProps {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
  options?: ChartOptions<"line">;
}

const LineChart: React.FC<LineChartProps> = ({
  labels,
  data,
  backgroundColor,
  options,
}) => {
  const chartData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Data",
        data,
        backgroundColor: backgroundColor || ["#0073E6", "#004B8D", "#66BB6A"],
      },
    ],
  };

  return <Line data={chartData} options={options} />;
};

export { BarChart, PieChart, LineChart };
