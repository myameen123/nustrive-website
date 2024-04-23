import { TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";

function FscCalculator() {
  const [fscObtained, setFscObtained] = useState(null);
  const [fscTotal, setFscTotal] = useState(null);
  const [matricObtained, setMatricObtained] = useState(null);
  const [matricTotal, setMatricTotal] = useState(null);
  const [netMarks, setNetMarks] = useState(null);
  const [totalAggregate, setTotalAggregate] = useState(null);
  const FscObtainedHandler = (e) => {
    setFscObtained(e.target.value);
  };
  const FscTotalHandler = (e) => {
    setFscTotal(e.target.value);
  };
  const matricObtainedHandler = (e) => {
    setMatricObtained(e.target.value);
  };
  const matricTotalHandler = (e) => {
    setMatricTotal(e.target.value);
  };
  const netMarksdHandler = (e) => {
    setNetMarks(e.target.value);
  };
  const onCalculateHandler = () => {
    if (
      fscObtained == null ||
      fscObtained == "" ||
      fscTotal == "" ||
      fscTotal == null ||
      matricObtained == null ||
      matricObtained == "" ||
      matricTotal == null ||
      matricTotal == "" ||
      netMarks == null ||
      netMarks == ""
    ) {
      toast.error(" Please fill all fields");
      return;
    }
    const fscPercentage = (fscObtained / fscTotal) * 15;
    const matricPercentage = (matricObtained / matricTotal) * 10;
    const netPercentage = (netMarks / 200) * 75;
    const aggregate = (
      fscPercentage +
      matricPercentage +
      netPercentage
    ).toFixed(2);

    setTotalAggregate(aggregate);
  };
  return (
    <div className=" transition w-full p-4 flex flex-col gap-4">
      <div className=" w-full flex flex-col md:flex-row">
        <p className=" md:w-[20%] font-bold text-center my-auto text-[#111256]">
          FSC Marks
        </p>
        <div className=" flex w-full gap-4 flex-col md:flex-row ">
          <TextField
            type="number"
            size="small"
            placeholder="Obtained Marks in FSC-1"
            fullWidth
            onChange={FscObtainedHandler}
            required={true}
          />
          <TextField
            type="number"
            size="small"
            placeholder="Total Marks in FSC-1"
            fullWidth
            onChange={FscTotalHandler}
          />
        </div>
      </div>
      <div className=" w-full flex flex-col md:flex-row">
        <p className=" md:w-[20%] font-bold text-center my-auto text-[#111256]">
          Matric Marks
        </p>
        <div className=" flex w-full gap-4 flex-col md:flex-row ">
          <TextField
            type="number"
            size="small"
            placeholder="Obtained Marks in Matric"
            fullWidth
            onChange={matricObtainedHandler}
          />
          <TextField
            type="number"
            size="small"
            placeholder="Total Marks in Matric"
            fullWidth
            onChange={matricTotalHandler}
          />
        </div>
      </div>
      <div className=" w-full flex flex-col md:flex-row">
        <p className=" md:w-[20%] font-bold text-center my-auto text-[#111256]">
          NET Marks
        </p>
        <div className=" flex w-full ">
          <TextField
            type="number"
            size="small"
            placeholder="Obtained Marks in NET (Out of 200)"
            fullWidth
            onChange={netMarksdHandler}
          />
        </div>
      </div>
      {totalAggregate && (
        <div>
          <p className=" text-center my-2 py-2 border-y text-2xl font-bold text-[#111256]">
            Your Aggregate = {totalAggregate} %
          </p>
        </div>
      )}
      <button
        onClick={onCalculateHandler}
        className=" w-fit mx-auto bg-[#111256] text-white p-2 rounded-[6px] hover:bg-[#111256]/90"
      >
        Calculate
      </button>
    </div>
  );
}

export default FscCalculator;
