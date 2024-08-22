// src/mock/mockData.ts
import { VehicleData, Classification } from "@/types";

export const mockVehicleData: VehicleData[] = [
  {
    timestamp: "2024-08-19T18:18:53Z",
    classification: Classification.Car,
    axles: 2,
    height: 58,
  },
  {
    timestamp: "2024-08-19T18:18:53Z",
    classification: Classification.Truck,
    axles: 6,
    height: 152,
  },
  {
    timestamp: "2024-08-19T18:18:53Z",
    classification: Classification.Bike,
    axles: 2,
    height: 42,
  },
  {
    timestamp: "2024-08-19T18:20:00Z",
    classification: Classification.Car,
    axles: 4,
    height: 60,
  },
  {
    timestamp: "2024-08-19T18:21:15Z",
    classification: Classification.Truck,
    axles: 8,
    height: 170,
  },
  {
    timestamp: "2024-08-19T18:22:30Z",
    classification: Classification.Bike,
    axles: 2,
    height: 44,
  },
  {
    timestamp: "2024-08-19T18:24:45Z",
    classification: Classification.Car,
    axles: 2,
    height: 55,
  },
  {
    timestamp: "2024-08-19T18:25:10Z",
    classification: Classification.Truck,
    axles: 10,
    height: 180,
  },
  {
    timestamp: "2024-08-19T18:26:20Z",
    classification: Classification.Bike,
    axles: 2,
    height: 40,
  },
];
