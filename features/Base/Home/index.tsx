"use client";

import React, { useState, useEffect } from "react";
import {
  HeroSection,
  NewArrivalsSection,
  LogoSection,
  DealsSection,
  TestimonialSection,
} from "./section";
import { getCookie } from "@/lib/utils";
import FloatingButtons from "@/components/common/floating-buttons";

const HomepageFeature = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(!!getCookie());
  }, []);

  return (
    <main>
      <HeroSection />
      <LogoSection />
      <DealsSection />
      <NewArrivalsSection />
      {/* You can add more sections here as needed */}
      {isLogged && <TestimonialSection />}
      <FloatingButtons />
    </main>
  );
};

export default HomepageFeature;
