import React from "react";
import DashboardWrapper from "@/components/layout/dashboardWrapper";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
