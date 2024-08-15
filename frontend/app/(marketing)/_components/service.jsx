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
    <div className={`bg-[#CDCDCD] sm:w-[300px] lg:w-[320px]  rounded-[10px]  p-4 shadow-lg md:gap-6 mx-auto `}> {/*${inView ? service.annimationClass : "opacity-0"} ref={ref} */}
      <div className=" flex items-center">
        <Image src={service.imgSrc} alt="icon" width={50} height={50} />
      </div>
      <div className=" ">
        <h1 className=" text-[#000000] font-bold text-lg mb-2">{service.title}</h1>
        <p className=" text-[#000000]">{service.desc}</p>
      </div>
    </div>
  );
}

export default Service;
