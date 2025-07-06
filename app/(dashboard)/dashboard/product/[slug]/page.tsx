import React from "react";
import DashboardProductDetailsFeature from "@/features/Dashboard/ProductDetails";

const DashboardProductDetails = ({
  params,
}: {
  params: { slug: string; id: string };
}) => {
  return <DashboardProductDetailsFeature params={params} />;
};

export default DashboardProductDetails;
