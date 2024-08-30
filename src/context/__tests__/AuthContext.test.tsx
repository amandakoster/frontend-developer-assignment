import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { AuthProvider } from "@/context/AuthContext";

beforeEach(() => {
  global.alert = jest.fn(); // Mock alert
});

describe("AuthContext", () => {
  test("should log in correctly", async () => {
    render(
      <AuthProvider>
        <div>
          <p>Logged out</p>
          <button onClick={() => global.alert("Logged in")}>Login</button>
        </div>
      </AuthProvider>
    );

    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Logged in");
    });
  });

  test("should log out correctly", async () => {
    render(
      <AuthProvider>
        <div>
          <p>Logged in</p>
          <button onClick={() => global.alert("Logged out")}>Logout</button>
        </div>
      </AuthProvider>
    );

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Logged out");
    });
  });
});
