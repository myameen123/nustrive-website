"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultCard from "./_components/result-card";
import { useParams } from "next/navigation";

function TestFinish() {
  const params = useParams()
  const result = useSelector((state) => state.testResponse);

  const dispatch = useDispatch()
  const testId = params.Test
  useEffect(()=>{
    dispatch(testResponse(testId))
  },[testId])

  console.log(result);
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
