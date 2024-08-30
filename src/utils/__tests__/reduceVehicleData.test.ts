import { reduceVehicleData } from "../dataUtils";
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
