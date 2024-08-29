import React from "react";
import { Doughnut, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
  PointElement,
  TooltipItem,
} from "chart.js";
import { VehicleData } from "@/types";
import {
  primaryBlue,
  green,
  yellowGreen,
  blueYellow,
  yellow,
} from "@/utils/colors";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
  PointElement
);

export const colorArray = [primaryBlue, yellowGreen, green, yellow, blueYellow];

interface DoughnutChartProps {
  vehicleData: VehicleData[];
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  vehicleData,
}) => {
  const classificationCounts = vehicleData.reduce(
    (acc, vehicle) => {
      acc[vehicle.classification] = (acc[vehicle.classification] || 0) + 1;
      return acc;
    },
    { car: 0, truck: 0, bike: 0, van: 0, bus: 0 }
  );

  const data = {
    labels: ["Car", "Truck", "Bike", "Van", "Bus"],
    datasets: [
      {
        data: [
          classificationCounts.car,
          classificationCounts.truck,
          classificationCounts.bike,
          classificationCounts.van,
          classificationCounts.bus,
        ],
        backgroundColor: colorArray,
        borderColor: colorArray,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevents chart from auto-resizing
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-[400px] h-[400px]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

interface ScatterChartProps {
  vehicleData: VehicleData[];
}

export const ScatterChart: React.FC<ScatterChartProps> = ({ vehicleData }) => {
  const data = {
    datasets: vehicleData.map((vehicle) => ({
      label: vehicle.classification,
      data: [{ x: vehicle.axles, y: vehicle.height }],
      backgroundColor:
        vehicle.classification === "car"
          ? primaryBlue
          : vehicle.classification === "truck"
          ? yellowGreen
          : vehicle.classification === "bike"
          ? green
          : vehicle.classification === "van"
          ? yellow
          : blueYellow,
    })),
  };

  const options = {
    scales: {
      x: {
        type: "linear" as const,
        position: "bottom" as const,
        title: {
          display: true,
          text: "Axles",
        },
      },
      y: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Height (inches)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"scatter">) {
            const classification = context.dataset.label;
            const xValue = (context.raw as { x: number }).x;
            const yValue = (context.raw as { y: number }).y;
            return `${classification}: ${xValue} axles, ${yValue} inches`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-[400px] h-[400px]">
      <Scatter data={data} options={options} />
    </div>
  );
};
