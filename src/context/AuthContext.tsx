"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Auth Context shape definition. Context can access auth throughout app
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if token exists/user is logged in
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    console.log({ token });
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Basic mock auth using localStorage
  const login = (username: string, password: string) => {
    if (username === "username" && password === "password") {
      localStorage.setItem("auth-token", "mock-token");
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setIsAuthenticated(false);
  };
  console.log({ isAuthenticated });

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
