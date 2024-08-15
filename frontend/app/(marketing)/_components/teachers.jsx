"use client";
import React from "react";
import Teacher from "./teacher";
import Tutors from "@/constants/teachers";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import Link from "next/link";

const Teachers = () => {
  return (
    <div className="mt-4">
      <h1 className=" text-center font-bold text-3xl mt-4 text-black mx-4">
        Find Your Perfect Tutor at NUSTrive
      </h1>
      <p className=" text-center  text-[#6E6E6E] mb-4">
        Connect with Top Educators for Entry Level Exams Success
      </p>
      <div>
        <div className="sm:mr-20 sm:ml-20 lg:mr-32 lg:ml-32 flex justify-between">
              <h1 className="text-2xl">Top Certified Tutors</h1>
              <Link href={'/tutors'} className="text-[#4463fb] hover:text-red-900">Show All Tutors</Link>
        </div>
        <div className="flex items-center justify-center flex-col md:mt-6 mt-4 ">
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
            className="max-w-[90%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[80%] "
          >
            {Tutors.map((teacher) => (
              <SwiperSlide key={teacher.id}>
                <Teacher teacher={teacher} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
