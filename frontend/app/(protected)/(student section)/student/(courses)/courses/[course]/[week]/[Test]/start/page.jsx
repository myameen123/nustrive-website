"use client";
import {getTest} from '../../../../../../../../../../redux/test/get-test-slice'
import React, { useEffect } from "react";
// import Test from "../../_components/test";
import { useSelector, useDispatch } from "react-redux";
import Questions from '../_components/Questions'
import { useParams } from 'next/navigation';


function TestStart() {
  const params = useParams();
  console.log('params in start: ', params)
  const testId = params.Test
  const test = useSelector((state) => state.getTest);

  console.log('test in start: ', test.questions)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTest(testId));
  }, [dispatch,testId]);

  return (
    <div className=" min-h-screen">
      
      {/* <Test /> */}
      {test.questions && (
        // <QuestionDisplay questions={questions.questions} />
        <Questions
          questions={test.questions}
          sections={[test.questions[0].subject]}
          title="Business Studies & Social Sciences"
          category="test"
        />
      )}
    </div>
  );
}

export default TestStart;
