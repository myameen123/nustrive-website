"use client";
import React, { useState, useEffect } from "react";
import HeroCard from "./hero-card";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
const FeaturedStudents = [
  {
    id: 1,
    name: "Inza Zahra",
    netScore: 173,
    enrolledIn: "BBA NBS-2021",
    photo: "aa",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            veniam inventore tenetur dolorem asperiores possimus consectetur
            voluptatibus recusandae omnis, assi jji masai ji.`,
  },
  {
    id: 2,
    name: "M.Yameen",
    netScore: 164,
    enrolledIn: "BESE SEECS-2021",
    photo: "aa",
    description: `Yameen Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            veniam inventore tenetur dolorem asperiores possimus consectetur
            voluptatibus recusandae omnis, assi jji masai ji.`,
  },
  {
    id: 3,
    name: "Vishal Sager",
    netScore: 162,
    enrolledIn: "BESE SEECS-2021",
    photo: "aa",
    description: `Vishal Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            veniam inventore tenetur dolorem asperiores possimus consectetur
            voluptatibus recusandae omnis, assi jji masai ji.`,
  },
  {
    id: 3,
    name: "Mehran",
    netScore: 164,
    enrolledIn: "BSCS SEECS-2021",
    photo: "aa",
    description: `Mehran Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            veniam inventore tenetur dolorem asperiores possimus consectetur
            voluptatibus recusandae omnis, assi jji masai ji.`,
  },
];

function HeroSection() {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const handleDataFromChild = (data) => {
    // Handle the data received from the child component
    setCurrentStudentIndex(data);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStudentIndex((prevIndex) =>
        prevIndex === FeaturedStudents.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger once when entering the viewport
    threshold: 0.2, // Adjust the threshold as needed
  });
  return (
    <div className=" bg-[#49ADE5] relative">
      <div className="flex lg:flex-row flex-col items-center transition-all duration-75 sm:w-[80%] lg:w-[90%] mx-auto h-full sm:py-8 py-12 sm:px-1 px-4">
        <div
          className={`lg:w-[60%] flex flex-col gap-4 md:mt-12 md:mb-12 mx-4 mb-4`}
        >
          {/* <div
          className={`lg:w-[60%] flex flex-col gap-4 md:mt-12 md:mb-12 mx-4 mb-4 ${
            inView ? " animate-from-left" : " opacity-0"
          }`}
          ref={ref}
        > */}
          <h1 className=" font-extrabold sm:text-5xl text-4xl text-[#111256] ">
            Start Your Learning Journey With
            <span className=" text-white"> NUSTrive</span>
          </h1>
          <p className=" text-white md:text-lg">
            NUSTrive offers a tuition service with comprehensive video lectures,
            practice questions, and full-length practice tests for students
            preparing for the NET exam. The service also provides a trial with
            video lectures and practice questions, along with detailed answer
            keys, allowing students to evaluate their concepts before making any
            commitment or payment.
          </p>
          <Button className=" bg-[#111256] text-white rounded-[7px] w-fit hover:bg-[#111256]/90">
            Get Started
          </Button>
        </div>
        <div
          className={`lg:w-[40%] mx-4 `}
          // ref={ref}
        >
          {/* <div
          className={`lg:w-[40%] mx-4 ${
            inView ? " animate-from-right" : " opacity-0"
          }`}
          ref={ref}
        > */}
          <HeroCard
            student={FeaturedStudents[currentStudentIndex]}
            ind={currentStudentIndex}
            totalStudents={FeaturedStudents.length}
            sendDataToParent={handleDataFromChild}
          />
        </div>
        <div
          className={`absolute lg:flex hidden bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0 text-white `}
        >
          <div
            className={`bg-[#111256] h-[123px] w-[300px] mx-2 flex flex-col gap-2 p-4 items-center rounded-[7px] ${
              inView ? " animate-from-bottom" : " opacity-0"
            }`}
            ref={ref}
          >
            <h1 className=" font-bold">NET-Enhanced Mocks!</h1>
            <p className=" text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              accumsan leo in velit malesuada, sit amet luctus eros efficitur.{" "}
            </p>
          </div>
          <div
            className={`bg-[#111256] h-[123px] w-[300px] mx-2 flex flex-col gap-2 p-4 items-center rounded-[7px] ${
              inView ? " animate-from-bottom" : " opacity-0"
            }`}
            ref={ref}
          >
            <h1 className=" font-bold">NET-Enhanced Mocks!</h1>
            <p className=" text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              accumsan leo in velit malesuada, sit amet luctus eros efficitur.{" "}
            </p>
          </div>
          <div
            className={`bg-[#111256] h-[123px] w-[300px] mx-2 flex flex-col gap-2 p-4 items-center rounded-[7px] ${
              inView ? " animate-from-bottom" : " opacity-0"
            }`}
            ref={ref}
          >
            <h1 className=" font-bold">NET-Enhanced Mocks!</h1>
            <p className=" text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              accumsan leo in velit malesuada, sit amet luctus eros efficitur.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

// import React from "react";
// import HeroCard from "./hero-card";

// const FeaturedStudenrs = [
//   {
//     id: 1,
//     name: "Inza Zahra",
//     netScore: 173,
//     enrolledIn: "BBA NBS-2021",
//     photo: "aa",
//     description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
//             veniam inventore tenetur dolorem asperiores possimus consectetur
//             voluptatibus recusandae omnis, assi jji masai ji.`,
//   },
//   {
//     id: 2,
//     name: "M.Yameen",
//     netScore: 164,
//     enrolledIn: "BESE SEECS-2021",
//     photo: "aa",
//     description: `Yameen Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
//             veniam inventore tenetur dolorem asperiores possimus consectetur
//             voluptatibus recusandae omnis, assi jji masai ji.`,
//   },
//   {
//     id: 3,
//     name: "M.Yameen",
//     netScore: 164,
//     enrolledIn: "BESE SEECS-2021",
//     photo: "aa",
//     description: `Yameen Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
//             veniam inventore tenetur dolorem asperiores possimus consectetur
//             voluptatibus recusandae omnis, assi jji masai ji.`,
//   },
// ];

// function HeroSection() {
//   return (
//     <div className=" bg-[#49ADE5] h-full flex justify-center items-center flex-col ">
//       {FeaturedStudenrs.map((f, index) => (
//         <HeroCard
//           student={f}
//           ind={index}
//           totalStudents={FeaturedStudenrs.length}
//         />
//       ))}
//     </div>
//   );
// }

// export default HeroSection;
