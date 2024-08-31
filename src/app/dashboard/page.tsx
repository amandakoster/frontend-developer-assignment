"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";

import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import { fetchVehicleData } from "@/api/fetchVehicleData";
import { VehicleData } from "@/types";
import { DoughnutChart, ScatterChart } from "@/components/Charts";
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
  const [showAll, setShowAll] = useState<boolean>(false);

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

  const transactionDate =
    vehicleData.length > 0
      ? moment(vehicleData[0].timestamp).format("MM/DD/YY")
      : "No Data";

  const divClass = "flex flex-col justify-center items-center";
  const tableDataClass = "px-4 py-2 border text-sm";

  const displayedData = showAll ? vehicleData : vehicleData.slice(0, 20);

  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-4 m-4">
        <div className="mb-8 p-2">
          <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
            <div className={divClass}>
              <h1 className="text-xl font-normal uppercase text-primaryBlue m-8">
                Vehicle Classification Distribution
              </h1>
              <DoughnutChart vehicleData={vehicleData} />
            </div>
            <div className={divClass}>
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
          <hr className="border-t border-dotted border-primaryBlue mt-16" />
        </div>

        <div className="max-w-4xl mx-auto mb-4">
          <h1 className="text-xl font-extralight uppercase text-primaryBlue mr-4">
            Vehicle Transactions:
            <span className="font-bold mr-2">&emsp;{transactionDate}</span>
            <span className="mx-2">|</span>
            <span className="font-extralight italic">
              Total Vehicles:
              <span className="font-bold mr-2">&emsp;{vehicleData.length}</span>
            </span>
          </h1>
          <button
            onClick={handleToggle}
            className="text-sm mb-2 mt-4 p-2 bg-primaryBlue text-white hover:bg-secondary transition duration-300"
          >
            {showAll ? "Show First 20 Records" : "Show All Records"}
          </button>
        </div>

        <div
          className={`overflow-auto mt-4 ${
            showAll ? "max-h-none" : "max-h-[400px]"
          } max-w-4xl mx-auto`}
        >
          <table className="min-w-full bg-white border table-auto">
            <thead className="bg-gray-200 sticky top-0 z-20">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="px-4 py-2 border text-sm">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedData.map((vehicle, index) => (
                <tr
                  key={index}
                  className={`${getRowClass(vehicle.classification)} h-12`}
                >
                  <td className={tableDataClass}>
                    {formatTimestamp(vehicle.timestamp)}
                  </td>
                  <td className={tableDataClass}>{vehicle.classification}</td>
                  <td className={tableDataClass}>{vehicle.axles}</td>
                  <td className={tableDataClass}>{vehicle.height}</td>
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
