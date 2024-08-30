import { fetchVehicleData } from "@/api/fetchVehicleData";
import { mockVehicleData } from "@/mockData/mockVehicleData";

jest.mock("../fetchVehicleData", () => ({
  fetchVehicleData: jest.fn(),
}));

describe("fetchVehicleData", () => {
  beforeEach(() => {
    (fetchVehicleData as jest.Mock).mockResolvedValue(mockVehicleData);
  });

  test("should fetch vehicle data successfully", async () => {
    const data = await fetchVehicleData();
    expect(data).toEqual(mockVehicleData);
  });

  test("should handle errors correctly", async () => {
    (fetchVehicleData as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );
    await expect(fetchVehicleData()).rejects.toThrow("Failed to fetch");
  });
});
