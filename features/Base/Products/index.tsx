import React from "react";
import PackagesSection from "../Home/section/PackagesSection";
import DealsSection from "../Home/section/DealsSection";
import SubscribeSection from "../Home/section/SubscribeSection";

const ProductsFeature = () => {
  return (
    <main>
      <section>Products</section>
      <PackagesSection />
      <DealsSection />
      <SubscribeSection />
    </main>
  );
};

export default ProductsFeature;
