"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

// import { RxArrowTopRight } from "react-icons/rx";
// import { ServiceData } from "../constants";
import { MoveUpRight } from "lucide-react";
import Testimonial from "./testimonial";
import MainHeading from "./main-heading";
import StudentTestimonials from "@/app/constants/testimonials";

const Testimonials = () => {
  return (
    <div className="bg-[#49ADE5] mt-12  py-12">
      <h1 className=" text-center font-bold text-3xl mt-4 text-[#111256] mx-4">
        Testimonials of Students from NUSTrive
      </h1>
      <p className=" text-center font-bold text-[#111256] mb-8">
        Unleash Your Capabilities Across Diverse Fields
      </p>
      <div className="flex items-center justify-center flex-col md:mt-14 mt-8">
        <Swiper
          breakpoints={{
            700: {
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
          className="max-w-[95%] lg:max-w-[80%] "
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
