'use client'
import React, { useEffect, useState } from "react";
import TestModal from "./test-modal";
import axios from "axios";
import { useParams } from "next/navigation";

const TEST = [
  {
    id: "1",
    subjects: [
      "Chemistry",
      "Mathematics",
      "Physics",
      "English",
      "Intelligence Question",
    ],
    type: "Engineering",
    url: "/mock-test/engineering-test/instructions",
  },
  {
    id: "2",
    subjects: ["Mathematics", "English", "Intelligence Question"],
    type: "Business Studies / Social Sciences / LLB:",
    url: "/mock-test/business-test/instructions",
  },
];
function TestModals() {
  const params = useParams();
  const id = params.Test;

  const [test, setTest] = useState(null)

  useEffect(()=>{
    const fetchTest = async()=>{

      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/get/${id}`)
        if( response.status!==200){
          console.log('An error in occur in response')
        }
        const tests = response.data
        setTest(tests)
      }catch(err){
        console.log(err.message)
      }
    }
    
    fetchTest()
    // setTest(response)
  },[])

  console.log('test: ', test)
  return (
    <div className=" mt-4 sm:p-8 p-4 md:w-[80%] mx-auto flex flex-col gap-8 ">
      {/* {test && test.map((t) => ( */}
        <TestModal test={test}  />
      {/* ))} */}
    </div>
  );
}

export default TestModals;
