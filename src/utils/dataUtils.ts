import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import moment from "moment";

import { VehicleData } from "@/types";
import { accentGreen, mustardYellow, primaryBlue } from "./colors";

dayjs.extend(utc);

export function formatTimestamp(timestamp: string): string {
  return dayjs.utc(timestamp).format("MM/DD/YY - h:mm A");
}

export function reduceVehicleData<T extends keyof VehicleData>(
  data: VehicleData[],
  property: T
): Record<string, number> {
  return data.reduce((acc, item) => {
    const key = String(item[property]);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export function reduceTimestampData(data: VehicleData[]): {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
  }[];
} {
  return data.reduce(
    (acc, vehicle) => {
      const classification = vehicle.classification;
      const time = vehicle.timestamp; // Keep the full timestamp

      if (!acc.labels.includes(time)) {
        acc.labels.push(time);
      }

      const colorMap = {
        car: primaryBlue,
        truck: mustardYellow,
        bike: accentGreen,
      };

      let dataset = acc.datasets.find(
        (dataset) => dataset.label === classification
      );

      if (!dataset) {
        dataset = {
          label: classification,
          data: Array(acc.labels.length).fill(0),
          borderColor: colorMap[classification],
          fill: false,
        };
        acc.datasets.push(dataset);
      }

      const timeIndex = acc.labels.indexOf(time);
      dataset.data[timeIndex] = vehicle.axles;

      return acc;
    },
    {
      labels: [] as string[],
      datasets: [] as {
        label: string;
        data: number[];
        borderColor: string;
        fill: boolean;
      }[],
    }
  );
}

export function formatTimestampRegex(timestamp: string): string {
  return new Date(timestamp)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "")
    .replace(/-/g, "/")
    .replace(/:\d\d$/, "");
}

export const formatTimestampMoment = (timestamp: string): string => {
  const parsedMoment = moment.utc(timestamp);
  if (!parsedMoment.isValid()) {
    console.error(`Invalid Date encountered: ${timestamp}`);
    return "Invalid Date";
  }
  return parsedMoment.local().format("MM/DD/YY - h:mm A");
};
