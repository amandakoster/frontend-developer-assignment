import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import { AuthProvider, useAuth } from "@/context/AuthContext";

// Mock component to simulate the AuthForm
const AuthForm: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Logged in</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <p>Logged out</p>
          <button onClick={() => login("lar5", "mari0")}>Login</button>
        </>
      )}
    </div>
  );
};

describe("AuthForm", () => {
  test("Should call logout and change the state to logged out", async () => {
    render(
      <AuthProvider>
        <AuthForm />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Logged in")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(screen.getByText("Logged out")).toBeInTheDocument();
    });
  });
});
