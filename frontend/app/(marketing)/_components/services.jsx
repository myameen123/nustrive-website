import { Grid } from "@mui/material";
import React from "react";
import Service from "./service";
import MainHeading from "./main-heading";
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
    desc: "Review questions provided after each lecture to solidify your understanding.",
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
    <div className=" lg:mt-[150px] mt-20 mb-20">
      <div className=" xl:w-[70%] lg:w-[85%] mx-auto w-[91%]">
        <MainHeading heading="Online Learning Designed To Ace Your Entry Tests" />
        {/* <h1>Online Learning Designed To Ace Your Entry Tests</h1> */}
        <p className=" text-center text-[#000000]" >Comprehensive Courses, Practice Tests, and Expert Guidance to Ensure Your Success in Entry Exams</p>
        <div className=" flex flex-col md:gap-8 mt-12 gap-4">
          <div className=" flex md:flex-row flex-col justify-between gap-4">
            <Service
              annimationClass="animate-from-left"
              title={SERVICES[0].title}
              imgSrc={SERVICES[0].imgSrc}
              desc={SERVICES[0].desc}
            />
            <Service
              annimationClass="animate-from-right" 
              title={SERVICES[1].title}
              imgSrc={SERVICES[1].imgSrc}
              desc={SERVICES[1].desc}
            />
          </div>
          <div className=" flex md:flex-row flex-col justify-between gap-4">
            <Service
              annimationClass="animate-from-left"
              title={SERVICES[2].title}
              imgSrc={SERVICES[2].imgSrc}
              desc={SERVICES[2].desc}
            />
            <Service
              annimationClass="animate-from-right"
              title={SERVICES[3].title}
              imgSrc={SERVICES[3].imgSrc}
              desc={SERVICES[3].desc}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
