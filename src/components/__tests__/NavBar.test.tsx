import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavBar from "../NavBar";

// Mock the useRouter and useAuth hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("NavBar", () => {
  const mockPush = jest.fn();
  const mockLogout = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseAuth = useAuth as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });

    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      logout: mockLogout,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should display the correct page name based on pathname", () => {
    // Mock the usePathname hook to return a specific pathname
    jest
      .spyOn(require("next/navigation"), "usePathname")
      .mockReturnValue("/dashboard");

    render(<NavBar />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("should display 'Home' when pathname is '/'", () => {
    jest.spyOn(require("next/navigation"), "usePathname").mockReturnValue("/");

    render(<NavBar />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("should display 'Login' button when not authenticated", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      logout: mockLogout,
    });

    render(<NavBar />);

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("should display 'Logout' button when authenticated", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      logout: mockLogout,
    });

    render(<NavBar />);

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("should open the confirmation modal when 'Logout' is clicked and authenticated", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      logout: mockLogout,
    });

    render(<NavBar />);

    fireEvent.click(screen.getByText("Logout"));

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  test("should call logout and redirect to home when 'Logout' is confirmed", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      logout: mockLogout,
    });

    render(<NavBar />);

    fireEvent.click(screen.getByText("Logout"));

    // Confirm logout
    fireEvent.click(screen.getAllByText("Logout")[1]);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("./");
  });

  test("should close the confirmation modal when 'Cancel' is clicked", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      logout: mockLogout,
    });

    render(<NavBar />);

    fireEvent.click(screen.getByText("Logout"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
  });

  test("should redirect to login page when 'Login' is clicked and not authenticated", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      logout: mockLogout,
    });

    render(<NavBar />);

    fireEvent.click(screen.getByText("Login"));

    expect(mockPush).toHaveBeenCalledWith("./login");
  });
});
