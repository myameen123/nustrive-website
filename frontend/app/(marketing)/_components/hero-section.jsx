"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeroCard from "./hero-card";
import { useInView } from "react-intersection-observer";
import { Button } from "../../../components/ui/button";
// import FeaturedStudents from "@/app/constants/header-testimonials";
import FeaturedStudents from "../../../constants/testimonials";

function HeroSection() {
  // const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  // const handleDataFromChild = (data) => {
  //   // Handle the data received from the child component
  //   setCurrentStudentIndex(data);
  // };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentStudentIndex((prevIndex) =>
  //       prevIndex === FeaturedStudents.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, []);

  // const [ref, inView] = useInView({
  //   triggerOnce: false, // Only trigger once when entering the viewport
  //   threshold: 0.2, // Adjust the threshold as needed
  // });
  return (
    <div className=" bg-[#ffffff] relative">
      <div className="flex lg:flex-row flex-col  transition-all items-center duration-75 sm:w-[80%] lg:w-[90%] mx-auto h-full sm:py-8 py-12 sm:px-1 px-4">
        <div className={`flex flex-col items-center justify-center  w-full gap-4 md:mt-12 md:mb-12 mb-4`}>
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center  text-[#000000]">
            <span className="block sm:pb-8 pb-4">Unlock Your Potential Through </span>
          </h1>
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center text-[#000000]">
            <span className=" text-[#4463FB] " > NUSTrive</span>
            <span> In Education</span>
          </h1>
          <p className=" text-black text-md md:text-lg lg:text-xl text-center">
            <span className='block pb-4'>Prepare for NET with Video Lectures, Practice Questions</span>
          </p>
          <p className=" text-black text-md md:text-lg lg:text-xl text-center">  
            <span>and Full-Length Tests Free Trial Available!</span>
          </p>
          
          <div className=" flex justify-center mb-4 text-center px-2 py-2 h-10 bg-[#4463FB] text-white rounded-[7px] w-fit hover:bg-[#4463FB]/90 ">
        <Link href={'/mock-test'}>
        Get Start
      </Link>
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
