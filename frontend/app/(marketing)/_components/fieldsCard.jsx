import Image from "next/image";
import React from "react";
import examImg from "@/public/examImg.svg";
// import { Button } from "@mui/material";
import { Button } from "@/components/ui/button";
function FieldsCard({ test}) {

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " .....";
    }
    return text;
  };

  return (
    <div className="mx-auto bg-[#4463FB] rounded-[10px] flex flex-col items-center h-[600px]  md:w-[350px] w-[330px]"> {/* md:w-[33.33%] sm:w-[60%] w-[95%] */}
      <div>
        <Image src={examImg} alt="exam img" className=" w-[950px]" />
      </div>
      <div className="p-8  flex flex-col items-center  gap-2">
        <h2 className=" text-xl font-bold text-[#030303]">{test.title}</h2>
        <p className=" text-white">{truncateText(test.desc, 20)}</p>
        <h3 className={`font-bold `}> Courses Offered </h3> {/*${id === 3 ? "mt-8" : ""}*/}
        <ul className=" grid grid-cols-1  gap-2 text-[#ffffff]  w-full"> {/*list-disc*/}
          {test.courses.map((c, id) => (
            <li key={id} className="text-center">{c}</li>
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
