import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const SubscribeSection = () => {
  return (
    <section className="container py-14">
      <div className="flex justify-between items-center">
        <div className="w-[355px] h-[747px] relative">
          <Image
            src="/images/subscribe1-img.png"
            alt="Subscribe 1"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </div>
        <div className="flex flex-col max-w-[631px]">
          <h2 className="text-[46px] font-normal text-center mb-5">
            Subscribe To Our Newsletter
          </h2>
          <p className="text-gray-400 text-base font-normal text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin
          </p>

          <Input
            type="text"
            placeholder="Enter your email address"
            className="w-full py-8 px-7 rounded-[10px] border-0 shadow-[0px_3.02px_3.15px_0px_#00000002,0px_13.28px_6.52px_0px_#00000004,0px_32.6px_13px_0px_#00000005,0px_62.79px_25.48px_0px_#00000006,0px_105.65px_46.85px_0px_#00000008,0px_163px_80px_0px_#0000000A] my-[30px]"
          />
          <Button className="mx-auto py-6 px-11">Subscribe Now</Button>
        </div>
        <div className="w-[355px] h-[747px] relative">
          <Image
            src="/images/subscribe2-img.png"
            alt="Subscribe 2"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
