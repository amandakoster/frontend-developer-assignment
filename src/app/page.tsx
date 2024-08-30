"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <AuthForm />
    </div>
  );
};

export default LoginPage;
