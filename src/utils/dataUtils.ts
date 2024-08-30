import moment from "moment";

import { VehicleData, Classification } from "@/types";
import { blueYellow, green, primaryBlue, yellow, yellowGreen } from "./colors";

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

export const formatTimestamp = (timestamp: string): string => {
  const parsedMoment = moment(timestamp, moment.ISO_8601, true);
  if (!parsedMoment.isValid()) {
    console.error(`Invalid Date encountered: ${timestamp}`);
    return "Invalid Date";
  }

  return parsedMoment.local().format("MM/DD/YY");
};

// Returns an array of unique dates from the vehicle data.
export const getUniqueDates = (vehicleData: VehicleData[]): string[] => {
  return vehicleData
    .map((data) => formatTimestamp(data.timestamp))
    .filter((value, index, array) => array.indexOf(value) === index);
};

// Process frequency of classification per day
export const processClassificationFrequency = (vehicleData: VehicleData[]) => {
  const uniqueDates = getUniqueDates(vehicleData);

  const datasets = [
    {
      label: "Car Frequency",
      data: uniqueDates.map(
        (date) =>
          vehicleData.filter(
            (data) =>
              formatTimestamp(data.timestamp) === date &&
              data.classification === Classification.Car
          ).length
      ),
      backgroundColor: primaryBlue,
    },
    {
      label: "Truck Frequency",
      data: uniqueDates.map(
        (date) =>
          vehicleData.filter(
            (data) =>
              formatTimestamp(data.timestamp) === date &&
              data.classification === Classification.Truck
          ).length
      ),
      backgroundColor: yellowGreen,
    },
    {
      label: "Bike Frequency",
      data: uniqueDates.map(
        (date) =>
          vehicleData.filter(
            (data) =>
              formatTimestamp(data.timestamp) === date &&
              data.classification === Classification.Bike
          ).length
      ),
      backgroundColor: green,
    },
    {
      label: "Van Frequency",
      data: uniqueDates.map(
        (date) =>
          vehicleData.filter(
            (data) =>
              formatTimestamp(data.timestamp) === date &&
              data.classification === Classification.Van
          ).length
      ),
      backgroundColor: yellow,
    },
    {
      label: "Bus Frequency",
      data: uniqueDates.map(
        (date) =>
          vehicleData.filter(
            (data) =>
              formatTimestamp(data.timestamp) === date &&
              data.classification === Classification.Bus
          ).length
      ),
      backgroundColor: blueYellow,
    },
  ];

  return { labels: uniqueDates, datasets };
};
// Process axles and height over time
export const processAxlesAndHeight = (vehicleData: VehicleData[]) => {
  const labels = getUniqueDates(vehicleData);

  const datasets = [
    {
      label: "Total Axles",
      data: labels.map((label) =>
        vehicleData
          .filter((data) => formatTimestamp(data.timestamp) === label)
          .reduce((acc, cur) => acc + cur.axles, 0)
      ),
      borderColor: primaryBlue,
      backgroundColor: primaryBlue,
    },
    {
      label: "Total Height",
      data: labels.map((label) =>
        vehicleData
          .filter((data) => formatTimestamp(data.timestamp) === label)
          .reduce((acc, cur) => acc + cur.height, 0)
      ),
      borderColor: green,
      backgroundColor: green,
    },
  ];

  return { labels, datasets };
};
