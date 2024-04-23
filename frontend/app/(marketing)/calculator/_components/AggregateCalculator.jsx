"use client";
import React, { useState } from "react";
import FscCalculator from "./FscCalculator";
import ALevelCalculator from "./ALevelCalculator";

function AggregateCalculator() {
  const [isFCS, setIsFSC] = useState(true);
  const onFSCHandler = () => {
    setIsFSC(true);
  };
  const onALevelHandler = () => {
    setIsFSC(false);
  };
  return (
    <div className=" md:w-[90%] mx-auto bg-[#49ade5] mt-8 py-4 px-2">
      <div className="md:w-[90%] mx-auto">
        <div className=" border-b w-fit mx-auto px-4 border-b-[#111256]">
          <h1 className=" font-bold text-3xl text-center  text-[#111256]">
            NUST Merit Calculator
          </h1>
        </div>
        <div className=" border-b flex justify-center mt-4 gap-4 pt-4">
          <button
            className={`${
              isFCS &&
              "bg-slate-50 p-2 border-2 border-b-0 border-[#111256] rounded-t-[6px]"
            } transition`}
            onClick={onFSCHandler}
          >
            FSC Student
          </button>
          <button
            className={`${
              !isFCS &&
              "bg-slate-50 p-2 border-2 border-b-0 border-[#111256] rounded-t-[6px]"
            } transition`}
            onClick={onALevelHandler}
          >
            A-Level Student
          </button>
        </div>

        {isFCS ? <FscCalculator /> : <ALevelCalculator />}
      </div>
    </div>
  );
}

export default AggregateCalculator;
