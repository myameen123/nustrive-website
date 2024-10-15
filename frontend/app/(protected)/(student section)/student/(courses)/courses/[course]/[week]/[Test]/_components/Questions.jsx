"use client";
import React, { useEffect, useState } from "react";
import TestButton from "./test-button";
import { IoArrowRedoSharp, IoArrowUndo } from "react-icons/io5";
import { ImNext2, ImPrevious2 } from "react-icons/im";
import { ClipboardList, Play, Save } from "lucide-react";
import TimeCount from "./time-count";
import { useRouter } from "next/navigation";
import Loader from "../../../../../../../../../../components/modals/loader";
import { CldImage } from "next-cloudinary";
import { useDispatch } from "react-redux";


function Questions({ questions, title, category, sections }) {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(questions.subject);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isFirstSection, setIsFirstSection] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeFinshed, setTimeFinished] = useState(false);
  const [isLastSection, setIsLastSection] = useState(false);
  const [questionsUpdated, setQuestionsUpdated] = useState(false); // New state variable
  const [isSavedisabled, setIsSaveDisabled] = useState(
    filteredQuestions[currentQuestionIndex]?.isSaved || selectedOption == null
  );
  const [isReviewdisabled, setIsReviewDisabled] = useState(
    !filteredQuestions[currentQuestionIndex]?.isSaved ||
      selectedOption == null ||
      filteredQuestions[currentQuestionIndex]?.isReviewed
  );

  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  console.log('questions in questions', questions)
  
  useEffect(() => {
    // console.log("questions", questions);
    // Filter questions based on the current section
    const filtered = questions.filter(
      (question) => question.subject === currentSection
    );
    // console.log(filtered);
    setFilteredQuestions(filtered);
    // setCurrentQuestionIndex(0); // Reset question index

    // Check if the current section is the first section
    setIsFirstSection(sections.indexOf(currentSection) === 0);

    // Check if the current section is the last section
    setIsLastSection(sections.indexOf(currentSection) === sections.length - 1);
  }, [currentSection, questionsUpdated, questions, currentQuestionIndex]);

  // Function to handle moving to the next question
  const questionIndex = () => {
    console.log('filteredQuestions',filteredQuestions)
    const id = filteredQuestions[currentQuestionIndex]?._id;
    // console.log(id);
    return questions.findIndex((question) => question._id === id);
  };

  // Function to handle moving to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (!isLastSection) {
      nextSection();
      setCurrentQuestionIndex(0);
    }
  };

  // Function to handle moving to the previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (!isFirstSection) {
      prevSection();
      setCurrentQuestionIndex(filteredQuestions.length - 1);
    }
  };

  // Function to move to the first question of the current section
  const firstQuestion = () => {
    setCurrentSection(sections[0]);
    setCurrentQuestionIndex(0);
  };

  // Function to move to the last question of the current section
  const lastQuestion = () => {
    const lastSection = sections[sections.length - 1];
    const filteredLastSectionQuestions = questions.filter(
      (question) => question.subject === lastSection
    );
    // console.log(lastSection);
    // console.log(filteredLastSectionQuestions.length - 1);
    setCurrentSection(lastSection);
    setCurrentQuestionIndex(filteredLastSectionQuestions.length - 1);
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
  // const sections = ["math", "english", "iq"];

  // Function to handle radio button selection
  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
    setIsSaveDisabled(false);
    setIsReviewDisabled(true);
  };

  const onSaveHandler = (id) => {
    const storedQuestions =
      JSON.parse(
        localStorage.getItem(
          category ="test"
        )
      ) || [];
    // console.log("simple", storedQuestions);
    const updatedQuestions = storedQuestions.map((question) => {
      if (question._id === id) {
        return {
          ...question,
          isSaved: true,
          isReviewed: false,
          selectedOption,
        };
      }

      return question;
    });
    // localStorage.setItem(
    //   category === "Business" ? "businessTest" : "engineeringTest",
    //   JSON.stringify(updatedQuestions)
    // );

    if (category === "test") {
      localStorage.setItem("test", JSON.stringify(updatedQuestions));
      dispatch(getTest());
    } 
    // Set state variable to trigger re-render after questions update

    setIsSaveDisabled(true);
    setIsReviewDisabled(false);
  };

  const onReviewHandler = (id) => {
    // Retrieve questions array from local storage
    const storedQuestions =
      JSON.parse(
        localStorage.getItem(
          category === "test"
        )
      ) || [];

    // Find the question with the corresponding ID
    const updatedQuestions = storedQuestions.map((question) => {
      if (question._id === id) {
        // Update the isSaved property to true
        return { ...question, isReviewed: true };
      }
      return question;
    });

    // Save the updated questions array back to local storage
    // localStorage.setItem(
    //   category === "Business" ? "businessTest" : "engineeringTest",
    //   JSON.stringify(updatedQuestions)
    // );
    // dispatch(getEngineeringTest());

    if (category === "test") {
      localStorage.setItem("test", JSON.stringify(updatedQuestions));
      dispatch(getTest());
    }
    setIsReviewDisabled(true);
  };

  useEffect(() => {
    // console.log("currentQuestionIndex", currentQuestionIndex);
    if (
      filteredQuestions.length > 0 &&
      filteredQuestions[currentQuestionIndex].isSaved
    ) {
      // console.log("saved");
      // console.log(filteredQuestions[currentQuestionIndex].selectedOption);
      setSelectedOption(filteredQuestions[currentQuestionIndex].selectedOption);
      if (!filteredQuestions[currentQuestionIndex].isReviewed) {
        setIsReviewDisabled(false);
      }
    } else {
      setSelectedOption(null);
      setIsReviewDisabled(true);
    }
  }, [questionsUpdated, currentQuestionIndex]);

  const onFinishHandler = () => {
    setCheck(true);
    if (category === "test") {
      dispatch(businesstestResponse());
      localStorage.removeItem("startTime");
      localStorage.removeItem("test");

      router.push("/mock-test/business-test/result");
    } else {
      dispatch(engineeringTestResponse());
      localStorage.removeItem("startTime");
      localStorage.removeItem("test");
      router.push("/mock-test/engineering-test/result");
    }
  };
  const handleFinsheValue = (val) => {
    setTimeFinished(val);
  };
  if (timeFinshed) {
    onFinishHandler();
    setTimeFinished(false);
  }
  return (
    <div className=" mb-4 p-2 ">
      {/* {filteredQuestions.length > 0 ? ( */}
        <div className=" border border-[#111256] sm:w-[95%  ] mx-auto mt-2 relative text-sm">
          <div className=" w-full border-b flex flex-col sm:flex-row justify-between items-center p-2 border-[#111256]">
            <span className=" text-green-700 font-semibold">{category}</span>
            <span className=" text-red-700 font-bold">{title}</span>
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
                  {filteredQuestions[currentQuestionIndex]?.image.length > 0 ? (
                    <div className=" flex flex-col justify-center items-center p-1 border border-black">
                      <p className=" text-base font-semibold my-2">
                        {filteredQuestions[currentQuestionIndex].text}
                      </p>

                      <CldImage
                        width="500"
                        height="500"
                        src={
                          filteredQuestions[currentQuestionIndex].image[0]
                            .imgUrl
                          // `https://res.cloudinary.com/dgdkjf9ng/image/upload/v1715367002/BusinessQuestions/dzpfc6a5sqzc6qih4flu.png`
                        }
                      />
                    </div>
                  ) : (
                    <textarea
                      name=""
                      id=""
                      cols="110"
                      rows="6"
                      className="bg-white w-full border border-[#111256] p-1"
                      readOnly
                      // defaultValue={filteredQuestions[currentQuestionIndex].text} // Use defaultValue to set the initial value
                      value={filteredQuestions[currentQuestionIndex]?.text}
                    />
                  )}
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
            {filteredQuestions[currentQuestionIndex]?.options.map(
              (option, index) => (
                <div key={index} className="py-1 px-1 w-full flex gap-1">
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
                    className=" w-full border border-black px-2 py-2"
                  >
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
          <div className=" border border-[#111256] py-2 flex flex-col gap-2">
            <div className=" flex justify-between gap-2 md:gap-2 w-full">
              <TimeCount handleFinsheValue={handleFinsheValue} />
              <div className=" flex gap-1 flex-wrap justify-center">
                <TestButton
                  Icon={Save}
                  text="Save"
                  onClick={() =>
                    onSaveHandler(filteredQuestions[currentQuestionIndex]._id)
                  }
                  disable={isSavedisabled}
                />
                <TestButton
                  Icon={Play}
                  text="Next"
                  onClick={nextQuestion}
                  disable={questionIndex() === questions.length - 1}
                />
                <TestButton
                  Icon={Play}
                  text="Prev"
                  onClick={prevQuestion}
                  disable={questionIndex() === 0}
                />
                <TestButton
                  Icon={ClipboardList}
                  text="Review"
                  disable={isReviewdisabled}
                  //   filteredQuestions[currentQuestionIndex].isSaved == false
                  // }
                  onClick={() =>
                    onReviewHandler(filteredQuestions[currentQuestionIndex]._id)
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
                  disable={questionIndex() === 0}
                />
                <TestButton
                  Icon={ImNext2}
                  text="Last"
                  onClick={lastQuestion}
                  disable={questionIndex() === questions.length - 1}
                />
              </div>
            </div>
            <button
              className=" text-blue-600 text-center"
              onClick={onFinishHandler}
            >
              Click Here to FINISH Your Test
            </button>
          </div>
          {check && <Loader />}
        </div>
      {/* ) : (
        <div className=" h-screen relative">
          <Loader />
        </div>
      )} */}
    </div>
  );
}

export default Questions;


// "use client";
// import React, { useEffect, useState } from "react";
// import TestButton from "./test-button";
// import { IoArrowRedoSharp, IoArrowUndo } from "react-icons/io5";
// import { ImNext2, ImPrevious2 } from "react-icons/im";
// import { ClipboardList, Play, Save } from "lucide-react";
// import TimeCount from "./time-count";
// import { useRouter, useParams } from "next/navigation";
// import Loader from "../../../../../../../../../../components/modals/loader";
// import { CldImage } from "next-cloudinary";
// import { useDispatch } from "react-redux";

// function Questions({ questions, title, category, sections }) {
//   const params = useParams();

//   const router = useRouter();
//   const [currentSection, setCurrentSection] = useState(sections[0]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [isFirstSection, setIsFirstSection] = useState(true);
//   const [isLastSection, setIsLastSection] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isSavedisabled, setIsSaveDisabled] = useState(true);
//   const [isReviewdisabled, setIsReviewDisabled] = useState(true);
//   const [timeFinished, setTimeFinished] = useState(false);
//   const [check, setCheck] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const filtered = questions.filter(
//       (question) => question.subject === currentSection
//     );
//     setFilteredQuestions(filtered);
//     setIsFirstSection(sections.indexOf(currentSection) === 0);
//     setIsLastSection(sections.indexOf(currentSection) === sections.length - 1);
//   }, [currentSection, questions]);

//   useEffect(() => {
//     if (timeFinished) {
//       onFinishHandler();
//       setTimeFinished(false);
//     }
//   }, [timeFinished]);

//   const questionIndex = () => {
//     const currentQuestion = filteredQuestions[currentQuestionIndex];
//     return questions.findIndex((question) => question._id === currentQuestion?._id);
//   };

//   const nextQuestion = () => {
//     if (currentQuestionIndex < filteredQuestions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else if (!isLastSection) {
//       nextSection();
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     } else if (!isFirstSection) {
//       prevSection();
//     }
//   };

//   const nextSection = () => {
//     const nextSectionIndex = (sections.indexOf(currentSection) + 1) % sections.length;
//     setCurrentSection(sections[nextSectionIndex]);
//   };

//   const prevSection = () => {
//     const prevSectionIndex = (sections.indexOf(currentSection) - 1 + sections.length) % sections.length;
//     setCurrentSection(sections[prevSectionIndex]);
//   };

//   const handleOptionSelect = (event) => {
//     setSelectedOption(event.target.value);
//     setIsSaveDisabled(false);
//     setIsReviewDisabled(true);
//   };

//   const onSaveHandler = (id) => {
//     // Implement saving logic
//     setIsSaveDisabled(true);
//     setIsReviewDisabled(false);
//   };

//   const onReviewHandler = (id) => {
//     // Implement review logic
//     setIsReviewDisabled(true);
//   };

//   const onFinishHandler = () => {
//     setCheck(true);
//     // Dispatch finish action here
//     router.push(`/student/courses/${params.course}/${params.week}/${params.Test}/result`);
//   };

  

//   return (
//     <div className="mb-4 p-2">
//       {filteredQuestions.length > 0 ? (
//         <div className="border border-[#111256] sm:w-[95%] mx-auto mt-2 relative text-sm">
//           <div className="w-full border-b flex justify-between items-center p-2 border-[#111256]">
//             <span className="text-green-700 font-semibold">{category}</span>
//             <span className="text-red-700 font-bold">{title}</span>
//             <span>NUST05</span>
//           </div>

//           <div className="p-2 bg-[#F0F8FF] pt-2">
//             <span className="font-semibold">Question</span>
//             {filteredQuestions[currentQuestionIndex]?.image?.length > 0 ? (
//               <CldImage
//                 width="500"
//                 height="500"
//                 src={filteredQuestions[currentQuestionIndex].image[0].imgUrl}
//               />
//             ) : (
//               <textarea
//                 cols="110"
//                 rows="6"
//                 className="bg-white w-full border border-[#111256] p-1"
//                 readOnly
//                 value={filteredQuestions[currentQuestionIndex]?.text}
//               />
//             )}
//           </div>

//           <div>
//             {filteredQuestions[currentQuestionIndex]?.options.map((option, index) => (
//               <div key={index} className="py-1 px-1 w-full flex gap-1">
//                 <input
//                   type="radio"
//                   id={`option${index}`}
//                   name="options"
//                   value={option}
//                   checked={selectedOption === option}
//                   onChange={handleOptionSelect}
//                 />
//                 <label htmlFor={`option${index}`} className="w-full border border-black px-2 py-2">
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>

//           <div className="border border-[#111256] py-2 flex flex-col gap-2">
//             <div className="flex justify-between gap-2 md:gap-2 w-full">
//               <TimeCount handleFinsheValue={setTimeFinished} />
//               <div className="flex gap-1 flex-wrap justify-center">
//                 <TestButton
//                   Icon={Save}
//                   text="Save"
//                   onClick={() => onSaveHandler(filteredQuestions[currentQuestionIndex]._id)}
//                   disable={isSavedisabled}
//                 />
//                 <TestButton
//                   Icon={Play}
//                   text="Next"
//                   onClick={nextQuestion}
//                   disable={currentQuestionIndex === filteredQuestions.length - 1 && isLastSection}
//                 />
//                 <TestButton
//                   Icon={Play}
//                   text="Prev"
//                   onClick={prevQuestion}
//                   disable={currentQuestionIndex === 0 && isFirstSection}
//                 />
//                 <TestButton
//                   Icon={ClipboardList}
//                   text="Review"
//                   onClick={() => onReviewHandler(filteredQuestions[currentQuestionIndex]._id)}
//                   disable={isReviewdisabled}
//                 />
//                 <TestButton
//                   Icon={IoArrowUndo}
//                   text="Prev Section"
//                   onClick={prevSection}
//                   disable={isFirstSection}
//                 />
//                 <TestButton
//                   Icon={IoArrowRedoSharp}
//                   text="Next Section"
//                   onClick={nextSection}
//                   disable={isLastSection}
//                 />
//                 <TestButton
//                   Icon={ImPrevious2}
//                   text="First"
//                   onClick={() => setCurrentQuestionIndex(0)}
//                   disable={currentQuestionIndex === 0 && isFirstSection}
//                 />
//                 <TestButton
//                   Icon={ImNext2}
//                   text="Last"
//                   onClick={() => setCurrentQuestionIndex(filteredQuestions.length - 1)}
//                   disable={currentQuestionIndex === filteredQuestions.length - 1 && isLastSection}
//                 />
//               </div>
//             </div>
//             <button className="text-blue-600 text-center" onClick={onFinishHandler}>
//               Click Here to FINISH Your Test
//             </button>
//           </div>
//           {check && <Loader />}
//         </div>
//       ) : (
//         <Loader />
//       )}
//     </div>
//   );
// }

// export default Questions;
