import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import moment from "moment";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { VehicleData } from "@/types";
import {
  primaryBlue,
  mustardYellow,
  accentGreen,
  purple,
  salmon,
  darkGray,
} from "@/utils/colors";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
    {
      car: 0,
      truck: 0,
      bike: 0,
      van: 0,
      bus: 0,
    }
  );
  const total = vehicleData.length;

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
        backgroundColor: [
          primaryBlue,
          mustardYellow,
          accentGreen,
          purple,
          salmon,
        ],
        borderColor: [primaryBlue, mustardYellow, accentGreen, purple, salmon],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          generateLabels: function (chart: any) {
            const data = chart.data;
            return data.labels!.map((label: any, i: number) => ({
              text: `${label}: ${data.datasets[0].data[i]}`,
              fillStyle: data.datasets[0].backgroundColor[i],
              strokeStyle: data.datasets[0].borderColor[i],
              lineWidth: 2,
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw !== undefined ? context.raw : 0;
            const friendlyDate = moment(
              vehicleData[context.dataIndex].timestamp
            ).format("MM/DD/YYYY - h:mm A");
            const percentage = ((value / total) * 100).toFixed(1);

            return [
              `${label}: ${value}`,
              `(${percentage}%)`,
              `Date: ${friendlyDate}`,
            ];
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};
