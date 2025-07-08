import { Button } from "@/components/ui/button";
import DealsCountdown from "@/components/common/deals-countdown";
import DealsCarousel from "@/components/common/deals-carousel";

const DealsSection = () => {
  return (
    <section
      id="deals"
      className="bg-[#FAFAFA] mt-[100px] pt-14 pb-64 relative overflow-hidden"
    >
      <div className="flex w-full">
        <div className="w-full">
          <div className="flex-none max-w-screen-xl mx-auto pl-4 sm:pl-6 lg:pl-8">
            <div className="max-w-md">
              <h2 className="text-[46px] font-normal mb-5">
                Deals Of The Month
              </h2>
              <p className="text-gray-400 text-base font-normal mb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Scelerisque dui...
              </p>
              <Button className="px-16 py-7 rounded-[10px] mb-12">
                Buy Now
              </Button>

              <div>
                <p className="font-medium text-[28px] text-[#484848] mb-4">
                  Hurry, Before It’s Too Late!
                </p>
                <div className="flex gap-7 text-[#484848]">
                  <DealsCountdown />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 -right-45 overflow-hidden p-4 absolute z-0 w-[calc(100%-350px)] max-w-[1000px]">
          <DealsCarousel />
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
