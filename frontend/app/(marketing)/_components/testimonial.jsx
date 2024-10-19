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
    <div className="flex flex-col gap-6 mb-8 group relative shadow-lg text-black rounded-xl px-4 py-4 cursor-pointer bg-[#ffffff] mx-auto max-w-[350px] h-[32rem] sm:h-[30rem]  lg:h-[32rem]">{/*  md:w-[300px] w-[300px]*/}
      <div className="mt-2 flex flex-col items-center text-center">
        <span className="font-bold text-lg">{testimonial.title}</span>
        {/* Apply truncateText function to description */}
        <p className="mt-2 font-medium text-[0.9rem] text-[#333333]">
          {truncateText(testimonial.description, 55)}
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4  ">
        <div className="w-20 h-20 bg-[#111256] rounded-full flex items-center justify-center"> {/*transform -translate-x-1/2 -translate-y-1/2*/}
          <Image src={testimonial.photo} alt="img" width={80} height={80} />
        </div>
        <div className="flex flex-col justify-center">
            <span className="font-bold tex-[1rem]">{testimonial.name}</span>
            <span className="font-semibold text-[0.9rem]">NET - {testimonial.netScore}</span>
            <span className="font-medium text-[0.85rem]">{testimonial.enrolledIn}</span>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;