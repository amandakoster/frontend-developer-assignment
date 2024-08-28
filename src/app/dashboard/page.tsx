"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import { fetchVehicleData } from "@/api/fetchVehicleData";
import { VehicleData } from "@/types";
import { DoughnutChart } from "@/components/charts/Charts";
import ChartLegend from "@/components/ChartLegend";
import { formatTimestamp } from "@/utils/dataUtils";

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
          console.log("Raw API Data:", data);
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
        <h1 className="text-xl font-normal uppercase text-primary m-8">
          Vehicle Classification Distribution
        </h1>
        <div className="flex justify-center items-center">
          <DoughnutChart vehicleData={vehicleData} />
        </div>
        <div className="overflow-auto mt-4 " style={{ maxHeight: "400px" }}>
          <h1 className="text-xl font-normal uppercase text-primary m-8">
            Vehicle Transactions
          </h1>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-sm">Timestamp</th>
                <th className="px-4 py-2 border text-sm">Classification</th>
                <th className="px-4 py-2 border text-sm">Axles</th>
                <th className="px-4 py-2 border text-sm">Height</th>
              </tr>
            </thead>
            <tbody>
              {vehicleData.map((vehicle, _) => (
                <tr key={vehicle.id}>
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
