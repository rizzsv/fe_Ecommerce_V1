import dynamic from "next/dynamic";

export const HeroSection = dynamic(() => import("./HeroSection"));
export const NewArrivalsSection = dynamic(() => import("./NewArrivalsSection"));
