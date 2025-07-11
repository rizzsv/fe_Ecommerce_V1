"use client";

import React, { useState, useEffect } from "react";
import {
  HeroSection,
  NewArrivalsSection,
  LogoSection,
  DealsSection,
  PackagesSection,
  FollowUsSection,
  TestimonialSection,
  SubscribeSection,
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
      <PackagesSection />
      <FollowUsSection />
      {isLogged && <TestimonialSection />}
      <SubscribeSection />
      <FloatingButtons />
    </main>
  );
};

export default HomepageFeature;
