import Image from "next/image";

const FollowUsSection = () => {
  const FOLLOW_US = [
    { src: "/images/follow1-img.png", className: "w-[320px] h-[306px]" },
    { src: "/images/follow2-img.png", className: "w-[256px] h-[380px]" },
    { src: "/images/follow3-img.png", className: "w-[320px] h-[306px]" },
    { src: "/images/follow4-img.png", className: "w-[256px] h-[380px]" },
    { src: "/images/follow5-img.png", className: "w-[320px] h-[306px]" },
    { src: "/images/follow6-img.png", className: "w-[256px] h-[380px]" },
    { src: "/images/follow7-img.png", className: "w-[320px] h-[306px]" },
  ];

  return (
    <section className="py-36">
      <h2 className="text-[46px] font-normal text-center mb-5">
        Follow Us On Instagram
      </h2>
      <p className="text-gray-400 text-base font-normal text-center max-w-xl mx-auto mb-[100px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
        sollicitudin
      </p>

      <div className="flex items-center">
        {FOLLOW_US.map((img, index) => (
          <div key={index} className={`relative ${img.className}`}>
            <Image
              src={img.src}
              alt={`Instagram ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FollowUsSection;
