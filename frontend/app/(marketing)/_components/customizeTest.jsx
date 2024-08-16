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
    title: "Engineering NET",
    desc: "Build engineering expertise with our thorough test preparation. Covering fundamental concepts and language skills, prepare yourself for success in entrance exams.",
    courses: ["Maths", "Physics", "Chemistry", "English", "Intelligence"],
  },

  {
    id: 2,
    title: "Computer Science NET",
    desc: "Navigate computer science exams and attempt confidently. We blend math prowess, digital insights, language finesse, and logical skills for your success.",
    courses: [
      "Maths",
      "Physics",
      "Computer Science",
      "English",
      "Intelligence",
    ],
  },
  {
    id: 3,
    title: "Business & Social Sciences",
    desc: "Excel in social sciences exams by enhancing your mathematical abilities, refining communication skills, fostering analytical thinking, and participating thoughtfully for outstanding performance.",
    courses: ["Basic Math", "English", "Intelligence", "-", "- "],
  },
];

function CustomizeTest() {
  return (
    <div className="mt-4">
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
