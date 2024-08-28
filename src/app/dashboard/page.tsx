"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import { fetchVehicleData } from "@/api/fetchVehicleData";
import { VehicleData } from "@/types";
import {
  StackedBarChart,
  LineChart,
  PieChart,
} from "@/components/charts/Charts";
import ChartLegend from "@/components/ChartLegend";
import {
  processClassificationFrequency,
  formatTimestamp,
  processAxlesAndHeight,
} from "@/utils/dataUtils";
import {
  accentGreen,
  mustardYellow,
  primaryBlue,
  purple,
  salmon,
} from "@/utils/colors";

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
          console.log("Raw API Data:", data); // Add this line
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

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-4 m-4">
        <h1 className="text-3xl font-light uppercase text-primary mb-4">
          Vehicle Transactions
        </h1>
        <div className="overflow-auto" style={{ maxHeight: "400px" }}>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-sm">ID</th>
                <th className="px-4 py-2 border text-sm">Timestamp</th>
                <th className="px-4 py-2 border text-sm">Classification</th>
                <th className="px-4 py-2 border text-sm">Axles</th>
                <th className="px-4 py-2 border text-sm">Height</th>
              </tr>
            </thead>
            <tbody>
              {vehicleData.map((vehicle, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-sm">{vehicle.id}</td>
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
        <h1 className="text-center text-lg font-normal uppercase text-primary m-8">
          Vehicle Classification Distribution
        </h1>
        <PieChart vehicleData={vehicleData} />
      </div>
    </div>
  );
};

export default Dashboard;
