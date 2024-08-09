// import {
//   Business_Questions,
//   Engineering_Questions,
// } from "../dummy_questions.js";
import shuffle from "lodash/shuffle.js";
import BusinessQuestions from "../models/business-questions.model.js";
import EngineeringQuestions from "../models/enginering-questions.model.js";
// import { Engineering_Questions } from "../dummy_questions.js";
// import { Business_Questions } from "../dummy_questions.js";

export const getBusinessTest = async (req, res) => {
  try {
    // Shuffle options of each question in Business_Questions array

    // const Business_Questions = await BusinessQuestions.find({});
    const mathQuestions = await BusinessQuestions.find({
      subject: "math",
    }).limit(5);
    const englishQuestions = await BusinessQuestions.find({
      subject: "english",
    }).limit(4);
    const iqQuestions = await BusinessQuestions.find({ subject: "iq" }).limit(
      4
    );
    const questionsArray = [
      ...mathQuestions,
      ...englishQuestions,
      ...iqQuestions,
    ];
    const shuffledQuestions = questionsArray.map((question) => {
      // Shuffle the options array using lodash shuffle function
      const shuffledOptions = shuffle(question.options);

      // Return the question object with shuffled options
      return {
        ...question._doc, // Use ._doc to get the document object without mongoose metadata
        options: shuffledOptions,
      };
    });

    res.status(200).json({
      message: "Successfully",
      questions: shuffledQuestions,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const businessTestResponse = async (req, res) => {
  try {
    const Business_Questions = await BusinessQuestions.find();
    const questions = req.body;
    const subjects = ["math", "english", "iq"];
    const subjectQuestions = subjects.map((subject) =>
      Business_Questions.filter((question) => question.subject === subject)
    );
    const correctAnswers = subjectQuestions.map((questions) =>
      questions.map((question) => question.options[0])
    );
    const solvedQuestions = subjects.map((subject) =>
      questions.filter((question) => question.subject === subject)
    );
    const subjectResults = subjectQuestions.map((questions, index) =>
      solvedQuestions[index].map(
        (question, i) => question.selectedOption === correctAnswers[index][i]
      )
    );
    const scores = subjectResults.map(
      (results) => results.filter((result) => result).length
    );
    const totalScore = scores.reduce((acc, score) => acc + score, 0);

    res.status(200).json({
      message: "Successfully",
      result: {
        totalScore,
        mathScore: scores[0],
        englishScore: scores[1],
        iqScore: scores[2],
        totalQuestions: questions.length,
        totalMathQuestions: subjectQuestions[0].length,
        totalEnglishQuestions: subjectQuestions[1].length,
        totaliqQuestions: subjectQuestions[2].length,
        resultPersentage: (totalScore / questions.length) * 100,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getEngineeringTest = async (req, res) => {
  try {
    // Shuffle options of each question in Business_Questions array

    const mathQuestions = await EngineeringQuestions.find({
      subject: "math",
    }).limit(6);
    const physicsQuestions = await EngineeringQuestions.find({
      subject: "physics",
    }).limit(5);
    const chemistryQuestions = await EngineeringQuestions.find({
      subject: "chemistry",
    }).limit(5);
    const englishQuestions = await EngineeringQuestions.find({
      subject: "english",
    }).limit(4);
    const iqQuestions = await EngineeringQuestions.find({
      subject: "iq",
    }).limit(3);

    // Organize questions into an array in the specified order
    const questionsArray = [
      ...mathQuestions,
      ...physicsQuestions,
      ...chemistryQuestions,
      ...englishQuestions,
      ...iqQuestions,
    ];

    const shuffledQuestions = questionsArray.map((question) => {
      // Shuffle the options array using lodash shuffle function
      const shuffledOptions = shuffle(question.options);

      // Return the question object with shuffled options
      return {
        ...question._doc, // Use ._doc to get the document object without mongoose metadata
        // ...question, // Use ._doc to get the document object without mongoose metadata
        options: shuffledOptions,
      };
    });

    res.status(200).json({
      message: "Successfully",
      questions: shuffledQuestions,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const engineeringTestResponse = async (req, res) => {
  try {
    const Engineering_Questions = await EngineeringQuestions.find();
    const questions = req.body;
    const subjects = ["math", "physics", "chemistry", "english", "iq"];
    const subjectQuestions = subjects.map((subject) =>
      Engineering_Questions.filter((question) => question.subject === subject)
    );
    const correctAnswers = subjectQuestions.map((questions) =>
      questions.map((question) => question.options[0])
    );
    const solvedQuestions = subjects.map((subject) =>
      questions.filter((question) => question.subject === subject)
    );
    const subjectResults = subjectQuestions.map((questions, index) =>
      solvedQuestions[index].map(
        (question, i) => question.selectedOption === correctAnswers[index][i]
      )
    );
    const scores = subjectResults.map(
      (results) => results.filter((result) => result).length
    );
    const totalScore = scores.reduce((acc, score) => acc + score, 0);

    res.status(200).json({
      message: "Successfully",
      result: {
        totalScore,
        mathScore: scores[0],
        phusicsScore: scores[1],
        chemistryScore: scores[2],
        englishScore: scores[3],
        iqScore: scores[4],
        totalQuestions: questions.length,
        totalMathQuestions: subjectQuestions[0].length,
        totalPhysicsQuestions: subjectQuestions[1].length,
        totalChemistryQuestions: subjectQuestions[2].length,
        totalEnglishQuestions: subjectQuestions[3].length,
        totaliqQuestions: subjectQuestions[4].length,
        resultPersentage: (totalScore / questions.length) * 100,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// export const testResponse = (req, res) => {
//   try {
//     const { questions } = req.body;
//     const mathQuestions = Business_Questions.filter(
//       (question) => question.subject === "math"
//     );
//     const englishQuestions = Business_Questions.filter(
//       (question) => question.subject === "english"
//     );
//     const iqQuestions = Business_Questions.filter(
//       (question) => question.subject === "iq"
//     );

//     const correctMathAnswers = mathQuestions.map(
//       (question) => question.options[0]
//     );
//     const correctEnglishAnswers = englishQuestions.map(
//       (question) => question.options[0]
//     );
//     const correctIqAnswers = iqQuestions.map((question) => question.options[0]);

//     const solvedMathQuestions = questions.filter(
//       (question) => question.subject === "math"
//     );
//     const solvedEnglishQuestions = questions.filter(
//       (question) => question.subject === "english"
//     );
//     const solvedIqQuestions = questions.filter(
//       (question) => question.subject === "iq"
//     );

//     const mathResult = solvedMathQuestions.map(
//       (question, index) => question.selectedOption === correctMathAnswers[index]
//     );

//     const englishResult = solvedEnglishQuestions.map(
//       (question, index) =>
//         question.selectedOption === correctEnglishAnswers[index]
//     );

//     const iqResult = solvedIqQuestions.map(
//       (question, index) => question.selectedOption === correctIqAnswers[index]
//     );

//     const totalScore =
//       mathResult.filter((result) => result).length +
//       englishResult.filter((result) => result).length +
//       iqResult.filter((result) => result).length;

//       const mathScore = mathResult.filter((result) => result).length;
//       const englishScore = englishResult.filter((result) => result).length;
//       const iqScore = iqResult.filter((result) => result).length;

//     res.status(200).json({
//       message: "Successfully",
//       result: {
//         totalScore,
//         mathScore,
//         englishScore,
//         iqScore
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };
