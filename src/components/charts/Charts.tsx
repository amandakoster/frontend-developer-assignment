import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

import { primaryBlue, accentGreen, mustardYellow } from "@/utils/colors";

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
        label: "",
        data,
        backgroundColor: backgroundColor || [
          primaryBlue,
          mustardYellow,
          accentGreen,
        ],
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    ...options,
    plugins: {
      legend: {
        display: false,
      },
      ...options?.plugins,
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
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
        backgroundColor: backgroundColor || [
          primaryBlue,
          mustardYellow,
          accentGreen,
        ],
      },
    ],
  };

  return <Pie data={chartData} options={options} />;
};

interface LineChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
  }[];
  options?: ChartOptions<"line">;
}

const LineChart: React.FC<LineChartProps> = ({ labels, datasets, options }) => {
  const chartData: ChartData<"line"> = {
    labels,
    datasets,
  };

  return <Line data={chartData} options={options} />;
};

export { BarChart, PieChart, LineChart };
