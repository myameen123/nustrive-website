"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Questions from "../../_components/Questions";
import { getEngineeringTest } from "@/redux/test/get-engineering-test-slice";
// import Test from "../../_components/test";
// import { addTodo } from "@/redux/todo-slice";

function EngineeringTestStart() {
  const engineeringTest = useSelector((state) => state.getEngineeringTest);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEngineeringTest());
  }, [dispatch]);
  return (
    <div className=" min-h-screen">
      {/* <Test /> */}
      {engineeringTest.questions && (
        // <QuestionDisplay questions={questions.questions} />
        <Questions
          questions={engineeringTest.questions}
          sections={["math", "physics", "chemistry", "english", "iq"]}
          title="Engineering/Computer Science/BS Mathematics (With Chemistry)"
          category="Chemistry"
        />
      )}
    </div>
  );
}

export default EngineeringTestStart;