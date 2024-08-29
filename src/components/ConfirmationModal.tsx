"use client";

import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-neutral-300 z-50">
      <div className="bg-darkGray p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
        <p className="mb-6">Do you really want to log out?</p>
        <div className="flex justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 mr-4 bg-gray-200 text-gray-700  hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white  hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
