// src/app/page.tsx

import React from "react";
import AuthForm from "@/components/AuthForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthForm />
    </div>
  );
};

export default LoginPage;
