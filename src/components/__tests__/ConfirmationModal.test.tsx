import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationModal from "../ConfirmationModal";

describe("ConfirmationModal", () => {
  const onConfirmMock = jest.fn();
  const onCancelMock = jest.fn();

  test("should render correctly when isOpen is true", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    );

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(
      screen.getByText("Do you really want to log out?")
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("should not render when isOpen is false", () => {
    const { container } = render(
      <ConfirmationModal
        isOpen={false}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  test("should call onCancel when the Cancel button is clicked", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  test("should call onConfirm when the Logout button is clicked", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  test("should have correct styles and classes applied", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    const logoutButton = screen.getByText("Logout");

    expect(cancelButton).toHaveClass("bg-gray-200 text-gray-700");
    expect(logoutButton).toHaveClass("bg-red-600 text-white");

    // Test hover states if needed
    fireEvent.mouseOver(cancelButton);
    expect(cancelButton).toHaveClass("hover:bg-gray-500 hover:text-white");

    fireEvent.mouseOver(logoutButton);
    expect(logoutButton).toHaveClass("hover:bg-red-700");
  });
});
