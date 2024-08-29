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
    <div style={{ width: "400px", height: "400px" }}>
      {" "}
      {/* Adjust size here */}
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
          : blueYellow, // Assign colors based on classification
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
        display: false, // We won't need a legend since the colors are obvious
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const point = context.raw;
            return `${point.classification}: ${point.x} axles, ${point.y} inches`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "400px", height: "400px" }}>
      {" "}
      {/* Adjust size here */}
      <Scatter data={data} options={options} />
    </div>
  );
};
