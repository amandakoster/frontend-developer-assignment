import { reduceVehicleData } from "../dataUtils";
import { mockVehicleData } from "@/mockData/mockVehicleData";

describe("reduceVehicleData", () => {
  it("should correctly count the classifications", () => {
    const result = reduceVehicleData(mockVehicleData, "classification");

    expect(result).toEqual({
      bike: 7,
      car: 10,
      truck: 10,
    });
  });

  it("should correctly count the axles", () => {
    const result = reduceVehicleData(mockVehicleData, "axles");

    expect(result).toEqual({
      "2": 13,
      "4": 4,
      "6": 3,
      "8": 3,
      "10": 3,
      "12": 1,
    });
  });

  it("should correctly count the heights", () => {
    const result = reduceVehicleData(mockVehicleData, "height");

    expect(result).toEqual({
      "39": 1,
      "40": 1,
      "41": 1,
      "42": 1,
      "43": 1,
      "44": 1,
      "45": 1,
      "55": 1,
      "56": 1,
      "57": 1,
      "58": 1,
      "59": 1,
      "60": 1,
      "61": 1,
      "62": 1,
      "63": 1,
      "64": 1,
      "150": 1,
      "152": 1,
      "154": 1,
      "170": 1,
      "171": 1,
      "172": 1,
      "180": 1,
      "181": 1,
      "182": 1,
      "185": 1,
    });
  });
});
