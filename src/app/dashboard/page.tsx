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

  const cardClass =
    "p-4 m-4 border-2 border-indigo-600 bg-white rounded shadow";

  return (
    <div className="min-h-screen  bg-gray-100">
      <NavBar />
      {/* <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard Cards</h1>
      </div> */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <div className={cardClass}>Card 1</div>
        <div className={cardClass}>Card 2</div>
        <div className={cardClass}>Card 3</div>
      </div>
    </div>
  );
};

export default Dashboard;
