import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const NavBar: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  // Get current path and build page name
  const pathname = usePathname();
  const pageName =
    pathname === "/"
      ? "Home"
      : `${pathname.charAt(1).toUpperCase()}${pathname.slice(2)}`;

  const handleLogout = () => {
    logout();
    router.push("./");
  };

  return (
    <nav className="flex justify-between items-center mb-8 p-4 bg-primary text-white">
      <h1 className="text-xl font-bold">{pageName}</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-accentGreen rounded hover:bg-accentYellow text-white hover:text-darkGray"
      >
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </nav>
  );
};

export default NavBar;
