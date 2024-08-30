import { VehicleData } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchVehicleData = async (): Promise<VehicleData[]> => {
  if (!API_URL) {
    throw new Error("API_URL is not defined");
  }

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: VehicleData[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);

    throw error;
  }
};
