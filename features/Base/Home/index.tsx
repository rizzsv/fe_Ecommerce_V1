"use client";

import React, { useState, useEffect } from "react";
import { HeroSection, NewArrivalsSection } from "./section";
import { getCookie } from "@/lib/utils";

const HomepageFeature = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(!!getCookie());
  }, []);

  return (
    <main>
      <HeroSection />
      {isLogged && <NewArrivalsSection />}
      {/* You can add more sections here as needed */}
    </main>
  );
};

export default HomepageFeature;
