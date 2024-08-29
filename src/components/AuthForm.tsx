"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "@/context/AuthContext";

const AuthForm: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      logout();
      router.push("./");
    } else {
      login(username, password);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("./dashboard");
    }
  }, [isAuthenticated, router]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const inputClass =
    "text-sm w-full p-4 hover:bg-neutral-200 placeholder-gray-300 focus:outline-none transition duration-300";

  return (
    <div>
      <Image
        src="/images/auth.png"
        alt="Branding"
        fill
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-50"
        priority
      />
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="relative z-10 bg-lightGray p-10  shadow-lg transform scale-125">
          <h2 className="font-light text-lg uppercase text-gray-600 mb-4">
            {/* {isAuthenticated ? "Logout" : "Login"} */}
            Welcome to Sinelec USA
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-xs absolute right-4 top-5 text-primary"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  size="lg"
                />
              </button>
            </div>
            <button
              type="submit"
              className="text-sm w-full p-4 bg-primaryBlue text-white  hover:bg-secondary transition duration-300"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
