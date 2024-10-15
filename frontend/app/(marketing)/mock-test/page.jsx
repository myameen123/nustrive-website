'use client'
import React, {useState, useEffect} from "react";
import TestOverview from "./_components/test-overview";
// import TestModals from "./_components/test-modals";
import TestModal from "./_components/test-modal";
import axios from "axios";

function TestPage() {
  const [test, setTest] = useState([]);

  useEffect(()=>{
    fetchTest()
  },[])

  const fetchTest = async() =>{
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/engineering/get`)

      // const tes = response.data;
      setTest(response.data)
    }catch(err){
      console.log(err.message)
    }
  }

  console.log('test in test-modals: ',test)

  // let TEST = [

  //   {
  //     id: '1',
  //     subjects: [
  //       "Chemistry",
  //       "Mathematics",
  //       "Physics",
  //       "English",
  //       "Intelligence Question",
  //     ],
  //     type: "Engineering",
  //     url: `/mock-test/${test ? test._id : '1'}/instructions`,
  //   },
  //   {
  //     id: "2",
  //     subjects: ["Mathematics", "English", "Intelligence Question"],
  //     type: "Business Studies / Social Sciences / LLB:",
  //     url: "/mock-test/business-test/instructions",
  //   },
  // ];

  // console.log("TEST", TEST)

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
