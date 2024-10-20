'use client'
import React, {useState, useEffect} from "react";
import TestOverview from "./_components/test-overview";
import TestModal from "./_components/test-modal";
import axios from "axios";

function TestPage() {
  const [test, setTest] = useState([]);

  useEffect(()=>{
    fetchTest()
  },[])

  const fetchTest = async() =>{
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mock-test/get`)
      // const tes = response.data;
      setTest(response.data)
    }catch(err){
      console.log(err.message)
    }
  }

  // console.log('test in test-modals: ',test)


  return (
    <div>
      <TestOverview />
      {/* <TestModals /> */}
      <div className=" mt-4 sm:p-8 p-4 md:w-[80%] mx-auto flex flex-col gap-8 ">
      {test && test.map((t) => (
        <TestModal test={t} key={t._id} />
      ))}
    </div>
    </div>
  );
}

export default TestPage;
