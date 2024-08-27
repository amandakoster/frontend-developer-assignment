import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

import { primaryBlue, accentGreen, mustardYellow } from "@/utils/colors";
import { formatTimestamp } from "@/utils/dataUtils";
import { mockVehicleData } from "@/mockData/mockVehicleData";

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
  Filler,
} from "chart.js";
import moment from "moment";

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
  Legend,
  Filler // Registering Filler plugin
);

const formattedTimestamps = mockVehicleData.map((vehicle) =>
  formatTimestamp(vehicle.timestamp)
);

interface BarChartProps {
  labels?: string[];
  data: number[];
  backgroundColor?: string[];
  options?: ChartOptions<"bar">;
}

const BarChart: React.FC<BarChartProps> = ({
  labels = formattedTimestamps,
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
  labels?: string[];
  data: number[];
  backgroundColor?: string[];
  options?: ChartOptions<"pie">;
}

const PieChart: React.FC<PieChartProps> = ({
  labels = formattedTimestamps,
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
  labels?: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
  }[];
  options?: ChartOptions<"line">;
}

const LineChart: React.FC<LineChartProps> = ({
  labels = formattedTimestamps,
  datasets,
  options,
}) => {
  const chartData: ChartData<"line"> = {
    labels,
    datasets,
  };

  const defaultOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Axles over Time by Classification",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Axles",
        },
      },
    },
  };

  return <Line data={chartData} options={{ ...defaultOptions, ...options }} />;
};

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  labels,
  datasets,
  options,
}) => {
  const chartData: ChartData<"bar"> = {
    labels, // Use raw dates or strings
    datasets: datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: Array.isArray(dataset.backgroundColor)
        ? dataset.backgroundColor
        : [dataset.backgroundColor],
    })),
  };

  const defaultOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Daily Vehicle Transactions by Classification and Axles",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "MM/dd/yyyy - h:mm a",
          displayFormats: {
            day: "MM/dd/yyyy",
          },
        },
        adapters: {
          date: {
            locale: enUS, // Set the locale for date formatting
          },
        },
        stacked: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Total Axles",
        },
      },
    },
  };

  return <Bar data={chartData} options={{ ...defaultOptions, ...options }} />;
};

export { BarChart, PieChart, LineChart, StackedBarChart };
