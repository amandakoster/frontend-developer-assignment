import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { isAbsoluteUrl } from "next/dist/shared/lib/utils";

//MOCKS
jest.mock("@/context/AuthContext");
jest.mock("next/navigation");

describe("AuthForm", () => {
  const mockLogin = jest.fn();
  const mockLogout = jest.fn();
  const mockPush = jest.fn();

  beforeAll(() => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: mockLogin,
      logout: jest.fn(),
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should call login and redirect to dashboard when submitted with correct values", () => {
    const { getByText, getByPlaceholderText, rerender } = render(<AuthForm />);

    fireEvent.change(getByPlaceholderText("Enter username"), {
      target: { value: "username" },
    });
    fireEvent.change(getByPlaceholderText("Enter password"), {
      target: { value: "password" },
    });

    fireEvent.click(getByText("Login"));

    expect(mockLogin).toHaveBeenCalledWith("username", "password");

    // Update the mock to simulate a successful login
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      login: mockLogin,
      logout: jest.fn(),
    });

    // Rerender the component to reflect the updated isAuthenticated state
    rerender(<AuthForm />);

    // Assert that the user is redirected to the dashboard
    expect(mockPush).toHaveBeenCalledWith("./dashboard");
  });

  it("Should call logout and redirect to home page when submitted while authteticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      login: mockLogin,
      logout: mockLogout,
    });

    const { getByText } = render(<AuthForm />);
    fireEvent.click(getByText("Logout"));

    expect(mockLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("./");
  });
});
