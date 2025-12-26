import dynamic from "next/dynamic";

export const HeroSection = dynamic(() => import("./HeroSection"));
export const NewArrivalsSection = dynamic(() => import("./NewArrivalsSection"));
export const LogoSection = dynamic(() => import("./LogoSection"));
export const DealsSection = dynamic(() => import("./DealsSection"));
// Lainnya
export const TestimonialSection = dynamic(() => import("./TestimonialSection"));
