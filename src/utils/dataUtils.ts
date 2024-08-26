import { VehicleData } from "@/types";
import { getYearColor } from "./colorUtils";

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
      const classification = vehicle.classification; // Extract classification
      const time = vehicle.timestamp.split("T")[1].split("Z")[0]; // Extract time

      if (!acc.labels.includes(time)) {
        acc.labels.push(time);
      }

      const classIndex = acc.datasets.findIndex(
        (dataset) => dataset.label === classification
      );

      if (classIndex === -1) {
        acc.datasets.push({
          label: classification,
          data: Array(acc.labels.length).fill(0),
          borderColor: getYearColor(classification),
          fill: false,
        });
      }

      acc.datasets.forEach((dataset) => {
        if (dataset.label === classification) {
          const timeIndex = acc.labels.indexOf(time);
          dataset.data[timeIndex] = vehicle.axles;
        }
      });

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
