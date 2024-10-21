"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

// import { RxArrowTopRight } from "react-icons/rx";
// import { ServiceData } from "../constants";
// import { MoveUpRight } from "lucide-react";
import Testimonial from "./testimonial";
// import MainHeading from "./main-heading";
import StudentTestimonials from "../../../constants/testimonials";

const Testimonials = () => {
  return (
    <div className="mx-auto max-w-[1200px]  bg-[#4463FB]  py-12">
      <h1 className=" text-center font-bold text-3xl mt-4 text-[#00000] mx-4 mb-2">
        Hear what our students says
      </h1>
      <p className="text-center text-[#ffffff] max-w-[700px] mx-auto ">
        Students who took the NUSTrive training program excelled in their NET
        exams, showcasing significant improvements in their understanding and
        test performance.
      </p>
      <div className="flex items-center justify-center flex-col md:mt-6 mt-4">
        <Swiper
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="max-w-[80%] lg:max-w-[80%]"
        >
          {StudentTestimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <Testimonial testimonial={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default Testimonials;
const Testimoniaccls = () => {
  return (
      <div className="flex items-center justify-center flex-col md:mt-8 mt-6">
        <Swiper
          
        
          className="w-full px-4 max-w-[90%] m-4"
        >
          {StudentTestimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <Testimonial testimonial={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  );
};
