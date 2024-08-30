import { fetchVehicleData } from "../fetchVehicleData";
import { VehicleData, Classification } from "@/types";

const mockApiUrl = "http://mockapi.com/data";

describe("fetchVehicleData", () => {
  it("should fetch vehicle data successfully", async () => {
    const mockData: VehicleData[] = [
      {
        id: 1,
        classification: "Car" as Classification,
        timestamp: "2024-08-30T12:34:56Z",
        axles: 2,
        height: 1.5,
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response)
    );

    const data = await fetchVehicleData();

    expect(data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(mockApiUrl);
  });

  it("should throw an error if the response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: "Internal Server Error",
      } as Response)
    );

    await expect(fetchVehicleData()).rejects.toThrow("Failed to fetch data");
    expect(global.fetch).toHaveBeenCalledWith(mockApiUrl);
  });
});
