"use client";
import React from "react";
import Service from "./service";
import MainHeading from "./main-heading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";

const SERVICES = [
  {
    id: 1,
    title: "Detailed Video Lectures !",
    desc: "Thorough video lectures encompassing all topics, ready to be viewed at your preferred pace.",
    imgSrc: "/keyIcon.svg",
  },
  {
    id: 2,
    title: "Practice Questions !",
    desc: "Review questions provided after each lecture to solidify your understanding and concepts.",
    imgSrc: "/questionIcon.svg",
  },
  {
    id: 3,
    title: "Detailed Answer Key !",
    desc: "Detailed answer keys for all practice questions to help you learn from your mistakes.",
    imgSrc: "/testPassedIcon.svg",
  },
  {
    id: 4,
    title: "Full-Length Tests !",
    desc: "Complete practice tests to assess your advancement and pinpoint areas for improvement.",
    imgSrc: "/testIcon.svg",
  },
];
function Services() {
  return (
    <div className=" mt-8 mb-20 ">
        <div className="">
          <MainHeading heading="Online Learning Designed To Ace Your Entry Tests" />
          <p className=" text-center text-[#000000]">
            Comprehensive Courses, Practice Tests, and Expert Guidance to Ensure
            Your Success in Entry Exams
          </p>
        </div>
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
            className="max-w-[90%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[80%]"
          >
            {SERVICES.map((service) => (
              <SwiperSlide key={service.id} >
                <Service  service={service} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
    </div>
  );
}

export default Services;
