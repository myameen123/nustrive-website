import React from "react";

function Criteria() {
  return (
    <div className=" md:w-[30%] border-x">
      <p className=" border-y-2 text-center font-bold">Criteria</p>
      <div>
        <div className="1st row flex border-y w-full">
          <div className="border-r w-[30%] flex justify-center items-center">
            <p className=" ">FSC</p>
          </div>
          <div className=" w-[70%] ">
            <div className=" border-b flex justify-between px-2">
              <span>NET</span>
              <span>75%</span>
            </div>
            <div className=" border-b flex justify-between px-2">
              <span>FSC-1</span>
              <span>15%</span>
            </div>
            <div className=" border-b flex justify-between px-2">
              <span>Matric</span>
              <span>10%</span>
            </div>
          </div>
        </div>
        <div className="1st row flex border-y w-full">
          <div className="border-r w-[30%] flex justify-center items-center">
            <p className=" ">O-Level</p>
          </div>
          <div className=" w-[70%] ">
            <div className=" border-b flex justify-between px-2">
              <span>NET</span>
              <span>75%</span>
            </div>
            <div className=" border-b flex justify-between px-2">
              <span>O-Level</span>
              <span>25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Criteria;
