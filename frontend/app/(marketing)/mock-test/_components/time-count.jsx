"use client";
import { LuClock12 } from "react-icons/lu";
import React, { useEffect, useState } from "react";
function TimeCount({ handleFinsheValue }) {
  const [timeRemaining, setTimeRemaining] = useState(180);
  const getTimeFromLocalStorage = () => {
    const startTime = parseInt(localStorage.getItem("startTime"));
    const startDate = new Date(startTime);
    const hours = startDate.getHours();
    const minutes = startDate.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const startTime = parseInt(localStorage.getItem("startTime"));
      const currentTime = new Date().getTime();
      const elapsedTimeInSeconds = (currentTime - startTime) / 1000;
      const remainingTimeInSeconds = 180 * 60 - elapsedTimeInSeconds;

      if (remainingTimeInSeconds <= 0) {
        clearInterval(interval);
        setTimeRemaining(0);
        handleFinsheValue(true);
        // alert("Your time is over!");
      } else {
        setTimeRemaining(Math.ceil(remainingTimeInSeconds / 60));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = `${Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, "0")}:${(timeRemaining % 60).toString().padStart(2, "0")} ${
    timeRemaining >= 720 ? "pm" : "am"
  }`;
  return (
    <div className=" border border-black h-fit">
      <div className=" flex gap-1 border-b p-1 border-black">
        <span>Start Time:</span>
        <span className=" text-blue-600">{getTimeFromLocalStorage()}</span>
      </div>
      <div className=" flex">
        <div className=" bg-[#009933] text-white flex gap-2 p-2 justify-center items-center w-[71%]">
          <p className=" font-bold">
            {timeRemaining === 0
              ? "Time is over!"
              : `${timeRemaining} minutes left`}
          </p>
          {/* <span className="text-xl font-bold">{}</span>
          <span>Min Remaining</span> */}
        </div>
        <div className=" p-2">
          <LuClock12 size={40} />
        </div>
      </div>
    </div>
  );
}

export default TimeCount;
