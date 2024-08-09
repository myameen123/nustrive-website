import Image from "next/image";
import React from "react";
import examImg from "@/public/examImg.svg";
// import { Button } from "@mui/material";
import { Button } from "@/components/ui/button";
function FieldsCard({ title, desc, courses}) {

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " .....";
    }
    return text;
  };

  return (
    <div className=" md:w-[33.33%] sm:w-[60%] w-[95%] mx-auto bg-[#4463FB] rounded-[10px] flex flex-col items-center">
      <div>
        <Image src={examImg} alt="exam img" className=" w-[950px]" />
      </div>
      <div className="p-8  flex flex-col items-center  gap-2">
        <h2 className=" text-xl font-bold text-[#030303]">{title}</h2>
        <p className=" text-white">{truncateText(desc, 20)}</p>
        <h3 className={`font-bold `}> Courses Offered </h3> {/*${id === 3 ? "mt-8" : ""}*/}
        <ul className=" grid grid-cols-1  gap-2 text-[#ffffff]  w-full px-4"> {/*list-disc*/}
          {courses.map((c) => (
            <li key={c.id}>{c}</li>
          ))}
        </ul>
      </div>
      <Button className="mb-4 bg-[#ffffff] hover:bg-[#ffffff]/90 rounded-[7px] text-black w-[90%]">
        TAKE A TRAIL
      </Button>
    </div>
  );
}

export default FieldsCard;
