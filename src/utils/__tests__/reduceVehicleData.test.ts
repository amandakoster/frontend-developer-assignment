import { reduceVehicleData } from "../dataMethods";
import { mockVehicleData } from "@/mockData/mockVehicleData";

describe("reduceVehicleData", () => {
  it("should correctly count the classifications", () => {
    const result = reduceVehicleData(mockVehicleData, "classification");

    expect(result).toEqual({
      car: 3,
      truck: 3,
      bike: 3,
    });
  });

  it("should correctly count the axles", () => {
    const result = reduceVehicleData(mockVehicleData, "axles");

    expect(result).toEqual({
      "2": 5,
      "4": 1,
      "6": 1,
      "8": 1,
      "10": 1,
    });
  });

  it("should correctly count the heights", () => {
    const result = reduceVehicleData(mockVehicleData, "height");

    expect(result).toEqual({
      "40": 1,
      "42": 1,
      "44": 1,
      "55": 1,
      "58": 1,
      "60": 1,
      "152": 1,
      "170": 1,
      "180": 1,
    });
  });
});
