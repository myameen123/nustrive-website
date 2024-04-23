import { Grid } from "@mui/material";
import React from "react";
import Criteria from "./_components/Criteria";
import AggregateCalculator from "./_components/AggregateCalculator";

function AggregateCalculatorPage() {
  return (
    <div className=" md:p-4">
      <div className=" md:w-[80%] shadow-lg mx-auto mt-8 p-4">
        <h1 className=" text-4xl text-center font-bold mb-4">
          Nust Aggregate Calculator
        </h1>
        <div className=" flex gap-2 w-full md:flex-row flex-col">
          <p className=" text-slate-400 p-2 md:w-[70%]">
            Do you want to know how to find the aggregate percentage for NUST?
            Now you do not need to worry to calculate it on paper. You just have
            to enter your desired marks to calculator your aggregate. The Nust
            merit criteria is also given to you. According to this criteria,
            your aggregate is calculated. Below you can find the merit
            calculator or aggregate calculator for NUST 2024. O-Level/A-Level
            students can also calculate there aggregate
          </p>
          <Criteria />
        </div>
        <AggregateCalculator />
      </div>
    </div>
  );
}

export default AggregateCalculatorPage;
