import React from "react";
import { render } from "@testing-library/react";
import { DoughnutChart, ScatterChart } from "@/components/Charts";
import { mockVehicleData } from "@/utils/mockVehicleData";
import { TooltipItem } from "chart.js";

describe("Charts Component", () => {
  it("should render DoughnutChart without crashing", () => {
    const { container } = render(
      <DoughnutChart vehicleData={mockVehicleData} />
    );
    expect(container).toBeInTheDocument();
  });

  it("should render ScatterChart without crashing", () => {
    const { container } = render(
      <ScatterChart vehicleData={mockVehicleData} />
    );
    expect(container).toBeInTheDocument();
  });
});

describe("DoughnutChart", () => {
  it("formats tooltip labels correctly", () => {
    const container = render(<DoughnutChart vehicleData={mockVehicleData} />);

    const tooltipCallback = (
      container.container.firstChild as HTMLElement
    )?.getAttribute("data-chartjs-tooltip");

    if (tooltipCallback) {
      const labelFunction = JSON.parse(tooltipCallback).callbacks.label;
      const tooltipItem: TooltipItem<"doughnut"> = {
        label: "Car",
        raw: 2, // Assuming 2 cars for this test
      } as TooltipItem<"doughnut">;

      const formattedLabel = labelFunction(tooltipItem);
      expect(formattedLabel).toBe("Car: 2 (40%)"); // Assuming 5 total vehicles
    }
  });
});

describe("ScatterChart", () => {
  it("formats tooltip labels correctly", () => {
    const container = render(<ScatterChart vehicleData={mockVehicleData} />);

    const tooltipCallback = (
      container.container.firstChild as HTMLElement
    )?.getAttribute("data-chartjs-tooltip");

    if (tooltipCallback) {
      const labelFunction = JSON.parse(tooltipCallback).callbacks.label;
      const tooltipItem: TooltipItem<"scatter"> = {
        label: "Truck",
        raw: { x: 4, y: 120 },
      } as TooltipItem<"scatter">;

      const formattedLabel = labelFunction(tooltipItem);
      expect(formattedLabel).toBe("Truck: 4 axles, 120 inches");
    }
  });
});
