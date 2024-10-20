"use client";
import React from "react";
import Teacher from "./teacher";
import Tutors from "../../../constants/teachers";
import Link from "next/link";

const Teachers = ({  }) => {
  return (
    <div className="mt-12 mx-10 ">
      <div>
        <h1 className=" text-center font-bold text-3xl mt-4 text-black mx-4">
          Find Your Perfect Tutor at NUSTrive
        </h1>
        <p className=" text-center  text-[#6E6E6E] mb-4">
          Connect with Top Educators for Entry Level Exams Success
        </p>
      </div>
      <div className="mx-auto max-w-[1200px]">
        <div className="block sm:flex justify-between">
          <h1 className="text-2xl">Top Certified Tutors</h1>
          <Link href={"/tutors"} className="text-[#4463fb] hover:text-red-900 sm:flex">
            Show All Tutors
          </Link>
        </div>
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-x-20 md:gap-x-12 lg:gap-x-16 xl:gap-x-32 !justify-between  mt-4 md:mt-6"
          >
            {Tutors.map((teacher) => (
                <Teacher key={teacher.id} teacher={teacher} />
              ))}
          </div>
      </div>
    </div>
  );
};

export default Teachers;
