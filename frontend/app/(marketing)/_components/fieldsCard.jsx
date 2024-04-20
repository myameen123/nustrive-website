import Image from "next/image";
import React from "react";
import examImg from "@/public/examImg.svg";
// import { Button } from "@mui/material";
import { Button } from "@/components/ui/button";
function FieldsCard({ title, desc, courses, id }) {
  return (
    <div className=" md:w-[33.33%] sm:w-[60%] w-[80%] mx-auto bg-[#8fa1fc] rounded-[10px] flex flex-col items-center">
      <div>
        <Image src={examImg} alt="exam img" className=" w-[950px]" />
      </div>
      <div className=" p-8 flex flex-col items-center gap-2">
        <h2 className=" text-xl font-bold text-[#111256s]">{title}</h2>
        <p className=" text-white">{desc}</p>
        <h3 className={`font-bold ${id === 3 ? " mt-10" : ""}`}>
          Courses Offered
        </h3>
        <ul className=" grid grid-cols-2 list-disc gap-4 text-[#111256] font-bold w-full px-4">
          {courses.map((c) => (
            <li>{c}</li>
          ))}
        </ul>
      </div>
      <Button className=" mx-auto bg-[#5d68ba] hover:bg-[#5d68ba]/90 rounded-[7px] mb-2 text-white">
        TAKE A TRAIL
      </Button>
    </div>
  );
}

export default FieldsCard;
