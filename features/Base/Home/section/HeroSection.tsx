import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeaderSection = () => {
  return (
    <section id="header" className="h-auto">
      <div className="container my-10">
        <div className="grid grid-cols-3 gap-9">
          <div className="bg-[#E0E0E0] w-full h-full rounded-[10px] relative overflow-hidden">
            <Image
              src="/images/hero1-img.png"
              alt="Hero 1"
              fill
              className="pt-[186px]"
              sizes="(min-width: 1024px) 33vw, 100vw"
              priority
            />
          </div>
          <div className="space-y-3.5 max-w-full">
            <div className="bg-[#E0E0E0] h-36 rounded-[10px] relative overflow-hidden">
              <Image
                src="/images/hero2-img.png"
                alt="Hero 2"
                fill
                sizes="(min-width: 1024px) 100vw, 100vw"
                className="px-3.5 pt-1"
              />
            </div>
            <div className="space-y-0 text-center">
              <h1 className="font-poppins text-7xl font-medium leading-[100%] tracking-[-0.04em] text-[#484848]">
                ULTIMATE
              </h1>
              <h1 className="font-poppins text-[150px] font-medium leading-[100%] tracking-[-0.055em] text-white text-stroke text-stroke-dark">
                SALE
              </h1>
              <p className="font-poppins text-xl font-normal leading-[100%] tracking-widest text-[#484848]">
                NEW COLLECTION
              </p>
              <div className="pt-3">
                <Button
                  className="py-5 px-14"
                  onClick={() => (window.location.href = "/shop")}
                >
                  SHOP NOW
                </Button>
              </div>
            </div>
            <div className="h-36 rounded-[10px] relative overflow-hidden">
              <Image
                src="/images/hero3-img.png"
                alt="Hero 3"
                sizes="(min-width: 1024px) 100vw, 100vw"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="bg-[#E0E0E0] w-full h-full rounded-[10px] relative overflow-hidden">
            <Image
              src="/images/hero4-img.png"
              alt="Hero 4"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="pt-[188px] pl-[63px] pr-[80px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
