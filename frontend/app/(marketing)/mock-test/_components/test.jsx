"use client";
import React, { useEffect, useState } from "react";
// import { questions } from "@/constants/dummy_questions";

const QuestionDisplay = ({ questions }) => {
  const [currentSection, setCurrentSection] = useState("math");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isFirstSection, setIsFirstSection] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLastSection, setIsLastSection] = useState(false);
  const [questionsUpdated, setQuestionsUpdated] = useState(false); // New state variable

  useEffect(() => {
    // Filter questions based on the current section
    const filtered = questions.filter(
      (question) => question.subject === currentSection
    );
    setFilteredQuestions(filtered);
    setCurrentQuestionIndex(0); // Reset question index

    // Check if the current section is the first section
    setIsFirstSection(sections.indexOf(currentSection) === 0);

    // Check if the current section is the last section
    setIsLastSection(sections.indexOf(currentSection) === sections.length - 1);
  }, [currentSection]);

  // Function to handle moving to the next question
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
    setCurrentQuestionIndex(0);
  };

  // Function to move to the last question of the current section
  const lastQuestion = () => {
    setCurrentQuestionIndex(filteredQuestions.length - 1);
  };

  // Function to handle moving to the next section
  const nextSection = () => {
    if (!isLastSection) {
      const currentSectionIndex = sections.indexOf(currentSection);
      const nextSectionIndex = (currentSectionIndex + 1) % sections.length;
      setCurrentSection(sections[nextSectionIndex]);
    }
  };

  // Function to handle moving to the previous section
  const prevSection = () => {
    if (!isFirstSection) {
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
  };

  const onSaveHandler = (id) => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    const updatedQuestions = storedQuestions.map((question) => {
      if (question.id === id) {
        return { ...question, isSaved: true, selectedOption };
      }
      return question;
    });
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    // Set state variable to trigger re-render after questions update
    setQuestionsUpdated(true);
  };

  useEffect(() => {
    // Reset questionsUpdated state variable after re-render
    if (questionsUpdated) {
      // console.log("updated");
      setQuestionsUpdated(false);
    }
  }, [questionsUpdated]);

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
  };

  useEffect(() => {
    if (
      filteredQuestions.length > 0 &&
      filteredQuestions[currentQuestionIndex].isSaved
    ) {
      setSelectedOption(filteredQuestions[currentQuestionIndex].selectedOption);
    }
  }, [questionsUpdated]);

  return (
    <div className=" h-screen">
      {filteredQuestions.length > 0 ? (
        <>
          <div>
            <p>{filteredQuestions[currentQuestionIndex].text}</p>
            <div>
              {filteredQuestions[currentQuestionIndex].options.map(
                (option, index) => (
                  <div key={index}>
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
                    <label htmlFor={`option${index}`}>{option}</label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className=" flex gap-4 mb-4">
            <button
              className=" bg-[#111256] p-4 text-white"
              onClick={prevQuestion}
            >
              Previous
            </button>
            <button
              className=" bg-[#111256] p-4 text-white"
              onClick={nextQuestion}
            >
              Next
            </button>
            <button
              className=" bg-[#111256] p-4 text-white"
              onClick={firstQuestion}
            >
              First
            </button>
            <button
              className=" bg-[#111256] p-4 text-white"
              onClick={lastQuestion}
            >
              Last
            </button>
          </div>

          {/* Section navigation buttons */}
          <div className=" flex gap-4">
            <button
              className=" bg-[#111256] p-4 text-white"
              onClick={prevSection}
              disabled={isFirstSection}
            >
              Previous Section
            </button>
            <button
              className=" bg-[#111256] p-4 text-white"
              onClick={nextSection}
              disabled={isLastSection}
            >
              Next Section
            </button>
            <button
              className=" bg-[#111256] p-4 text-white"
              disabled={selectedOption == null}
              onClick={() =>
                onSaveHandler(filteredQuestions[currentQuestionIndex].id)
              }
            >
              Save
            </button>
            <button
              className=" bg-[#111256] p-4 text-white"
              disabled={!filteredQuestions[currentQuestionIndex].isSaved}
              onClick={() =>
                onReviewHandler(filteredQuestions[currentQuestionIndex].id)
              }
            >
              Review
            </button>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
      {/* Display current question */}
    </div>
  );
};

export default QuestionDisplay;
