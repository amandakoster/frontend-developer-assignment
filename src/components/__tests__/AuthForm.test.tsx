import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AuthForm from "@/components/AuthForm";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import mockRouter from "next-router-mock";

// Mock useAuth to control authentication state in tests
jest.mock("@/context/AuthContext", () => ({
  ...jest.requireActual("@/context/AuthContext"),
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => require("next-router-mock"));

describe("AuthForm", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/auth");
  });

  it("renders the AuthForm component", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    const { getByPlaceholderText } = render(
      <AuthProvider>
        <AuthForm />
      </AuthProvider>
    );

    expect(getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("toggles the password visibility", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    const { getByPlaceholderText, getByTestId } = render(
      <AuthProvider>
        <AuthForm />
      </AuthProvider>
    );

    const passwordInput = getByPlaceholderText("Enter password");
    const toggleButton = getByTestId("toggle-password-visibility");

    // Password should be hidden initially
    expect(passwordInput).toHaveAttribute("type", "password");

    // Toggle password visibility
    fireEvent.click(toggleButton);

    // Password should be visible
    expect(passwordInput).toHaveAttribute("type", "text");

    // Toggle password visibility back
    fireEvent.click(toggleButton);

    // Password should be hidden again
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("handles form submission correctly when not authenticated", () => {
    const loginMock = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: loginMock,
      logout: jest.fn(),
    });

    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <AuthForm />
      </AuthProvider>
    );

    const usernameInput = getByPlaceholderText("Enter username");
    const passwordInput = getByPlaceholderText("Enter password");
    const submitButton = getByText("Login");

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Verify that login was called with the correct arguments
    expect(loginMock).toHaveBeenCalledWith("testuser", "password");
  });
});
