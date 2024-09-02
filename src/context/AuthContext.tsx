"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if the auth token exists in localStorage
    const token = localStorage.getItem("auth-token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const login = (username: string, password: string) => {
    // Mock implementation of login
    if (username === "lar5" && password === "mari0") {
      localStorage.setItem("auth-token", "mock-token");
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
