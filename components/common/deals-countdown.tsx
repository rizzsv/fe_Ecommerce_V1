"use client";

import { useEffect, useState } from "react";

const DealsCountdown = () => {
  const calculateTimeLeft = () => {
    const deadline = new Date("2025-07-20T00:00:00");
    const now = new Date();
    const difference = deadline.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex gap-7 text-[#484848]">
      {[
        { label: "Days", value: pad(timeLeft.days) },
        { label: "Hr", value: pad(timeLeft.hours) },
        { label: "Mins", value: pad(timeLeft.minutes) },
        { label: "Sec", value: pad(timeLeft.seconds) },
      ].map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="text-3xl font-normal font-digital mb-4 p-3 bg-white shadow-[0px_4px_14px_1px_#00000029]">
            {value}
          </div>
          <div className="text-2xl font-normal">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default DealsCountdown;
