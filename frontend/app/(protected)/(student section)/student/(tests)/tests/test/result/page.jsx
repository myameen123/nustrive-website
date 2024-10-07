"use client";
import React from "react";
import { useSelector } from "react-redux";
import ResultCard from "./_components/result-card";

function TestFinish() {
  const result = useSelector((state) => state.businessTestResponse);
  // console.log(result);
  return (
    <div className=" h-screen px-4">
      {!result.loading ? (
        <ResultCard result={result.result} />
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
}

export default TestFinish;
