"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import { fetchVehicleData } from "@/api/fetchVehicleData";
import { VehicleData } from "@/types";
import { BarChart } from "@/components/charts/Charts";
import { reduceVehicleData } from "@/utils/dataMethods";

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
          // Add a unique ID to each record
          const dataWithIds = data.map((vehicle, index) => ({
            ...vehicle,
            id: index + 1,
          }));
          setVehicleData(dataWithIds);
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

  const classificationCounts = reduceVehicleData(vehicleData, "classification");

  const tableCellClass = "px-4 py-2 border text-sm";

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
                {/* TODO: DRY table */}
                <th className={tableCellClass}>ID</th>
                <th className={tableCellClass}>Timestamp</th>
                <th className={tableCellClass}>Classification</th>
                <th className={tableCellClass}>Axles</th>
                <th className={tableCellClass}>Height</th>
              </tr>
            </thead>
            <tbody>
              {/* TODO: DRY table */}
              {vehicleData.map((vehicle, index) => (
                <tr key={index}>
                  <td className={tableCellClass}>{vehicle.id}</td>
                  <td className={tableCellClass}>{vehicle.timestamp}</td>
                  <td className={tableCellClass}>{vehicle.classification}</td>
                  <td className={tableCellClass}>{vehicle.axles}</td>
                  <td className={tableCellClass}>{vehicle.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <BarChart
            labels={Object.keys(classificationCounts)}
            data={Object.values(classificationCounts)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
