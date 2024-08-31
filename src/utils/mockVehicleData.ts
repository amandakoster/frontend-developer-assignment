import { VehicleData, Classification } from "@/types";

export const mockVehicleData: VehicleData[] = [
  {
    classification: Classification.Car,
    axles: 2,
    height: 50,
    timestamp: "2024-08-31T12:00:00Z",
  },
  {
    classification: Classification.Truck,
    axles: 4,
    height: 120,
    timestamp: "2024-08-31T12:00:00Z",
  },
  {
    classification: Classification.Bike,
    axles: 2,
    height: 30,
    timestamp: "2024-08-31T12:00:00Z",
  },
  {
    classification: Classification.Van,
    axles: 3,
    height: 70,
    timestamp: "2024-08-31T12:00:00Z",
  },
  {
    classification: Classification.Bus,
    axles: 6,
    height: 150,
    timestamp: "2024-08-31T12:00:00Z",
  },
];
