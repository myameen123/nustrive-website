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
import StudentTestimonials from "@/constants/testimonials";

const Testimonials = () => {
  return (
    <div className="bg-[#4463FB]  py-4">
      <h1 className=" text-center font-bold text-3xl mt-4 text-[#00000] mx-4">
       Hear what our students says
      </h1>
      <p className=" text-center  text-[#ffffff] mb-4">
      Students who took the NUSTrive training program excelled in their NET exams, 
      showcasing significant improvements in their understanding and test performance.
      </p>
      <div className="flex items-center justify-center flex-col md:mt-6 mt-4">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="max-w-[95%] lg:max-w-[90%] "
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
