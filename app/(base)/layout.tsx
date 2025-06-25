import React from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const BaseLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default BaseLayout;
