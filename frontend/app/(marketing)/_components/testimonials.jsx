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
const StudentTestimonials = [
  {
    id: 1,
    name: "Inza Zahra",
    netScore: 173,
    enrolledIn: "BBA NBS-2021",
    photo: "aa",
    description: `This course is the primary reason for my good score. The tasks are split evenly and easy to digest Each task provides adequate knowledge without burdening the student. It was really difficult for me to make time for NET's preparation but the style of day to day tasks made the studying relatively uncomplicated The content of the course falls in line with what comes in the NET. In particular, I was worried about maths but the mathematical concepts are taught while keeping in mind the sort of question that can come for it. Moreover, the daily task questions and weekly tests evaluate your knowledge and whether you're making any progress. Mr. Shayan is also readily available in case you have trouble understanding a concept or are stuck on a question. Considering there are no proper academies or anything for the business social science test, this course is really helpful as well as easily accessible. I highly recommend it`,
  },
  {
    id: 2,
    name: "M.Yameen",
    netScore: 164,
    enrolledIn: "BESE SEECS-2021",
    photo: "aa",
    description: `Yameen Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            veniam inventore tenetur dolorem asperiores possimus consectetur
            voluptatibus recusandae omnis, assi jji masai ji. voluptatibus recusandae omnis, assi jji masai ji voluptatibus recusandae omnis, assi jji masai ji`,
  },
  {
    id: 3,
    name: "Vishal Sager",
    netScore: 162,
    enrolledIn: "BESE SEECS-2021",
    photo: "aa",
    description: `Vishal Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            veniam inventore tenetur dolorem asperiores possimus consectetur
            voluptatibus recusandae omnis, assi jji masai ji. voluptatibus recusandae omnis, assi jji masai ji voluptatibus recusandae omnis, assi jji masai ji`,
  },
  {
    id: 4,
    name: "Mehran",
    netScore: 164,
    enrolledIn: "BSCS SEECS-2021",
    photo: "aa",
    description: `Mehran Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            veniam inventore tenetur dolorem asperiores possimus consectetur
            voluptatibus recusandae omnis, assi jji masai ji. voluptatibus recusandae omnis, assi jji masai ji voluptatibus recusandae omnis, assi jji masai ji`,
  },
];

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
