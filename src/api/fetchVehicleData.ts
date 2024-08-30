import { VehicleData } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "test" && "http://mockapi.com/data");

if (!API_URL) {
  throw new Error(
    "API_URL is not defined. Please set it in your environment variables."
  );
}

export const fetchVehicleData = async (): Promise<VehicleData[]> => {
  try {
    const response = await fetch(API_URL);

    // Check if the response is okay (status code 200-299)
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
