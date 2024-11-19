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

  const [duration, setDuration] = useState();

  const saveCurrentTime = () => {
    const currentTime = new Date().getTime();
    localStorage.setItem("startTime", currentTime);
  };

  useEffect(() => {
    fetchTestById(testId);
  }, [testId]);

  // Load questions from localStorage or fetch from backend when component mounts
  useEffect(() => {
    fetchTests(testId);
  }, [testId]); // Runs whenever `testId` changes

  useEffect(() => {
    if (duration) {
      localStorage.setItem("duration", duration);
    }
  }, [duration]);

  const fetchTestById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mock-test/get/${id}`
      );
      // console.log('response.data in start: ',response.data.duration)
      setDuration(response.data.duration);
    } catch (error) {
      console.log("error in start: ", error.message);
      {
        error && (
          <div className="p-2 bg-red-100 text-red-800 rounded">
            Error: {error}
          </div>
        );
      }
    }
  };

  // Fetch test questions from localStorage or backend
  const fetchTests = async (testId) => {
    try {
      setLoading(true);
      // Check if questions exist in localStorage
      const storedQuestions = localStorage.getItem("Test");
      if (storedQuestions) {
        setQuestions(JSON.parse(storedQuestions));
        setLoading(false);
        // return JSON.parse(storedQuestions);
      }

      // Fetch from the backend if not in localStorage
      saveCurrentTime();
      const config = {
        withCredentials: true,
      };

      // console.log("Fetching questions for testId:", testId);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mock-question/getTest/${testId}`,
        config
      );

      // console.log("Response data:", response.data);

      setQuestions(response.data.questions || response.data);
      setError("");

      // Save to localStorage
      localStorage.setItem(
        "Test",
        JSON.stringify(response.data.questions || response.data)
      );
    } catch (error) {
      {
        error && (
          <div className="p-2 bg-red-100 text-red-800 rounded">
            Error: {error}
          </div>
        );
      }
      console.log("Error fetching questions:", error);
      setError(error.response?.data?.message || error.message);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  // console.log("engineeringTest in page start", questions);

  return (
    <div className=" min-h-screen">
      {/* <Test /> */}
      {questions && (
        // <QuestionDisplay questions={questions.questions} />
        <Questions
          questions={questions}
          sections={["maths", "physics", "english"]}
          title="Engineering/Computer Science/BS Mathematics"
          // category={'fff'}
        />
      )}
      {error && (
        <div className="p-2 bg-red-100 text-red-800 rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
}

export default EngineeringTestStart;
