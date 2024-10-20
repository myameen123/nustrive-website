"use client";
import React, { useEffect, useState } from "react";
import Questions from "../../_components/Questions";
import axios from "axios";
import { useParams } from "next/navigation";

function EngineeringTestStart() {
  const params = useParams();

  const testId = params.test;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const [duration, setDuration] = useState()


  const saveCurrentTime = () => {
    const currentTime = new Date().getTime();
    localStorage.setItem("startTime", currentTime);
  };
  localStorage.setItem('duration', duration)

  useEffect(()=>{
    fetchTest(testId)
  },[testId])

  // Load questions from localStorage or fetch from backend when component mounts
  useEffect(() => {
    fetchEngineeringTest(testId);
    
  }, [testId]); // Runs whenever `testId` changes
  
  const fetchTest = async (id) =>{
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/engineering/get/${id}`)
      console.log('response.data int start: ',response.data.duration)
      setDuration(response.data.duration)
    }catch(error){
      console.log('error in start: ', error.message)
    }
  }

  // Fetch test questions from localStorage or backend
  const fetchEngineeringTest = async (testId) => {
    try {
      setLoading(true);
      // Check if questions exist in localStorage
      const storedQuestions = localStorage.getItem("engineeringTest");
      if (storedQuestions) {
        setQuestions(JSON.parse(storedQuestions));
        setLoading(false);
        // return;
      }

      // Fetch from the backend if not in localStorage
      saveCurrentTime();
      const config = {
        withCredentials: true,
      };

      console.log("Fetching questions for testId:", testId);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/engineering/get/test/${testId}`,
        config
      );

      console.log("Response data:", response.data);

      setQuestions(response.data.questions || response.data);
      setError("");

      // Save to localStorage
      localStorage.setItem(
        "engineeringTest",
        JSON.stringify(response.data.questions || response.data)
      );
    } catch (error) {
      console.log("Error fetching questions:", error);
      setError(error.response?.data?.message || error.message);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  console.log("engineeringTest in page start", questions);

  return (
    <div className=" min-h-screen"> 
      {/* <Test /> */}
      {questions && (
        // <QuestionDisplay questions={questions.questions} />
        <Questions
          questions={questions}
          sections={["maths", "physics", "chemistry", "english", "iq"]}
          title="Engineering/Computer Science/BS Mathematics (With Chemistry)"
          category="Chemistry"
        />
      )}
    </div>
  );
}

export default EngineeringTestStart;
