import MockQuestion from "../models/mock-questions.model.js";
import cloudinary from "cloudinary";
import shuffle from "lodash/shuffle.js";


// Controller function to upload an image
async function handleUpload(file) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
    folder: "MockQuestion",
  });
  return res;
}

// Controller function to add a new question
export const add = async (req, res) => {
  try {
    const { test, text, subject, option1, option2, option3, option4 } = req.body;
    
    console.log("Request body in question controller:", {test, text, subject, option1, option2, option3, option4});

    if (!test || !text || !subject || !option1 || !option2 || !option3 || !option4) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log('req.body', req.body);
    const options = [option1, option2, option3, option4];
    const imagesLinks = [];

    if (req.files && req.files.length > 0) {
      const b64 = Buffer.from(req.files[0].buffer).toString("base64");
      let dataURI = "data:" + req.files[0].mimetype + ";base64," + b64;
      const result = await handleUpload(dataURI);
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const newQuestion = new MockQuestion({
      test,
      text,
      options,
      subject: subject,
      image: imagesLinks,
    });

    console.log('newQuestion', newQuestion);

    await newQuestion.save();

    res.status(201).json({
      success: true,
      data: newQuestion,
    });
  } catch (err) {
    console.error("Error adding question:", err.message);
    // console.log('error',err.message);
    res.status(500).json({ error: err.message });
  }
};


// Controller function to get all questions
export const getAll = async (req, res) => {
  try {
    console.log('req in controller', req.params.testId)
    const testId = req.params.testId;
    const questions = await MockQuestion.find({test:testId});
    res.json(questions);
    console.log('in get all question')
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get a question by ID
export const get = async (req, res) => {
  try {
    const question = await MockQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update a question by ID
export const update = async (req, res) => {
  try {
    const updatedQuestion = await MockQuestion.findByIdAndUpdate(
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
export const Delete = async (req, res) => {
  try {
    const deletedQuestion = await MockQuestion.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(deletedQuestion);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getTest = async (req, res) => {
  try {
    // Shuffle options of each question in Business_Questions array

    const mathQuestions = await MockQuestion.find({subject:'maths', test:req.params.testId}).limit(80);
    const physicsQuestions = await MockQuestion.find({
      subject: "physics", test:req.params.testId
    }).limit(60);
    const chemistryQuestions = await MockQuestion.find({
      subject: "chemistry",test:req.params.testId
    }).limit(30);
    const englishQuestions = await MockQuestion.find({
      subject: "english",test:req.params.testId
    }).limit(20);
    const iqQuestions = await MockQuestion.find({
      subject: "iq",test:req.params.testId
    }).limit(10);
    
    
    // console.log('mathsquestions:', mathQuestions)
    // console.log('physics question:', physicsQuestions)
    // console.log('chemistry question', chemistryQuestions)
    // console.log('english question',englishQuestions)
    // console.log('iq questions', iqQuestions)

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
    console.log('error: ',error)
  }
};

export const testResponse = async (req, res) => {
  try {
    // const {testId} = req.params;
    const Engineering_Questions = await MockQuestion.find({test:req.params.testId});

    const questions = req.body;
    // console.log('req.data',req.data)

    // console.log('Engineering_Questions:', Engineering_Questions)
    // console.log('questions in mockTestResponse:',questions)
    const subjects = ["maths", "physics", "chemistry", "english", "iq"];
    const subjectQuestions = subjects.map((subject) =>
      Engineering_Questions.filter((question) => question.subject === subject)
    );

    // console.log('subjectQuestion', subjectQuestions)

    const correctAnswers = subjectQuestions.map((questions) =>
      questions.map((question) => question.options[0])
    );

    // console.log('correctAnswers: ',correctAnswers)

    const solvedQuestions = subjects.map((subject) =>
      questions.filter((question) => question.subject === subject)
    );

    // console.log('solvedQuestions', solvedQuestions)
    
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
