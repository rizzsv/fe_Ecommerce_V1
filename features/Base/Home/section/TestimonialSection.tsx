import TestimonialCarousel from "@/components/common/testimonial-carousel";

const TestimonialSection = () => {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="container py-14">
        <h2 className="text-[46px] font-normal text-center mb-5">
          This Is What Our Customers Say
        </h2>
        <p className="text-gray-400 text-base font-normal text-center mb-[120px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis
        </p>

        <TestimonialCarousel />
      </div>
    </section>
  );
};

export default TestimonialSection;
