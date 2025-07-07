"use client";

import { useParams } from "next/navigation";

const DashboardAddProductFeature = () => {
  const params = useParams();
  const slug = params?.slug;
  console.log("params:", params);

  if (!slug) {
    console.error("Slug tidak terdefinisi");
    return null;
  }

  return (
    <main>
      <h1>Dashboard Add Product</h1>
      {/* Dashboard Product content will go here */}
    </main>
  );
};

export default DashboardAddProductFeature;
