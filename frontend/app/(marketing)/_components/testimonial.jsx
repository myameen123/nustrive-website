import Image from "next/image";
import React from "react";

function Testimonial({ testimonial }) {
  // Function to truncate text to a certain number of words
  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " .....";
    }
    return text;
  };

  return (
    <div className="flex  flex-col gap-6 mb-8 group relative shadow-lg text-black rounded-xl px-6 py-8 h-[400px]  md:w-[350px] w-[330px] cursor-pointer bg-[#ffffff] mx-auto">
      
      <div className="mt-2 flex flex-col items-center text-[#000000] text-left">
        <span className="font-bold">{testimonial.title}</span>
        {/* Apply truncateText function to description */}
        <p className="mt-2 font-semibold text-[0.8rem]">
          {truncateText(testimonial.description, 50)}
        </p>
      </div>
      <div className="flex ">
        <div className=" bottom-20  left-8 w-20 h-20 bg-[#111256] rounded-full">{/*transform -translate-x-1/2 -translate-y-1/2*/}
          <Image src={testimonial.photo} alt="img" width={80} height={80} />
        </div>
        <div className="bottom-20 pl-2">
            <span className="font-bold block">{testimonial.name}</span>
            <span className="font-bold block">NET - {testimonial.netScore}</span>
            <span className="font-bold block">{testimonial.enrolledIn}</span>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
