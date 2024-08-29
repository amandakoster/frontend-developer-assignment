"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import { fetchVehicleData } from "@/api/fetchVehicleData";
import { VehicleData } from "@/types";
import { DoughnutChart, ScatterChart } from "@/components/charts/Charts";
import ChartLegend from "@/components/ChartLegend";
import { formatTimestamp } from "@/utils/dataUtils";

import {
  primaryBlue,
  yellowGreen,
  green,
  mustardYellow,
  blueYellow,
} from "@/utils/colors";

const legendClassifications = [
  {
    label: "Car",
    legendColor: primaryBlue,
    rowColor: "bg-primaryBlue bg-opacity-10",
  },
  {
    label: "Truck",
    legendColor: yellowGreen,
    rowColor: "bg-yellowGreen bg-opacity-10",
  },
  {
    label: "Bike",
    legendColor: green,
    rowColor: "bg-accentGreen bg-opacity-10",
  },
  {
    label: "Van",
    legendColor: mustardYellow,
    rowColor: "bg-mustardYellow bg-opacity-10",
  },
  {
    label: "Bus",
    legendColor: blueYellow,
    rowColor: "bg-blueYellow bg-opacity-10",
  },
];

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("./");
    } else {
      fetchVehicleData()
        .then((data) => {
          setVehicleData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to load vehicle data");
          setLoading(false);
        });
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = ["Timestamp", "Classification", "Axles", "Height"];

  const getRowClass = (classification: string) => {
    const item = legendClassifications.find(
      (item) => item.label.toLowerCase() === classification.toLowerCase()
    );
    return item ? item.rowColor : "";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-4 m-4">
        <div className="mb-8 p-2 border-b border-dotted border-primaryBlue">
          <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-xl font-normal uppercase text-primaryBlue m-8">
                Vehicle Classification Distribution
              </h1>
              <DoughnutChart vehicleData={vehicleData} />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-xl font-normal uppercase text-primaryBlue m-8">
                Vehicle Axles and Height Distribution
              </h1>
              <ScatterChart vehicleData={vehicleData} />
            </div>
          </div>
          <ChartLegend
            className="mt-8"
            classifications={legendClassifications.map((item) => ({
              label: item.label,
              color: item.legendColor,
            }))}
          />
        </div>
        <h1 className="text-xl font-normal uppercase text-primaryBlue m-8">
          Vehicle Transactions
        </h1>
        <div className="overflow-auto mt-4 max-h-[400px]">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="px-4 py-2 border text-sm">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicleData.map((vehicle, index) => (
                <tr key={index} className={getRowClass(vehicle.classification)}>
                  <td className="px-4 py-2 border text-sm">
                    {formatTimestamp(vehicle.timestamp)}
                  </td>
                  <td className="px-4 py-2 border text-sm">
                    {vehicle.classification}
                  </td>
                  <td className="px-4 py-2 border text-sm">{vehicle.axles}</td>
                  <td className="px-4 py-2 border text-sm">{vehicle.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
