"use client";

import { useCallback, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const testimonials = [
  {
    name: "Angela B.",
    role: "Designer",
    quote:
      "This is simply unbelievable! It's just amazing. I would gladly pay triple.",
    rating: 5,
    img: "/images/testi2-img.png",
  },
  {
    name: "James K.",
    role: "Traveler",
    quote:
      "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    rating: 5,
    img: "/images/testi1-img.png",
  },
  {
    name: "Brian W.",
    role: "Developer",
    quote:
      "Just what I was looking for. Thank you for making it painless, pleasant and most of all hassle free! All products are great.",
    rating: 4,
    img: "/images/testi1-img.png",
  },
  {
    name: "Sarah M.",
    role: "Marketing Manager",
    quote:
      "I was looking for something exactly like this. Thank you for making it painless and most of all hassle-free! All the best.",
    rating: 5,
    img: "/images/testi2-img.png",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setCurrentIndex(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning]
  );

  const scrollPrev = useCallback(() => {
    const prevIndex =
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  }, [currentIndex, goToSlide]);

  const scrollNext = useCallback(() => {
    const nextIndex =
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({
        ...testimonials[index],
        originalIndex: index,
        position: i,
      });
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div>
      <div className="relative">
        <div
          ref={carouselRef}
          className="relative flex justify-center items-center min-h-[280px]"
        >
          {visibleTestimonials.map((testimonial, index) => {
            const isCenter = index === 1;

            return (
              <div
                key={`${testimonial.originalIndex}-${currentIndex}`}
                className={`
                  absolute transition-all duration-300 ease-out
                  ${isCenter ? "scale-100 opacity-100 z-20" : "scale-80 z-10"}
                  ${index === 0 ? "-translate-x-80" : ""}
                  ${index === 2 ? "translate-x-80" : ""}
                `}
              >
                <div className="bg-white rounded-[10px] shadow-[0px_20px_60px_0px_#2E213D14] py-16 px-12 h-auto w-[720px] flex justify-between items-center gap-16">
                  <div className="relative w-60 h-60 shrink-0">
                    <div className="absolute -bottom-4 -left-4 w-full h-full bg-gray-300 rounded-xl z-0" />
                    <Image
                      src={testimonial.img}
                      alt={testimonial.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="relative z-10 rounded-xl w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col space-y-5">
                    <p className="text-gray-500 text-base font-normal">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        )
                      )}
                    </div>
                    <hr />
                    <div className="space-y-3.5">
                      <h3 className="font-normal text-[32px]">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-base">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-24 gap-4">
        <Button
          onClick={scrollPrev}
          disabled={isTransitioning}
          className="w-10 h-10 bg-white text-black hover:bg-gray-100 rounded-full shadow-[0px_4px_14px_1px_#00000029]"
        >
          <ChevronLeft />
        </Button>

        <Button
          onClick={scrollNext}
          disabled={isTransitioning}
          className="w-10 h-10 bg-white text-black hover:bg-gray-100 rounded-full shadow-[0px_4px_14px_1px_#00000029]"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
