import { VehicleData, Classification } from "@/types";

export const mockVehicleData: VehicleData[] = [
  // 2022 Data
  {
    timestamp: "2022-08-19T18:18:53Z",
    classification: Classification.Car,
    axles: 2,
    height: 58,
  },
  {
    timestamp: "2022-08-19T18:18:53Z",
    classification: Classification.Truck,
    axles: 6,
    height: 152,
  },
  {
    timestamp: "2022-08-19T18:18:53Z",
    classification: Classification.Bike,
    axles: 2,
    height: 42,
  },

  // 2023 Data
  {
    timestamp: "2023-08-19T18:24:45Z",
    classification: Classification.Car,
    axles: 4,
    height: 60,
  },
  {
    timestamp: "2023-08-19T18:24:45Z",
    classification: Classification.Truck,
    axles: 8,
    height: 170,
  },
  {
    timestamp: "2023-08-19T18:24:45Z",
    classification: Classification.Bike,
    axles: 2,
    height: 44,
  },

  // 2024 Data
  {
    timestamp: "2024-08-19T18:30:53Z",
    classification: Classification.Car,
    axles: 2,
    height: 57,
  },
  {
    timestamp: "2024-08-19T18:30:53Z",
    classification: Classification.Truck,
    axles: 6,
    height: 154,
  },
  {
    timestamp: "2024-08-19T18:30:53Z",
    classification: Classification.Bike,
    axles: 2,
    height: 43,
  },
];
