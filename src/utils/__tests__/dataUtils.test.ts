import { VehicleData } from "@/types";
import { processAxlesAndHeight } from "@/utils/dataUtils";

describe("processAxlesAndHeight", () => {
  it("should return datasets with correct total axles and height", () => {
    const vehicleData = [
      { timestamp: "2024-08-30T12:00:00Z", axles: 2, height: 1.5 },
      { timestamp: "2024-08-30T15:00:00Z", axles: 3, height: 1.7 },
      { timestamp: "2024-08-31T12:00:00Z", axles: 4, height: 2.0 },
    ];
    const result = processAxlesAndHeight(vehicleData as VehicleData[]);

    expect(result.datasets).toHaveLength(2);
    expect(result.datasets[0].label).toBe("Total Axles");
    expect(result.datasets[0].data).toEqual([5, 4]); // 2+3 for the first date, 4 for the second date
    expect(result.datasets[1].label).toBe("Total Height");
    expect(result.datasets[1].data).toEqual([3.2, 2.0]); // 1.5+1.7 for the first date, 2.0 for the second date
  });

  it("should handle empty vehicle data array", () => {
    const result = processAxlesAndHeight([]);
    expect(result.labels).toEqual([]);
    expect(result.datasets).toHaveLength(2);
    result.datasets.forEach((dataset) => {
      expect(dataset.data).toEqual([]);
    });
  });
});
