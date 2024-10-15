import BusinessQuestions from "../models/business-questions.model.js";
import cloudinary from "cloudinary";
import shuffle from "lodash/shuffle.js";


// Controller function to add a new question
async function handleUpload(file) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
    folder: "BusinessQuestions",
  });
  return res;
}
export const addBusinessQuestion = async (req, res) => {
  try {
    const { test, text, subject, option1, option2, option3, option4 } = req.body;
    
    console.log("Request body in question controller:", {test, text, subject, option1, option2, option3, option4});

    if (!test || !text || !subject || !option1 || !option2 || !option3 || !option4) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log('req.body', req.body);
    const imagesLinks = [];
    const options = [option1, option2, option3, option4];

    if (req.files && req.files.length > 0) {
      const b64 = Buffer.from(req.files[0].buffer).toString("base64");
      let dataURI = "data:" + req.files[0].mimetype + ";base64," + b64;
      const result = await handleUpload(dataURI);
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }


    const newQuestion = new BusinessQuestions({
      test,
      text,
      options,
      subject: subject,
      image: imagesLinks,
    });

    console.log("newQuestion", newQuestion);

    await newQuestion.save();
    res.status(201).json({
      success: true,
    });
  } catch (err) {
    console.error("Error adding question:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// Controller function to get all questions
export const getAllQuestions = async (req, res) => {
  try {
    console.log('req in controller', req.params.testId)
    const questions = await BusinessQuestions.find({test:req.params.testId});
    res.json(questions);
    console.log('in get all question')
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get a question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await BusinessQuestions.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update a question by ID
export const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await BusinessQuestions.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller function to delete a question by ID
export const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await BusinessQuestions.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(deletedQuestion);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};


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