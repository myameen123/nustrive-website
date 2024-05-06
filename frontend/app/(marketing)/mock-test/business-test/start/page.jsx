"use client";
import { getBusinessTest } from "@/redux/test/get-business-test-slice";
import React, { useEffect, useState } from "react";
// import Test from "../../_components/test";
import { useSelector, useDispatch } from "react-redux";
import Questions from "../../_components/Questions";
// import { addTodo } from "@/redux/todo-slice";

function EngineeringTestStart() {
  const businessTest = useSelector((state) => state.getBusinessTest);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBusinessTest());
  }, [dispatch]);
  return (
    <div className=" min-h-screen">
      {/* <Test /> */}
      {businessTest.questions && (
        // <QuestionDisplay questions={questions.questions} />
        <Questions
          questions={businessTest.questions}
          sections={["math", "english", "iq"]}
          title="Business Studies & Social Sciences"
          category="Business"
        />
      )}
    </div>
  );
}

export default EngineeringTestStart;
