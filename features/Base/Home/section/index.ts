import dynamic from "next/dynamic";

export const HeroSection = dynamic(() => import("./HeroSection"));
export const NewArrivalsSection = dynamic(() => import("./NewArrivalsSection"));
export const LogoSection = dynamic(() => import("./LogoSection"));
export const DealsSection = dynamic(() => import("./DealsSection"));
export const PackagesSection = dynamic(() => import("./PackagesSection"));
export const FollowUsSection = dynamic(() => import("./FollowUsSection"));
export const TestimonialSection = dynamic(() => import("./TestimonialSection"));
export const SubscribeSection = dynamic(() => import("./SubscribeSection"));
