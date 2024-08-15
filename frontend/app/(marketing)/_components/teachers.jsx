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
        {/* <div className="justify-between">
            <h1 className="text-2xl">Top Certified Tutors</h1>
            <Link href={'/#tutors'}>Show All Tutors</Link>
        </div> */}
        <div className="flex items-center justify-center flex-col md:mt-6 mt-4 ">
          <Swiper
            breakpoints={{
              750: {
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
