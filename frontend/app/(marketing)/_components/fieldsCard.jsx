import Image from "next/image";
import React from "react";
import examImg from '../../../public/examImg.svg'
// import { Button } from "../../../components/ui/button";
import Link from "next/link";

function FieldsCard({ test}) {

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " .....";
    }
    return text;
  };

  return (
    <div className="mx-auto bg-[#4463FB] rounded-[10px] flex flex-col items-center h-[40rem]  justify-between"> {/* md:w-[33.33%] sm:w-[60%] w-[95%]   h-[600px]  md:w-[350px] w-[330px]*/}
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
      <div className="w-full flex justify-center mb-4 text-center  ">
        <Link href={test.url} className="bg-[#ffffff] hover:bg-[#ffffff]/90 rounded-[7px] text-black w-[90%] h-10 content-center">
        TAKE A TRIAL
      </Link>
    </div>
    </div>
  );
}

export default FieldsCard; 