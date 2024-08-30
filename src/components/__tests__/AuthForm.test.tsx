import React from "react";
import { render } from "@testing-library/react";
import AuthForm from "@/components/AuthForm";
import { AuthProvider } from "@/context/AuthContext";
import mockRouter from "next-router-mock";
import { act } from "react-dom/test-utils";

jest.mock("next/navigation", () => require("next-router-mock"));

describe("AuthForm", () => {
  it("renders the AuthForm component", () => {
    mockRouter.setCurrentUrl("/auth");

    const { getByPlaceholderText } = render(
      <AuthProvider>
        <AuthForm />
      </AuthProvider>
    );

    expect(getByPlaceholderText("Enter username")).toBeInTheDocument();
  });
});
