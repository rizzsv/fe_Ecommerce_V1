import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SeparatorTrapezoid from "@/components/common/separator-trapezoid";
import { HandHeart, ShieldCheck, Container, PhoneCall } from "lucide-react";

const PackagesSection = () => {
  return (
    <section id="packages">
      <div className="bg-[#dadada] flex">
        <div className="bg-white clip-trapezoid w-[55%] relative">
          <div className="w-full h-full relative overflow-hidden">
            <Image
              src="/images/peaky-img.png"
              alt="Peacy Blinders"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="pl-20 pr-44"
            />
            <Image
              src="/images/points-img.png"
              alt="Points"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-contain z-[1] pr-64 ml-3"
            />
          </div>
          <SeparatorTrapezoid />
        </div>
        <div className="py-[60px] space-y-5 font-normal text-base max-w-xl px-4">
          <p className="text-gray-500">Women Collection</p>
          <p className="text-[46px] font-normal">Peaky Blinders</p>
          <p className="underline">DESCRIPTION</p>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Scelerisque duis.
          </p>
          <p className="text-gray-500">
            Size: <Badge className="ml-[15px] px-5">M</Badge>
          </p>
          <p className="text-[28px] font-medium">Rp 1.750.000</p>
          <Button className="px-16 py-6 rounded-[10px]">Buy Now</Button>
        </div>
      </div>

      <div className="shadow-[0px_20px_52.29px_0px_#4444440A]">
        <div className="container flex justify-between items-center py-16">
          <div className="flex items-center gap-3">
            <HandHeart className="w-[50px] h-[50px]" />
            <p className="flex flex-col text-xl font-medium">
              High Quality
              <span className="text-base font-normal">
                Crafted from top materials
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-[50px] h-[50px]" />
            <p className="flex flex-col text-xl font-medium">
              Warrany Protection
              <span className="text-base font-normal">Over 2 years</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Container className="w-[50px] h-[50px]" />
            <p className="flex flex-col text-xl font-medium">
              Free Shipping
              <span className="text-base font-normal">
                Order over Rp 1.000.000
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PhoneCall className="w-[50px] h-[50px]" />
            <p className="flex flex-col text-xl font-medium">
              24 / 7 Support
              <span className="text-base font-normal">Dedicated support</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
