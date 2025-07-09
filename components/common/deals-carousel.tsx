"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const IMAGES_ITEM = [
  "/images/deals1-img.png",
  "/images/deals2-img.png",
  "/images/deals3-img.jpg",
  "/images/deals4-img.jpg",
  "/images/deals5-img.jpg",
  "/images/deals6-img.jpg",
  "/images/deals7-img.jpg",
  "/images/deals8-img.jpg",
];

const DealsCarousel = () => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    containScroll: "trimSnaps",
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const updateScale = useCallback(() => {
    if (!emblaApi) return;

    const slidesInView = emblaApi.slidesInView();

    slideRefs.current.forEach((el, i) => {
      if (!el) return;

      const isActive = i === emblaApi.selectedScrollSnap();
      el.style.transition = "transform 0.3s ease";
      el.style.transform = `scale(${isActive ? "1" : "0.85"})`;
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedSnap = emblaApi.selectedScrollSnap();
      setSelectedIndex(selectedSnap);
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());

      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const isActive = i === selectedSnap;
        el.style.transition = "transform 0.3s ease";
        el.style.transform = `scale(${isActive ? "1" : "0.85"})`;
      });
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("scroll", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("scroll", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="relative z-0">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {IMAGES_ITEM.map((src, index) => (
              <div
                key={index}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="relative rounded-lg overflow-hidden flex-[0_0_auto] transition-transform"
                style={{
                  height: "500px",
                  width: "372px",
                }}
              >
                <Image
                  src={src}
                  alt={`Deal ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <Button
            className="w-10 h-10 bg-white text-black hover:bg-gray-100 rounded-full shadow-[0px_4px_14px_1px_#00000029]"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft />
          </Button>
          <Button
            className="w-10 h-10 bg-white text-black hover:bg-gray-100 rounded-full shadow-[0px_4px_14px_1px_#00000029]"
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        {IMAGES_ITEM.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`relative w-3 h-3 rounded-full border transition-colors ${
              selectedIndex === index
                ? "bg-white w-6 h-6 border-black"
                : "bg-gray-400"
            }`}
          >
            {selectedIndex === index && (
              <span className="absolute inset-1 bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DealsCarousel;
