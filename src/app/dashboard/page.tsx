"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const AuthForm: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      logout();
      router.push("./");
    } else {
      login(username, password);
    }
  };

  // Only push to dashboard AFTER user is authenticated. Fixes immediate re-route
  useEffect(() => {
    if (isAuthenticated) {
      router.push("./dashboard");
    }
  }, [isAuthenticated, router]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center w-full md:w-1/2 p-8 bg-lightGray">
        <h2 className="text-3xl font-bold text-primary mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border border-darkGray rounded-md"
            />
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-darkGray rounded-md"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-4 text-primary"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-primary text-white font-bold rounded-md hover:bg-secondary"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </form>
      </div>
      <div className="hidden md:block w-1/2">
        {/* <img
          src="/path-to-your-image.jpg" // Ensure to replace with the correct path to your image
          alt="Branding"
          className="object-cover h-full w-full"
        /> */}
      </div>
    </div>
  );
};

export default AuthForm;
