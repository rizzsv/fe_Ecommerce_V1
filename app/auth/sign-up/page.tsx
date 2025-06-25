import React from "react";
import AuthSignUpFeature from "@/features/Auth/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to your account",
};

const AuthSignUp = () => {
  return <AuthSignUpFeature />;
};

export default AuthSignUp;
