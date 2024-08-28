"use client";

import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { VehicleData } from "@/types";
import { formatTimestamp } from "@/utils/dataUtils";
import {
  accentGreen,
  darkGray,
  mustardYellow,
  primaryBlue,
  purple,
  salmon,
} from "@/utils/colors";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  TooltipItem,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

interface LineChartProps {
  vehicleData?: VehicleData[];
  labels?: string[];
  datasets?: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

// export const LineChart: React.FC<LineChartProps> = ({
//   vehicleData = [],
//   labels,
//   datasets,
//   title,
//   xAxisLabel,
//   yAxisLabel,
// }) => {
//   const formattedTimestamps =
//     vehicleData.length > 0
//       ? vehicleData.map((vehicle) => formatTimestamp(vehicle.timestamp))
//       : [];

//   const data = {
//     labels: labels || formattedTimestamps,
//     datasets: datasets || [
//       {
//         label: "Total Axles",
//         data: vehicleData.map((vehicle) => vehicle.axles),
//         borderColor: "#005ABB",
//         backgroundColor: "#005ABB",
//         fill: false,
//       },
//       {
//         label: "Total Height",
//         data: vehicleData.map((vehicle) => vehicle.height),
//         borderColor: "#66BB6A",
//         backgroundColor: "#66BB6A",
//         fill: false,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       title: {
//         display: !!title,
//         text: title || "Chart Title",
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: !!xAxisLabel,
//           text: xAxisLabel || "X Axis",
//         },
//       },
//       y: {
//         title: {
//           display: !!yAxisLabel,
//           text: yAxisLabel || "Y Axis",
//         },
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// };

// interface StackedBarChartProps {
//   vehicleData?: VehicleData[];
//   labels?: string[];
//   datasets?: {
//     label: string;
//     data: number[];
//     backgroundColor: string;
//   }[];
//   title?: string;
//   xAxisLabel?: string;
//   yAxisLabel?: string;
// }

// export const StackedBarChart: React.FC<StackedBarChartProps> = ({
//   vehicleData = [],
//   labels,
//   datasets,
//   title,
//   xAxisLabel,
//   yAxisLabel,
// }) => {
//   const formattedTimestamps =
//     vehicleData.length > 0
//       ? vehicleData.map((vehicle) => formatTimestamp(vehicle.timestamp))
//       : [];

//   const data = {
//     labels: labels || formattedTimestamps,
//     datasets: datasets || [
//       {
//         label: "Car Frequency",
//         data: vehicleData.map((vehicle) =>
//           vehicle.classification === "car" ? 1 : 0
//         ),
//         backgroundColor: primaryBlue,
//       },
//       {
//         label: "Truck Frequency",
//         data: vehicleData.map((vehicle) =>
//           vehicle.classification === "truck" ? 1 : 0
//         ),
//         backgroundColor: mustardYellow,
//       },
//       {
//         label: "Bike Frequency",
//         data: vehicleData.map((vehicle) =>
//           vehicle.classification === "bike" ? 1 : 0
//         ),
//         backgroundColor: accentGreen,
//       },
//       {
//         label: "Van Frequency",
//         data: vehicleData.map((vehicle) =>
//           vehicle.classification === "van" ? 1 : 0
//         ),
//         backgroundColor: purple,
//       },
//       {
//         label: "Bus Frequency",
//         data: vehicleData.map((vehicle) =>
//           vehicle.classification === "bus" ? 1 : 0
//         ),
//         backgroundColor: salmon,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       title: {
//         display: !!title,
//         text: title || "Daily Vehicle Transactions by Classification",
//       },
//       legend: {
//         position: "top" as const,
//       },
//     },
//     scales: {
//       x: {
//         stacked: true,
//         title: {
//           display: !!xAxisLabel,
//           text: xAxisLabel || "Date",
//         },
//       },
//       y: {
//         stacked: true,
//         title: {
//           display: !!yAxisLabel,
//           text: yAxisLabel || "Total Vehicles",
//         },
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// };

interface PieChartProps {
  vehicleData: VehicleData[];
}

export const PieChart: React.FC<PieChartProps> = ({ vehicleData }) => {
  const classificationCounts = vehicleData.reduce(
    (acc, vehicle) => {
      acc[vehicle.classification] = (acc[vehicle.classification] || 0) + 1;
      return acc;
    },
    {
      car: 0,
      truck: 0,
      bike: 0,
      van: 0,
      bus: 0,
    }
  );

  const colorArray = [primaryBlue, mustardYellow, accentGreen, purple, salmon];

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
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          padding: 8,
          font: {
            size: 14,
          },
        },
        padding: 80,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            const label = context.label || "";
            const value = context.raw !== undefined ? context.raw : 0;
            const friendlyDate = moment(
              vehicleData[context.dataIndex].timestamp
            ).format("MM/DD/YYYY - h:mm A");
            return `${label}: ${value} (Date: ${friendlyDate})`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};
