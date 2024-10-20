"use client";
import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultCard from "./_components/result-card";
import { useParams } from "next/navigation";
import { testResponse } from "../../../../../redux/test/test-response-slice";

function TestFinish() {
  const params = useParams()
  const testId = params.test;
  const result = useSelector((state) => state.testResponse);
  // const dispatch = useDispatch();

  // // Dispatch testResponse when component mounts
  // useEffect(() => {
  //   if (testId) {
  //     dispatch(testResponse(testId));
  //   }
  // }, [dispatch, testId]);
  
  console.log('result', result);
  return (
    <div className=" min-h-screen px-4">
      {!result.loading ? (
        <ResultCard result={result.result} />
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
}

export default TestFinish;
