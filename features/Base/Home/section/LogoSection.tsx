"use client";

import Image from "next/image";

const LOGOS = [
  { src: "/images/logo1-img.png", alt: "Logo 1", width: 196, height: 33 },
  { src: "/images/logo2-img.png", alt: "Logo 2", width: 196, height: 25 },
  { src: "/images/logo3-img.png", alt: "Logo 3", width: 196, height: 32 },
  { src: "/images/logo4-img.png", alt: "Logo 4", width: 196, height: 33 },
  { src: "/images/logo5-img.png", alt: "Logo 5", width: 184, height: 27 },
];

const MarqueeLogos = () => {
  return (
    <section className="overflow-hidden py-20 shadow-[0px_20px_52.29px_0px_#4444440A]">
      <div className="whitespace-nowrap animate-marquee flex gap-16 w-max">
        {[...Array(6)].flatMap((_, i) =>
          LOGOS.map((logo, idx) => (
            <div
              key={`${logo.alt}-${i}-${idx}`}
              className="relative"
              style={{ width: logo.width, height: logo.height }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes={`${logo.width}px`}
                className="object-contain"
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MarqueeLogos;
