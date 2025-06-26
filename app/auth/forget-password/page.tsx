import React from "react";
import AuthForgetPasswordFeature from "@/features/Auth/ForgetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
  description: "Reset your password",
};

const AuthForgetPassword = () => {
  return <AuthForgetPasswordFeature />;
};

export default AuthForgetPassword;
