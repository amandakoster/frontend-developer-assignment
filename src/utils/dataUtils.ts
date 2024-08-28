import moment from "moment";
import { VehicleData, Classification } from "@/types";
import {
  accentGreen,
  mustardYellow,
  primaryBlue,
  purple,
  salmon,
} from "./colors";

// Formats UTC timestamp to friendly label format using Moment.js
export const formatTimestamp = (timestamp: string): string => {
  const parsedMoment = moment.utc(timestamp);
  if (!parsedMoment.isValid()) {
    console.error(`Invalid Date encountered: ${timestamp}`);
    return "Invalid Date";
  }
  return parsedMoment.local().format("MM/DD/YY");
};

// Returns an array of unique dates from the vehicle data.
const getUniqueDates = (vehicleData: VehicleData[]): string[] => {
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
      backgroundColor: mustardYellow,
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
      backgroundColor: accentGreen,
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
      backgroundColor: "#800080", // Purple color for van
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
      backgroundColor: "#FF6347", // Tomato color for bus
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
      borderColor: accentGreen,
      backgroundColor: accentGreen,
    },
  ];

  return { labels, datasets };
};
