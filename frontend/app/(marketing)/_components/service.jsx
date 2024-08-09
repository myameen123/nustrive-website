"use client";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

function Service({ imgSrc, title, desc, annimationClass }) {
  const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger once when entering the viewport
    threshold: 0.2, // Adjust the threshold as needed
  });
  return (
    <div
      className={`bg-[#CDCDCD] sm:w-[420px]  rounded-[10px] p-4 shadow-lg flex md:gap-6 mx-auto ${
        inView ? annimationClass : "opacity-0"
      }`}
      ref={ref}
    >
      <div className=" flex items-center">
        <Image src={imgSrc} alt="icon" width={150} height={150} />
      </div>
      <div className=" ">
        <h1 className=" text-[#000000] font-bold text-lg mb-2">{title}</h1>
        <p className=" text-[#000000]">{desc}</p>
      </div>
    </div>
  );
}

export default Service;
