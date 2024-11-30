"use client";
import React from "react";
import MainHeading from "./main-heading";
import FieldsCard from "./fieldsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";

const Disciplines = [
  {
    id: 1,
    title: "NET-Engineering",
    desc: "The test will be conducted for candidates seeking admission in all Engineering and Computing Programmes.Candidate admission in Engineering can also opt for admission in BS Mathematics, BS Physics, BS Chemistry and BS Food Science & Technology programmes",
    courses: ["Maths 50%", "Physics  30%", "English 20%"],
    url:'/mock-test'
  },
  {
    id: 2,
    title: "NET-Business & Social Sciences",
    desc: "The test is for candidates seeking admission in BBA / BS Public Administration / BS Mass Communication / BS Economics / BS Psychology / BS Accounting & Finance / LLB / BS Tourism and Hospitality Management / BS English (Language and Literature)",
    courses: ["Basic Maths 50%", "English 50%"],
    url:'/mock-test'
  },
  {
    id: 3,
    title: "NET-Applied Sciences",
    desc: "This test is for candidates having Pre-Medical background (with or without Additional Math) applying in BS Biotechnology / BS Environmental Science / BS Agriculture, BS Food Science & Technology, BS Bioinformatics or BS Chemistry.",
    courses: [
      "Biology 50%",
      "Chemistry 30%",
      "English 20%",
    ],
    url:'/mock-test'
  },
  {
    id: 4,
    title: "NET-Architecture",
    desc: "The test is for candidates seeking admission in B Architecture / B Industrial Design only.",
    courses: [
      "Design Aptitude 50%",
      "Maths 30%",
      "English 20%",
    ],
    url:'/mock-test'
  },
  {
    id: 5,
    title: "NET-Natural Sciences",
    desc: "This test is for candidates seeking admission in BS Mathematics, BS Physics, or BS Chemistry only",
    courses: [
      "Maths 50%",
      "English 50%",
    ],
    url:'/mock-test'
  },
];

function CustomizeTest() {
  return (
    <div className=" mx-auto max-w-[1200px] my-4">
      <div className="">
        <MainHeading
          heading={`Customized Test Preparation To Navigate Your Path To Success`}
        />
        <p className=" text-center text-black">
          Take Detailed Mock Tests With Various Subjects to Test Your
          Preparation for Entry Levels.
        </p>
      </div>
      <div className="flex items-center justify-center flex-col md:mt-6 mt-4 ">
        <Swiper
          breakpoints={{
            300:{
              slidesPerView:1,
              spaceBetween:10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
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
          className="max-w-[90%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[80%] "
        >
          {Disciplines.map((d) => (
            <SwiperSlide key={d.id}>
              <FieldsCard test={d} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CustomizeTest;
