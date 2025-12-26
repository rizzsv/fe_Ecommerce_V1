import React from "react";
import DashboardWrapper from "@/components/layout/dashboard-wrapper";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
