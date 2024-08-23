import { VehicleData } from "@/types";

// acc[vehicle.classification] = current count of each vehicle classification, starting from 0.
// So: start with current count, and if no current count start with 0
// +1 increments the count by one for that classification.

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
