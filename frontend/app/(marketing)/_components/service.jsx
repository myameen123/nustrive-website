// "use client";
import Image from "next/image";
import React from "react";
// import { useInView } from "react-intersection-observer";

function Service({service }) {
  // const [ref, inView] = useInView({
  //   triggerOnce: false, // Only trigger once when entering the viewport
  //   threshold: 0.2, // Adjust the threshold as needed
  // });
  return (
    <div className={`bg-[#CDCDCD]   rounded-[10px] pl-4 pt-4 pb-4 shadow-lg gap-6 md:gap-6 mx-auto  `}> {/* ${inView ? service.annimationClass : "opacity-0"} ref={ref} h-[200px]  md:w-[350px] w-[330px] */}
      <div className=" flex items-center">
        <Image src={service.imgSrc} alt="icon" width={25} height={25} />
      </div>
      <div className=" ">
        <h1 className=" text-[#000000] font-bold text-lg mb-2">{service.title}</h1>
        <p className=" text-[#000000]">{service.desc}</p>
      </div>
    </div>
  );
}

export default Service;
