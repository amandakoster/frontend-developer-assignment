export enum Classification {
  Car = "car",
  Truck = "truck",
  Bike = "bike",
}

export interface VehicleData {
  id?: number;
  timestamp: string;
  classification: Classification;
  axles: number;
  height: number;
}
