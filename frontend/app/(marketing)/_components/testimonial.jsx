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
    <div className="flex mt-[50px] flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[520px]  md:w-[350px] w-[330px] cursor-pointer bg-[#b6def5] mx-auto">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#111256] rounded-full z-10">
        <Image src={testimonial.photo} alt="img" width={100} height={100} />
      </div>
      <div className="mt-6 flex flex-col items-center text-[#111256] text-left">
        <span className="font-bold">{testimonial.name}</span>
        <span className="font-bold">NET - {testimonial.netScore}</span>
        <span className="font-bold">{testimonial.enrolledIn}</span>
        {/* Apply truncateText function to description */}
        <p className="mt-2 font-semibold text-sm">
          {truncateText(testimonial.description, 100)}
        </p>
      </div>
    </div>
  );
}

export default Testimonial;
