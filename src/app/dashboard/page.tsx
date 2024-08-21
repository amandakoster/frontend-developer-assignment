"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";

const Dashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("./");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <NavBar />
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard Cards</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-white rounded shadow">Card 1</div>
        <div className="p-4 bg-white rounded shadow">Card 2</div>
        <div className="p-4 bg-white rounded shadow">Card 3</div>
      </div>
    </div>
  );
};

export default Dashboard;
