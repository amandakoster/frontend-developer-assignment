import { VehicleData } from "@/types";
import { mockVehicleData } from "@/mockData/mockVehicleData";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/getData";

// Determine if the environment is development or testing
const isDevelopment =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

export const fetchVehicleData = async (): Promise<VehicleData[]> => {
  if (isDevelopment) {
    console.log("Using mock data");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockVehicleData);
      }, 500); // simulate network delay
    });
  }

  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data: VehicleData[]) => {
      console.log("Data fetched successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};
