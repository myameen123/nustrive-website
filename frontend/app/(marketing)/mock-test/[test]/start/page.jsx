"use client";
// import { getBusinessTest } from "../../../../../redux/test/get-business-test-slice";
import React, { useEffect, useState } from "react";
// import Test from "../../_components/test";
import { useSelector, useDispatch } from "react-redux";
import Questions from "../../_components/Questions";
import axios from "axios";
import { getEngineeringTest } from "../../../../../redux/test/get-engineering-test-slice";
import { useParams } from "next/navigation";
// import { addTodo } from "@/redux/todo-slice";

function EngineeringTestStart() {
  const [engineeringTest, setEngineeringTest] = useState([])

  const params = useParams()

  const testId = params.test

  useEffect(()=>{
    fetchQuestion(testId)
  },[testId])


  const fetchQuestion = async (testId) =>{
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/question/engineering/get/test/${testId}`)

      // console.log('response in start', response.data)
      setEngineeringTest(response.data)
    }catch(err){
      console.log(err.message)
    }
  }

//   const params = useParams()
//   const testId = params.test
//   const engineeringTest = useSelector((state) => state.getEngineeringTest);
//   const dispatch = useDispatch();

//   console.log('testId in start: ', params)
  
//   useEffect(() => {
//     dispatch(getEngineeringTest(testId));
//   }, [dispatch,testId]);
  
// console.log("engineeringTest in page start",engineeringTest)



  return (
    <div className=" min-h-screen">
      {/* <Test /> */}
      {engineeringTest.questions && (
        // <QuestionDisplay questions={questions.questions} />
        <Questions
          questions={engineeringTest.questions}
          sections={["maths", "physics", "chemistry", "english", "iq"]}
          title="Engineering/Computer Science/BS Mathematics (With Chemistry)"
          category="Chemistry"
        />
      )}
    </div>
  );
}

export default EngineeringTestStart;
