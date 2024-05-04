"use client";
import React, { useEffect, useState } from "react";
import TestButton from "./test-button";
import { IoArrowRedoSharp, IoArrowUndo } from "react-icons/io5";
import { ImNext2, ImPrevious2 } from "react-icons/im";

import { ClipboardList, Play, Save } from "lucide-react";
import TimeCount from "./time-count";
import { getBusinessTestsinessTest } from "@/redux/test/get-business-test-slice";
import { useDispatch } from "react-redux";

function Questions({ questions }) {
  const [currentSection, setCurrentSection] = useState("math");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isFirstSection, setIsFirstSection] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true); // New state variable
  const [isLastQuestion, setIsLastQuestion] = useState(false); // New state variable
  const [isLastSection, setIsLastSection] = useState(false);
  const [questionsUpdated, setQuestionsUpdated] = useState(false); // New state variable
  const [isSavedisabled, setIsSaveDisabled] = useState(
    filteredQuestions[currentQuestionIndex]?.isSaved || selectedOption == null
  );
  const [isReviewdisabled, setIsReviewDisabled] = useState(
    filteredQuestions[currentQuestionIndex]?.isSaved ||
      selectedOption == null ||
      filteredQuestions[currentQuestionIndex]?.isReviewed
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("questions", questions);
    // Filter questions based on the current section
    const filtered = questions.filter(
      (question) => question.subject === currentSection
    );
    setFilteredQuestions(filtered);
    // setCurrentQuestionIndex(0); // Reset question index

    // Check if the current section is the first section
    setIsFirstSection(sections.indexOf(currentSection) === 0);

    console.log("filteredQuestions");
    console.log(!filteredQuestions[currentQuestionIndex]?.isSaved);

    // Check if the current section is the last section
    setIsLastSection(sections.indexOf(currentSection) === sections.length - 1);
    setIsFirstQuestion(currentQuestionIndex === 0 && isFirstSection);
  }, [currentSection, questionsUpdated, questions, currentQuestionIndex]);

  // Function to handle moving to the next question
  const questionIndex = () => {
    const id = filteredQuestions[currentQuestionIndex].id;
    return questions.findIndex((question) => question.id === id);
  };
  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to handle moving to the previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Function to move to the first question of the current section
  const firstQuestion = () => {
    setCurrentSection(sections[0]);
    setCurrentQuestionIndex(0);
  };

  // Function to move to the last question of the current section
  const lastQuestion = () => {
    setCurrentSection(sections[sections.length - 1]);
    setCurrentQuestionIndex(filteredQuestions.length - 1);
  };

  // Function to handle moving to the next section
  const nextSection = () => {
    if (!isLastSection) {
      const currentSectionIndex = sections.indexOf(currentSection);
      setCurrentQuestionIndex(0);
      const nextSectionIndex = (currentSectionIndex + 1) % sections.length;
      setCurrentSection(sections[nextSectionIndex]);
    }
  };

  // Function to handle moving to the previous section
  const prevSection = () => {
    if (!isFirstSection) {
      setCurrentQuestionIndex(0);
      const currentSectionIndex = sections.indexOf(currentSection);
      const prevSectionIndex =
        (currentSectionIndex - 1 + sections.length) % sections.length;
      setCurrentSection(sections[prevSectionIndex]);
    }
  };

  // Array of section names
  const sections = ["math", "english", "iq"];

  // Function to handle radio button selection
  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
    setIsSaveDisabled(false);
    setIsReviewDisabled(true);
  };

  const onSaveHandler = (id) => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    const updatedQuestions = storedQuestions.map((question) => {
      if (question.id === id) {
        return {
          ...question,
          isSaved: true,
          isReviewed: false,
          selectedOption,
        };
      }
      return question;
    });
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    // Set state variable to trigger re-render after questions update
    dispatch(getBusinessTest());
    setIsSaveDisabled(true);
    setIsReviewDisabled(false);
  };

  // useEffect(() => {
  //   // Reset questionsUpdated state variable after re-render
  //   if (questionsUpdated) {
  //     console.log("updated");
  //     setQuestionsUpdated(false);
  //   }
  // }, [questionsUpdated]);

  const onReviewHandler = (id) => {
    // Retrieve questions array from local storage
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];

    // Find the question with the corresponding ID
    const updatedQuestions = storedQuestions.map((question) => {
      if (question.id === id) {
        // Update the isSaved property to true
        return { ...question, isReviewed: true };
      }
      return question;
    });

    // Save the updated questions array back to local storage
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    dispatch(getBusinessTest());
    setIsReviewDisabled(true);
  };
  // const questionIndex = () => {
  //   const id = filteredQuestions[currentQuestionIndex].id;
  //   return questions.findIndex((question) => question.id === id);
  // };

  useEffect(() => {
    if (
      filteredQuestions.length > 0 &&
      filteredQuestions[currentQuestionIndex].isSaved
    ) {
      setSelectedOption(filteredQuestions[currentQuestionIndex].selectedOption);
    } else {
      setSelectedOption(null);
    }
  }, [questionsUpdated, currentQuestionIndex]);

  return (
    <div className=" mb-4 p-2">
      {filteredQuestions.length > 0 ? (
        <div className=" border border-[#111256] sm:w-[95%  ] mx-auto mt-2">
          <div className=" w-full border-b flex flex-col sm:flex-row justify-between items-center p-2 border-[#111256]">
            <span className=" text-green-700 font-semibold">Chemistry</span>
            <span className=" text-red-700 font-bold">
              Engineering/Computer Science/BS Mathematics (With Chemistry)
            </span>
            <span>NUST05</span>
          </div>
          <div className=" w-full">
            <div className=" flex w-full">
              <div className=" border-r border-[#111256] bg-zinc-400 md:w-[85%]">
                {" "}
                <div className=" flex  justify-between border-y bg-[#BCDEF5] border-[#111256] px-2">
                  <div className=" flex font-semibold gap-1">
                    <span>Question No:</span>
                    <span className=" text-blue-700">
                      {questionIndex() + 1} of {questions.length}
                    </span>
                  </div>
                  <div className=" flex font-semibold gap-1">
                    <span>Marks:</span>
                    <span className=" text-blue-700">1</span>
                  </div>
                </div>
                <div className=" p-1  bg-[#F0F8FF] pt-2">
                  <span className=" font-semibold">Question</span>
                  <textarea
                    name=""
                    id=""
                    cols="110"
                    rows="6"
                    className="bg-white w-full border border-[#111256] p-1"
                    readOnly
                    // defaultValue={filteredQuestions[currentQuestionIndex].text} // Use defaultValue to set the initial value
                    value={filteredQuestions[currentQuestionIndex].text}
                  />
                  {/* <p>{filteredQuestions[currentQuestionIndex].text}</p> */}
                </div>
              </div>
              <div className=" bg-[#BCDEF5] w-[15%] p-2 md:flex flex-col hidden">
                <span>Photograph</span>
                <div className=" bg-white h-[150px] flex justify-center items-center p-4 border border-black">
                  {" "}
                  <p className=" font-bold text-lg text-center">
                    Your Image here
                  </p>
                </div>
              </div>
            </div>
            <div className=" border-y bg-[#BCDEF5] flex font-semibold py-1 border-[#111256]">
              <span>Answer</span>
              <span className=" text-blue-700">
                (Please select your correct option)
              </span>
            </div>
          </div>
          <div>
            {filteredQuestions[currentQuestionIndex].options.map(
              (option, index) => (
                <div key={index} className="py-2 px-1 w-full flex gap-2">
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="options"
                    value={option}
                    checked={
                      selectedOption
                        ? selectedOption === option
                        : filteredQuestions[currentQuestionIndex]
                            .selectedOption === option || false
                    }
                    onChange={handleOptionSelect}
                  />
                  <label
                    htmlFor={`option${index}`}
                    className=" w-full border border-black px-2 py-3"
                  >
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
          <div className=" border border-[#111256] py-2 flex flex-col gap-4">
            <div className=" flex justify-between gap-4">
              <TimeCount />
              <div className=" flex gap-1 flex-wrap">
                <TestButton
                  Icon={Save}
                  text="Save"
                  onClick={() =>
                    onSaveHandler(filteredQuestions[currentQuestionIndex].id)
                  }
                  disable={isSavedisabled}
                />
                <TestButton Icon={Play} text="Next" onClick={nextQuestion} />
                <TestButton Icon={Play} text="Prev" onClick={prevQuestion} />
                <TestButton
                  Icon={ClipboardList}
                  text="Review"
                  disable={isReviewdisabled}
                  //   filteredQuestions[currentQuestionIndex].isSaved == false
                  // }
                  onClick={() =>
                    onReviewHandler(filteredQuestions[currentQuestionIndex].id)
                  }
                />
                <TestButton
                  Icon={IoArrowUndo}
                  text="Prev Section"
                  onClick={prevSection}
                  disable={isFirstSection}
                />
                <TestButton
                  Icon={IoArrowRedoSharp}
                  text="Next Section"
                  onClick={nextSection}
                  disable={isLastSection}
                />
                <TestButton
                  Icon={ImPrevious2}
                  text="First"
                  onClick={firstQuestion}
                />
                <TestButton Icon={ImNext2} text="Last" onClick={lastQuestion} />
              </div>
            </div>
            <button className=" text-blue-600 text-center">
              Click Here to FINISH Your Test
            </button>
          </div>
        </div>
      ) : (
        <div className=" h-screen">
          <p className=" text-center text-2xl font-bold text-red-700">
            No questions available
          </p>
        </div>
      )}
    </div>
  );
}

export default Questions;
