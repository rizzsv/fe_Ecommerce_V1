import React from "react";
import AuthConfirmationWindowFeature from "@/features/Auth/ConfirmationWindow";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmation Code",
  description: "Enter the confirmation code sent to your email",
};

const AuthConfirmationWindow = () => {
  return <AuthConfirmationWindowFeature />;
};

export default AuthConfirmationWindow;
