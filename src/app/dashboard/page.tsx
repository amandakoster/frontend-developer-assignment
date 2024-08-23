"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import { fetchVehicleData } from "@/api/fetchVehicleData";
import { VehicleData } from "@/types";

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

  const tableCellClass = "px-4 py-2 border text-sm";

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-4 m-4">
        <h1 className="text-3xl font-light uppercase text-primary mb-4">
          Vehicle Data Dashboard
        </h1>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className={tableCellClass}>Timestamp</th>
              <th className={tableCellClass}>Classification</th>
              <th className={tableCellClass}>Axles</th>
              <th className={tableCellClass}>Height</th>
            </tr>
          </thead>
          <tbody>
            {vehicleData.map((vehicle, index) => (
              <tr key={index}>
                <td className={tableCellClass}>{vehicle.timestamp}</td>
                <td className={tableCellClass}>{vehicle.classification}</td>
                <td className={tableCellClass}>{vehicle.axles}</td>
                <td className={tableCellClass}>{vehicle.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
