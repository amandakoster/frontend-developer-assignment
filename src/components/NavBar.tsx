import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import ConfirmationModal from "./ConfirmationModal";

const NavBar: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathname = usePathname();
  const pageName =
    pathname === "/"
      ? "Home"
      : `${pathname.charAt(1).toUpperCase()}${pathname.slice(2)}`;

  const handleLogoutClick = () => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      router.push("./login");
    }
  };

  const confirmLogout = () => {
    setIsModalOpen(false);
    logout();
    router.push("./");
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center mb-8 p-4 bg-primary text-white">
        <h1 className="text-lightGray text-3xl font-medium uppercase m-4">
          {pageName}
        </h1>
        <button
          onClick={handleLogoutClick}
          className="px-4 py-2 bg-lightGray text-darkGray font-semibold hover:bg-darkGray hover:text-lightGray transition duration-300"
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </nav>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
};

export default NavBar;
