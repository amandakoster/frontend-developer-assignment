import React from "react";

interface ChartLegendProps {
  classifications: { label: string; color: string }[];
  className?: string;
}

const ChartLegend: React.FC<ChartLegendProps> = ({
  classifications,
  className = "",
}) => {
  return (
    <div className={`${className} flex justify-center mt-4`}>
      {classifications.map((classification, index) => (
        <div key={index} className="flex items-center mr-4">
          <div
            style={{ backgroundColor: classification.color }}
            className="w-4 h-4 mr-2"
          ></div>
          <span className="text-sm">{classification.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ChartLegend;
