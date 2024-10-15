'use client'
import React, { useEffect } from "react";
import InstructionModal from "../_components/instruction-modal";
import { useParams } from "next/navigation";
import axios from "axios";

function TestInstructions() {

  // const params = useParams()

  // const testId = params.test

  // useEffect(()=>{
  //   fetchQuestion(testId)
  // },[testId])


  // const fetchQuestion = async (testId) =>{
  //   try{
  //     const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/question/engineering/get/test/${testId}`)

  //     console.log('response in test', response.data)
  //   }catch(err){
  //     console.log(err.message)
  //   }
  // }

  return (
    <div className="w-full p-4">
      <InstructionModal category="enginerring" />
    </div>
  );
}

export default TestInstructions;