import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import ChartLegend from "@/components/ChartLegend";

describe("ChartLegend", () => {
  const classifications = [
    { label: "Car", color: "rgba(0, 90, 187, 0.1)" },
    { label: "Truck", color: "rgba(102, 187, 106, 0.1)" },
    { label: "Bike", color: "rgba(76, 175, 80, 0.12)" },
    { label: "Van", color: "rgba(255, 235, 59, 0.12)" },
    { label: "Bus", color: "rgba(3, 169, 244, 0.1)" },
  ];

  it("renders all classifications with correct labels and colors", () => {
    const { getByText } = render(
      <ChartLegend classifications={classifications} />
    );

    classifications.forEach(({ label, color }) => {
      const labelElement = getByText(label);
      expect(labelElement).toBeInTheDocument();

      const colorBox = labelElement.previousSibling as HTMLElement;
      expect(colorBox).toHaveStyle(`background-color: ${color}`);
    });
  });

  it("applies the provided className to the root div", () => {
    const { container } = render(
      <ChartLegend classifications={classifications} className="custom-class" />
    );

    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv).toHaveClass("custom-class");
  });

  it("renders with default className if none is provided", () => {
    const { container } = render(
      <ChartLegend classifications={classifications} />
    );

    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv).toHaveClass("flex justify-center mt-4");
  });
});
