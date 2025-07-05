"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, ArrowUp } from "lucide-react";

const FloatingButtons = () => {
  const [showScroll, setShowScroll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToHeader = useCallback(() => {
    const header = document.getElementById("header");
    if (header) header.scrollIntoView();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      <button
        className="bg-black p-3 rounded-xl shadow-xl cursor-pointer"
        onClick={() => router.push("/shop")}
      >
        <ShoppingCart className="text-white w-4 h-4" />
      </button>

      {showScroll && (
        <button
          onClick={scrollToHeader}
          className="border border-black p-3 rounded-full cursor-pointer bg-white hover:bg-gray-100"
        >
          <ArrowUp className="w-4 h-4 text-black" />
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;
