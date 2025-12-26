import React from "react";
import AuthNewPasswordFeature from "@/features/Auth/NewPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Password",
  description: "Set a new password for your account",
};

const AuthNewPassword = () => {
  return <AuthNewPasswordFeature />;
};

export default AuthNewPassword;
