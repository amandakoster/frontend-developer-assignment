import React, { ReactNode, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@testing-library/jest-dom";

beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

// Mock the localStorage so that when the AuthContext interacts with it,
// the operations are recorded and can be tested.
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  length: 0,
  key: jest.fn(),
};

// Replaces the global `localStorage` object with the mock implementation.
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

// A wrapper component to provide the AuthContext to the 'TestComponent' )
interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

const TestComponent: React.FC<{ username?: string; password?: string }> = ({
  username = "username",
  password = "password",
}) => {
  const auth = useAuth();

  useEffect(() => {
    auth.login(username, password);
  }, [auth, username, password]);

  return <div>{auth.isAuthenticated ? "Logged in" : "Logged out"}</div>;
};

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Render the `TestComponent` within the `AuthProvider` context.
  it("should log in correctly", async () => {
    console.log = jest.fn(); // Mock console.log to capture output if needed

    render(
      <Wrapper>
        <TestComponent username="lar5" password="mari0" />
      </Wrapper>
    );

    // Add a delay to allow the useEffect to complete
    await screen.findByText("Logged in");

    expect(screen.getByText("Logged in")).toBeInTheDocument();
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "auth-token",
      expect.any(String) // String bc the value does not matter as auth is mocked
    );
  });

  it("should handle invalid login credentials", async () => {
    window.alert = jest.fn();

    render(
      <Wrapper>
        <TestComponent username="Lars" password="Mario" />
      </Wrapper>
    );

    expect(screen.getByText("Logged out")).toBeInTheDocument();
    expect(window.alert).toHaveBeenCalledWith("Invalid credentials");
  });

  it("should log out correctly", async () => {
    const TestLogoutComponent: React.FC = () => {
      const auth = useAuth();

      useEffect(() => {
        auth.login("username", "password");
        auth.logout();
      }, [auth]);
      return <div>{auth.isAuthenticated ? "Logged in" : "Logged out"}</div>;
    };

    render(
      <Wrapper>
        <TestLogoutComponent />
      </Wrapper>
    );

    expect(screen.getByText("Logged out")).toBeInTheDocument;
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("auth-token");
  });

  it("should throw an error if useAuth is used outside of AuthProvider", () => {
    const TestComponentOutsideProvider = () => {
      try {
        useAuth();
      } catch (e) {
        return <div>{(e as Error).message}</div>;
      }
    };

    render(<TestComponentOutsideProvider />);
    expect(
      screen.getByText("useAuth must be used within AuthProvider")
    ).toBeInTheDocument();
  });
});
