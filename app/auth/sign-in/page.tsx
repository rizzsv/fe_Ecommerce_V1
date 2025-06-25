import React from "react";
import AuthSignInFeature from "@/features/Auth/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

const AuthSignIn = () => {
  return <AuthSignInFeature />;
};

export default AuthSignIn;
