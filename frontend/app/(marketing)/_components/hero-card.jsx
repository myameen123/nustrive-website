import Image from "next/image";
import React from "react";

function HeroCard({ student, ind, totalStudents, sendDataToParent }) {
  const handleClick = (data) => {
    // Simulating some data from the child

    // Call the function passed from the parent, passing data as an argument
    sendDataToParent(data);
  };
  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " .....";
    }
    return text;
  };
  return (
    <div className="md:w-[420px] md:h-[200px] bg-slate-400 mybg ml-auto shadow-lg rounded-[10px] flex flex-col transition-all duration-75">
      <div className="  flex sm:flex-row flex-col p-2 gap-2">
        <div className=" w-[25%]">
          <div className=" w-[82px] h-[82px] border-[3px] rounded-full border-[#4463FB]">{/* 111256 */}
            <Image src={student.photo} alt="img" width={100} height={100} />
          </div>
        </div>
        <div className=" w-75% flex flex-col gap-1">
          <div className=" text-xs font-bold text-[#111256]">
            <p>
              <span className=" text-lg ">{student.name}</span> - NET:
              {student.netScore}
            </p>
            <p>Enrolled In: {student.enrolledIn}</p>
          </div>
          <p className=" text-xs text-white">
            {truncateText(student.description, 28)}
            {/* {student.description} */}
          </p>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        {/* Call generateSpans function to create spans dynamically */}
        {[...Array(totalStudents)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleClick(index)}
            className={` rounded-full inline-block mb-3 cursor-pointer  ${
              index === ind ? "  w-5 h-2  bg-[#111256]" : "bg-white w-2 h-2"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default HeroCard;
