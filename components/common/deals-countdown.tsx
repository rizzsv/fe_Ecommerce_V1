"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DealsCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const deadline = new Date("2025-07-20T00:00:00");
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();

      return {
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((diff / 1000 / 60) % 60)),
        seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const items = ["Days", "Hr", "Mins", "Sec"];

  return (
    <div className="flex gap-7 text-[#484848]">
      {items.map((label, i) => (
        <div key={label} className="text-center space-y-2">
          {timeLeft ? (
            <>
              <div className="text-3xl font-normal font-digital p-3 bg-white shadow-[0px_4px_14px_1px_#00000029] min-w-[60px] rounded-[10px]">
                {pad(Object.values(timeLeft)[i])}
              </div>
              <div className="text-2xl font-normal">{label}</div>
            </>
          ) : (
            <>
              <Skeleton className="h-[52px] w-[60px] rounded" />
              <Skeleton className="h-[24px] w-[40px] rounded mx-auto" />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default DealsCountdown;
