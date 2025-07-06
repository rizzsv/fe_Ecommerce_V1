"use client";

import useDashboardProductDetailsFeature from "./hook";

const DashboardProductDetailsFeature = ({
  params,
}: {
  params: { slug: string };
}) => {
  const { router, data, isLoading, deleteProduct } =
    useDashboardProductDetailsFeature(params.slug);

  if (isLoading) return <div>Loading...</div>;

  return <main>Product Details</main>;
};

export default DashboardProductDetailsFeature;
