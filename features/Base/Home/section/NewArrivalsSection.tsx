"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import products from "@/lib/dummy";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NewArrivalsSection = () => {
  const NEWARRIVALS_ITEM = [
    { name: "Men's Fashion" },
    { name: "Women's Fashion" },
    { name: "Women Accessories" },
    { name: "Men Accessories" },
    { name: "Discont Deals" },
  ];

  const [activeCategory, setActiveCategory] = useState(
    NEWARRIVALS_ITEM[0].name
  );

  const filteredProducts = products
    .filter((product) => product.category === activeCategory)
    .slice(0, 6);

  return (
    <section id="new-arrivals" className="container py-36">
      <h1 className="text-[46px] font-normal text-center flex flex-col gap-5 max-w-2xl mx-auto">
        New Arrivals
        <span className="text-base text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
          sollicitudin
        </span>
      </h1>

      <div className="flex justify-between items-center gap-7 px-[60px] my-12 flex-wrap">
        {NEWARRIVALS_ITEM.map((item, index) => (
          <Button
            key={index}
            onClick={() => setActiveCategory(item.name)}
            className={`text-base rounded-[10px] py-6 px-6 font-medium ${
              activeCategory === item.name
                ? "bg-black text-white"
                : "bg-gray-50 text-[#8a8a8a] hover:bg-black hover:text-white"
            }`}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[60px] gap-y-[60px]">
        {filteredProducts.map((product, index) => (
          <Card
            key={index}
            className="border-0 shadow-[0px_40px_90px_0px_#0000000F]"
          >
            <div className="rounded-[10px] w-full h-full px-6">
              <Image
                src={product.image}
                alt={product.title}
                width={366}
                height={244}
                className="object-cover"
              />
            </div>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="font-medium text-xl flex flex-col">
                  {product.title}
                  <span className="text-xs text-gray-500">{product.brand}</span>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                {product.rating}k Customer Reviews
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="font-medium text-2xl">Rp {product.price}</p>
                {product.isSoldOut && (
                  <span className="text-xs text-red-500 font-normal">
                    Almost Sold Out
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button className="px-16 py-6 rounded-[10px]">View More</Button>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
