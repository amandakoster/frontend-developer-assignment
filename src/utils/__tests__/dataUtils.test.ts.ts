import moment from "moment";

import { VehicleData } from "@/types";
import {
  reduceVehicleData,
  formatTimestamp,
  getUniqueDates,
  processClassificationFrequency,
} from "@/utils/dataUtils";
import { mockVehicleData } from "@/mockData/mockVehicleData";

describe("reduceVehicleData", () => {
  it("should correctly count the classifications", () => {
    const result = reduceVehicleData(mockVehicleData, "classification");

    expect(result).toEqual({
      bike: 8,
      car: 8,
      truck: 8,
    });
  });

  it("should correctly count the axles", () => {
    const result = reduceVehicleData(mockVehicleData, "axles");

    expect(result).toEqual({
      "2": 13,
      "3": 2,
      "4": 1,
      "6": 3,
      "7": 2,
      "8": 2,
      "9": 1,
    });
  });

  it("should correctly count the heights", () => {
    const result = reduceVehicleData(mockVehicleData, "height");

    expect(result).toEqual({
      "40": 1,
      "41": 1,
      "42": 4,
      "44": 1,
      "45": 1,
      "55": 1,
      "56": 1,
      "57": 2,
      "58": 2,
      "59": 1,
      "60": 1,
      "152": 2,
      "154": 1,
      "155": 1,
      "160": 1,
      "165": 1,
      "170": 1,
      "180": 1,
    });
  });
});

describe("formatTimestamp", () => {
  it("should format a valid UTC timestamp correctly", () => {
    const timestamp = "2024-08-30T12:00:00Z";
    const expected = moment.utc(timestamp).local().format("MM/DD/YY");
    expect(formatTimestamp(timestamp)).toBe(expected);
  });

  it("should handle an invalid timestamp", () => {
    const invalidTimestamp = "invalid-date";
    console.error = jest.fn(); // Mock console.error to suppress actual logging
    expect(formatTimestamp(invalidTimestamp)).toBe("Invalid Date");
    expect(console.error).toHaveBeenCalledWith(
      `Invalid Date encountered: ${invalidTimestamp}`
    );
  });
});

describe("getUniqueDates", () => {
  it("should return unique dates from vehicle data", () => {
    const vehicleData = [
      { timestamp: "2024-08-30T12:00:00Z" },
      { timestamp: "2024-08-30T15:00:00Z" },
      { timestamp: "2024-08-31T12:00:00Z" },
    ];

    expect(getUniqueDates(vehicleData as VehicleData[])).toEqual([
      "08/30/24",
      "08/31/24",
    ]);
  });

  it("should return an empty array for an empty input array", () => {
    expect(getUniqueDates([])).toEqual([]);
  });
});

describe("processClassificationFrequency", () => {
  it("should return datasets with correct classification frequencies", () => {
    const vehicleData = [
      { timestamp: "2024-08-30T12:00:00Z", classification: "Car" },
      { timestamp: "2024-08-30T15:00:00Z", classification: "Truck" },
      { timestamp: "2024-08-31T12:00:00Z", classification: "Car" },
    ];
    const result = processClassificationFrequency(vehicleData as VehicleData[]);

    expect(result.datasets).toHaveLength(5);
    expect(result.datasets[0].label).toBe("Car Frequency");
  });

  it("should handle empty vehicle data array", () => {
    const result = processClassificationFrequency([]);
    expect(result.labels).toEqual([]);
    expect(result.datasets).toHaveLength(5);
    result.datasets.forEach((dataset) => {
      expect(dataset.data).toEqual([]);
    });
  });
});
