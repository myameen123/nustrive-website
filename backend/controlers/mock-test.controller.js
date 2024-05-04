import { Business_Questions } from "../dummy_questions.js";
import shuffle from "lodash/shuffle.js";

export const getBusinessTest = (req, res) => {
  try {
    // Shuffle options of each question in Business_Questions array
    const shuffledQuestions = Business_Questions.map((question) => ({
      ...question,
      options: shuffle(question.options),
    }));

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
