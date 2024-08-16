import React from "react";

function Features() {
  return (
    <div className=" flex lg:hidden bg-[#4463FB] mx-4 text-white md:flex-row flex-col md:p-1 sm:px-20 mt-4">
      <div className="flex flex-col gap-2 p-4 items-center border-b-[1rem] md:border-r-2 md:border-b-0">
        <h1 className=" font-bold">NET-Modeled Mock Exams</h1>
        <p className=" text-xs">
          Mock test is designed with the exact NET interface, making it easy for
          you to practice and test your knowledge in different subjects.
        </p>
      </div>
      <div className="flex flex-col gap-2 p-4 items-center border-b-[1rem] md:border-r-2 md:border-b-0">
        <h1 className=" font-bold">Comprehensive Courses</h1>
        <p className=" text-xs">
          Our comprehensive courses provide in-depth learning across a wide
          range of subjects, ensuring thorough preparation for your academic
          journey.
        </p>
      </div>
      <div className="flex flex-col gap-2 p-4 items-center">
        <h1 className=" font-bold">NUST Agreggate Calculator</h1>
        <p className=" text-xs">
          Calculate your NUST aggregate score effortlessly with our
          user-friendly calculator tool.
        </p>
      </div>
    </div>
  );
}

export default Features;
